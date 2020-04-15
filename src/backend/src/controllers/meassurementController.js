const { logger } = require('./../util/logger')
const db         = require('../db');
const queries    = require('./../queries');
const { check }  = require('./../util/requestChecker');
const Promise    = require('bluebird');

// Josemi
//npm install hashtable
var HashTable = require('hashtable');
const alarm_interval="5 minutes";
const patientsData = new HashTable();
//Todo: verificar que está compartido entre diferentes peticiones (sesión de servidor?)

// Second parameter is TTL of the cache

//Todo: verificar que está compartido entre diferentes peticiones(sesión de servidor?)
const patientLevels = new DataCache(getPatientLevels,2);

var sql="";

const getPatientLevels = () => {
	patientsData = new HashTable();

//TODO: Optimizar la query con los datos extrictamente necesarios con el campo y guardando con la sentencia as 
    const response = await db.query("select *,sensor.id as sensor_id,area.description as area_desc,room.description as room_desc, bed.description as bed_desc, patient.id as patient_id from sensor,patient,bed,room,area where patient.status=1 and sensor.id=patient.id_sensor and bed.id=patient.id_bed and room.id=bed.id_room and area.id=room.id_area;");
    if (response.rows.length === 0) {
      throw 'Not patients in the hospital with sensors';
    }
	logger.debug("array patient: " +JSON.stringify(response.rows));
	for (var i = 0; i < response.rows.length; i++) {
		patientsData.put(response.rows[i].sensor_id+response.rows[i].auth_id, response.rows[i]);
    }
  }
	
//Fin Josemi



// Comentario Josemi: he cambiado data por dataarray, mira mi comentario posterior
const processPayloadFromProbes = async (dataarray, io) => {
  try {
    if (data instanceof Array) {
      logger.debug("array payload: " + JSON.stringify(data));
      // Process an array of payload
    } else {
      // Process a sigle payload
      logger.debug("single payload " + JSON.stringify(data));
    }
    // The idea is to check tif the probe is legitime in the moment of insert

// comentario Josemi: esto procesa un array, como sabes antes de llamar al controlador si es un array o una única medida, yo convertiría el dato único en un array y
// te quitas tener que chequear si es un array o no. Y aquí lo recorrería todo con un for, así te quitas lo anterior. Es una propuesta, como te parezca mejor.

	sql="";
	for (var i = 0; i < dataarray.rows.length; i++) {
		var data=dataarray.rows[i];

		var levels=patientsData.get(data.id+data.auth_id);
		if(levels == null){
				logger.error("Bad request from sensor: " + data.id + "with auth_id:" + data.auth_id);
				//Debe saltar ese registro
				continue; 
		}
		//Check alarm
		if ((data.spo2>levels.spo2_max)||(data.spo2max<levels.spo2_min)){
			
			
			//TODO: Lanzar en un thread para evitar bloqueo de ejecución
			// Inicio thread ( con workers?)
			logger.debug("Alarm spo2: " +data.spo2+"%.Paciente: "+levels.area_desc+"-"+levels.bed_desc+"-"+levels.surname);
			
			// status=1, alert spo2 level
			sql =  "insert into alarm (id_patient,id_sensor,status ) SELECT " + levels.patient_id+","+levels.id_sensor+",1 WHERE  NOT EXISTS (SELECT id_patient,id_sensor,status FROM alarm WHERE id_patient = " + levels.patient_id+" AND id_sensor = "+levels.id_sensor+" AND (status = 1 or status = 11) AND created > current_timestamp - interval '"+alarm_interval+"') returning id;";
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
			sql =  "insert into alarm (id_patient,id_sensor,status ) SELECT " + levels.patient_id+","+levels.id_sensor+",2 WHERE  NOT EXISTS (SELECT id_patient,id_sensor,status FROM alarm WHERE id_patient = " + levels.patient_id+" AND id_sensor = "+levels.id_sensor+" AND (status = 2 or status = 12) AND created > current_timestamp - interval '"+alarm_interval+"') returning id;";
			const response = await db.query(sql);
			//TODO: Revisar si no hay inserción en base de datos
			if(response != null){
				//TODO: Alert MQTT
				io.sockets.in(levels.area_desc).emit('alarm-in-area', {bar:"Alerta pulso "+data.spo2max+"%.Paciente: "+levels.area_desc+"-"+levels.bed_desc+"-"+levels.surname});
			}
			//Fin thread
		}

		
    }

	// Create async(thread) insert into database to increase responsiveness
	// TODO: Create trigger in database to avoid duplicate alarm in the last 5-10 minutes	




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
