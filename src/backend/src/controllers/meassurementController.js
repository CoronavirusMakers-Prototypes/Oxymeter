const { logger } = require('./../util/logger')
const db         = require('../db');
const queries    = require('./../queries');
const { check }  = require('./../util/requestChecker');
const Promise    = require('bluebird');

// Josemi
//npm install hashtable -> Este comando solo te instala el package en local, para que persista como dependencia: `npm install hashtable --save` o si usas yarn `yarn add hashtable` de esta manera se queda en el `package.json`
// var HashTable = require('hashtable'); // Nunca hab'ia usado esta dependencia (No me termina de convencer, 99 stars, issues y hace 3 anyos que no se actualiza, no queda claro que aporta el mismo autor justifica su necesaria existencia pero... por ahora nunca hemos tenido que usarlo) Yo usaria un objeto normal de javascript (encima da errores)

const alarm_interval="5 minutes";
let patientsData = {};
//Todo: verificar que está compartido entre diferentes peticiones (sesión de servidor?) ???

// Second parameter is TTL of the cache

//Todo: verificar que está compartido entre diferentes peticiones(sesión de servidor?) ????
// const patientLevels = new DataCache(getPatientLevels,2);

var sql="";

const getPatientLevels = async () => {

    const response = await db.query("SELECT sensor.id AS sensor_id, sensor.auth_id as auth_id, area.id AS area_id, room.id AS room_id, bed.id AS bed_id, patient.id AS patient_id, patient.spo2_max AS spo2_max, patient.spo2_min AS spo2_min, patient.pulse_max AS pulse_max, patient.pulse_min AS pulse_min, patient.temp_max AS temp_max, patient.temp_min AS temp_min FROM sensor, patient, bed, room, area WHERE patient.status=1 AND sensor.id=patient.id_sensor AND bed.id=patient.id_bed AND room.id=bed.id_room AND area.id=room.id_area;");
    if (response.rows.length === 0) {
      throw 'Not patients in the hospital with sensors';
    }
	logger.debug("array patient: " + JSON.stringify(response.rows));
	for (var i = 0; i < response.rows.length; i++) {
		patientsData[`${response.rows[i].sensor_id}-${response.rows[i].auth_id}`] = response.rows[i]; // Propongo este tipo de key para que en caso de debugar o buscar errores los humanos lo tengamos m'as facil.
  }
}

//Fin Josemi



// Comentario Josemi: he cambiado data por dataArray, mira mi comentario posterior
const processPayloadFromProbes = async (dataArray, io) => {
  try {
    // console.log(dataArray)
    await getPatientLevels();
    console.log(patientsData);

  	sql="";
  	for (var i = 0; i < dataArray.length; i++) {
  		const data = dataArray[i];


  		const levels = patientsData[`${data.id}-${data.auth_id}`];

  		if(levels == null){
  				logger.error(`Bad request from sensor: ${data.id} with auth_id: ${data.auth_id}`);
  				continue;
  		}

  		if ((data.spo2>levels.spo2_max) || (data.spo2max<levels.spo2_min)) {


  			//TODO: Lanzar en un thread para evitar bloqueo de ejecución
  			// Inicio thread ( con workers?) ---> Lo he estado mirando un par de veces, pero nunca lo he llegado a poner en marcha en producci'on. Pero le podemos echar un vistazo.
  			logger.debug("Alarm spo2: " +data.spo2+"%.Paciente: "+levels.area_desc+"-"+levels.bed_desc+"-"+levels.surname);

  			// status=1, alert spo2 level
  			sql =  "INSERT INTO alarm (id_patient,id_sensor,status) SELECT " + levels.patient_id+","+levels.id_sensor+",1 WHERE NOT EXISTS (SELECT id_patient,id_sensor,status) FROM alarm WHERE id_patient = " + levels.patient_id + " AND id_sensor = " + levels.id_sensor + " AND (status = 1 or status = 11) AND created > current_timestamp - interval '" + alarm_interval + "') RETURNING id;";
  			const response = await db.query(sql);
  			//TODO: Revisar si no hay inserción en base de datos
  			if(response != null){
  				//Alert MQTT
  				io.sockets.in(levels.area_desc).emit('alarm-in-area', {bar:"Alerta SpO2 "+data.spo2max+"%.Paciente: "+levels.room_desc+"-"+levels.bed_desc+"-"+levels.surname});
  			}
  			//Fin thread
  		}

  		if ((data.pulse>levels.pulse_max)||(data.pulse<levels.pulse_min)){

  			//TODO: Lanzar en un thread para evitar bloqueo de ejecución
  			// Inicio thread ( con workers?)
  			logger.debug("Alarm pulse: " +data.pulse+"%.Paciente: "+levels.area_desc+"-"+levels.bed_desc+"-"+levels.surname);

  			// status=2, alert pulse level
  			sql =  "insert into alarm (id_patient,id_sensor,status ) SELECT " + levels.patient_id + "," + levels.id_sensor + ",2 WHERE  NOT EXISTS (SELECT id_patient,id_sensor,status FROM alarm WHERE id_patient = " + levels.patient_id + " AND id_sensor = " + levels.id_sensor + " AND (status = 2 or status = 12) AND created > current_timestamp - interval '" + alarm_interval + "') returning id;";
  			const response = await db.query(sql);
  			//TODO: Revisar si no hay inserción en base de datos
  			if(response != null){
  				//TODO: Alert MQTT
  				io.sockets.in(levels.area_desc).emit('alarm-in-area', {bar:"Alerta pulso "+data.spo2max+"%.Paciente: "+levels.area_desc+"-"+levels.bed_desc+"-"+levels.surname});
  			}
  			//Fin thread
  		}


      }



// Fin Josemi



    // Example of sending an alarm from a Controller.
    //io.sockets.in('area_1').emit('alarm-in-area', {bar:"BooFoo!"});
  } catch (e) {
    logger.error(e);
  }
}

module.exports = {
  processPayloadFromProbes,
}
