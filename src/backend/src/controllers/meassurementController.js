const { logger }        = require('./../util/logger')
const db                = require('../db');
const queries           = require('./../queries');
const { check }         = require('./../util/requestChecker');
const Promise           = require('bluebird');
const rabbitAlarmSender = require('./../queues/sender/RabbitAlarmSender');

const alarmInterval = 5; // todo config
let patientsData    = {};
//Todo: verificar que está compartido entre diferentes peticiones (sesión de servidor?) ???

// Second parameter is TTL of the cache

//Todo: verificar que está compartido entre diferentes peticiones(sesión de servidor?) ????
// const patientLevels = new DataCache(getPatientLevels,2);

const getPatientLevels = async () => {
    const response = await db.query(
      "SELECT sensor.id AS id_sensor, " +
      "sensor.auth_id as auth_id, area.id AS id_area, area.description AS area_desc, room.id AS id_room, " +
      "bed.id AS id_bed, patient.id AS id_patient, patient.spo2_max AS spo2_max, " +
      "patient.spo2_min AS spo2_min, patient.pulse_max AS pulse_max, " +
      "patient.pulse_min AS pulse_min, patient.temp_max AS temp_max, " +
      "patient.temp_min AS temp_min FROM sensor, patient, bed, room, area " +
      "WHERE patient.status=1 AND sensor.id=patient.id_sensor AND " +
      "bed.id=patient.id_bed AND room.id=bed.id_room AND area.id=room.id_area;");
    if (response.rows.length === 0) {
      throw 'Not patients in the hospital with sensors';
    }
	logger.debug("array patient: " + JSON.stringify(response.rows));
	for (var i = 0; i < response.rows.length; i++) {
		patientsData[`${response.rows[i].id_sensor}-${response.rows[i].auth_id}`] = response.rows[i];
  }
  return patientsData;
}

const _processAlarm = async (data, levels, io, alarmSender, status, statusAlt) => {
  logger.debug(`Alarm ${status === 1 ? 'oxygen' : 'pulse'} for data from probe: ${JSON.stringify(data, null, 3)}  triggered by: ${JSON.stringify(levels, null, 3)}`);

  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - alarmInterval);

  const response = await db.query(queries.alarm.createByTrigger, [levels.id_patient, levels.id_sensor, status, levels.id_bed, statusAlt, dt]);

  if(response != null){
    try {
      levels.spo2   = data.spo2;
      levels.ppm    = data.ppm;
      levels.status = status;
      io.sockets.in(levels.area_desc).emit('alarm-in-area', levels);
      await alarmSender.send(JSON.stringify(levels));
    } catch (e) {
      logger.error(e);
    }
  }
}

const _addMetric = async (metric) => {
  try {
    await db.query(queries.meassurement.add, [metric.spo2, metric.ppm, metric.batt, metric.sequence, metric.id]);
  } catch (e) {
    logger.error(e);
  }
}

const feedCache = async () => {
  await getPatientLevels();
}

const processPayloadFromProbes = async (dataArray, io) => {
  try {

    console.log(patientsData);

    const alarmSender = await rabbitAlarmSender.getInstance();

  	for (var i = 0; i < dataArray.length; i++) {
  		const data   = dataArray[i];
  		const levels = patientsData[`${data.id}-${data.auth_id}`];

  		if(levels == null) {
  				logger.error(`Bad request from sensor: ${data.id} with auth_id: ${data.auth_id}`);
  				continue;
  		}

  		if ((data.spo2 > levels.spo2_max) || (data.spo2 < levels.spo2_min)) {
  			//TODO: Lanzar en un thread para evitar bloqueo de ejecución
  			// Inicio thread ( con workers?) ---> Lo he estado mirando un par de veces, pero nunca lo he llegado a poner en marcha en producci'on. Pero le podemos echar un vistazo.
        const status    = 1;
        const statusAlt = `1${status}`;
  			_processAlarm(data, levels, io, alarmSender, status, `1${status}`);
  			//Fin thread
  		}

  		if ((data.ppm > levels.pulse_max )||(data.ppm < levels.pulse_min)) {
        const status    = 2;
  			_processAlarm(data, levels, io, alarmSender, status, `1${status}`);
  		}

      _addMetric(data)


    }
  } catch (e) {
    logger.error(e);
  }
}

module.exports = {
  processPayloadFromProbes,
  feedCache,
}
