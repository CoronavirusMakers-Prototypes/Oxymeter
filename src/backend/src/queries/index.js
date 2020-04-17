// All the queries here (meassurement, right now is a special case)

sensor = {
  create:        'INSERT INTO sensor (type, auth_id) VALUES ($1, $2) RETURNING id',
  delete:        'DELETE FROM sensor WHERE id = $1',
  update:        'UPDATE sensor SET type = $1, auth_id = $2 WHERE id = $3',
  read:          'SELECT * FROM sensor WHERE 1=1 ORDER BY id OFFSET $1 LIMIT $2',
  readUnlimited: 'SELECT * FROM sensor WHERE 1=1 ORDER BY id',
  getById:       'SELECT * FROM sensor WHERE id = $1',
}

util = {
  count:      'SELECT COUNT(*) FROM sensor',
  getUserJwt: 'SELECT * FROM personal WHERE jwt = $1',
}

alarm = {
  create:  'INSERT INTO alarm (id_patient, id_sensor, ack_user, ack_date, status, id_bed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
  delete:  'DELETE FROM alarm WHERE id = $1',
  update:  'UPDATE alarm SET id_patient = $1, id_sensor = $2, ack_user = $3, ack_date = $4, status = $5, id_bed = $6 WHERE id = $7',
  read:    'SELECT * FROM alarm WHERE 1=1 ORDER BY id',
  getById: 'SELECT * FROM alarm WHERE id = $1'
}

bed = {
  create:  'INSERT INTO bed (description, id_room) VALUES ($1, $2) RETURNING id',
  delete:  'DELETE FROM bed WHERE id = $1',
  update:  'UPDATE bed SET description = $1, id_room = $2 WHERE id = $3',
  read:    'SELECT * FROM bed WHERE 1=1 ORDER BY id',
  getById: 'SELECT * FROM bed WHERE id = $1',
  getByIdRoom: 'SELECT * FROM bed WHERE id_room = $1',
}

build = {
  create:  'INSERT INTO build (description, id_hospital) VALUES ($1, $2) RETURNING id',
  delete:  'DELETE FROM build WHERE id = $1',
  update:  'UPDATE build SET description = $1, id_hospital = $2 WHERE id = $3',
  read:    'SELECT * FROM build WHERE 1=1 ORDER BY id_hospital',
  getById: 'SELECT * FROM build WHERE id = $1',
  getByIdHospital: 'SELECT * FROM build WHERE id_hospital = $1',
}

floor = {
  create:  'INSERT INTO floor (description, id_build) VALUES ($1, $2) RETURNING id',
  delete:  'DELETE FROM floor WHERE id = $1',
  update:  'UPDATE floor SET description = $1, id_build = $2 WHERE id = $3',
  read:    'SELECT * FROM floor WHERE 1=1 ORDER BY id_build',
  getById: 'SELECT * FROM floor WHERE id = $1',
  getByIdBuilding: 'SELECT * FROM floor WHERE id_build = $1',
}

area = {
  create:  'INSERT INTO area (description, id_floor) VALUES ($1, $2) RETURNING id',
  delete:  'DELETE FROM area WHERE id = $1',
  update:  'UPDATE area SET description = $1, id_floor = $2 WHERE id = $3',
  read:    'SELECT * FROM area WHERE 1=1 ORDER BY id',
  getById: 'SELECT * FROM area WHERE id = $1',
  getByIdFloor: 'SELECT * FROM area WHERE id_floor = $1',
}

hospital = {
  create:  'INSERT INTO hospital (description) VALUES ($1) RETURNING id',
  delete:  'DELETE FROM hospital WHERE id = $1',
  update:  'UPDATE hospital SET description = $1 WHERE id = $2',
  read:    'SELECT * FROM hospital WHERE 1=1 ORDER BY id',
  getById: 'SELECT * FROM hospital WHERE id = $1'
}

patient = {
  create:  'INSERT INTO patient (surname, lastname, hospital_reference, suscribed, unsuscribed, id_bed, id_sensor, spo2_max, spo2_min, pulse_max, pulse_min, temp_max, temp_min, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id',
  delete:  'DELETE FROM patient WHERE id = $1',
  update:  'UPDATE patient SET surname = $1, lastname = $2, hospital_reference = $3, suscribed = $4, unsuscribed = $5, id_bed = $6, id_sensor = $7, spo2_max = $8, spo2_min = $9, pulse_max = $10, pulse_min = $11, temp_max = $12, temp_min = $13, status = $14 WHERE id = $15',
  read:    'SELECT * FROM patient WHERE 1=1 ORDER BY surname',
  getById: 'SELECT * FROM patient WHERE id = $1',
  getByIdBed: 'SELECT * FROM patient WHERE id_bed = $1',
}

role = {
  create:  'INSERT INTO role (description) VALUES ($1) RETURNING id',
  delete:  'DELETE FROM role WHERE id = $1',
  update:  'UPDATE role SET description = $1 WHERE id = $2',
  read:    'SELECT * FROM role WHERE 1=1 ORDER BY description',
  getById: 'SELECT * FROM role WHERE id = $1'
}

room = {
  create:  'INSERT INTO room (description, id_area) VALUES ($1, $2) RETURNING id',
  delete:  'DELETE FROM room WHERE id = $1',
  update:  'UPDATE room SET description = $1, id_area = $2 WHERE id = $3',
  read:    'SELECT * FROM room WHERE 1=1 ORDER BY id',
  getById: 'SELECT * FROM room WHERE id = $1',
  getByIdRoom: 'SELECT * FROM room WHERE id_area = $1',
}

personal = {
  create:      'INSERT INTO personal (surname, lastname, professional_id, last_login, id_role, login, password, id_hospital, jwt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
  delete:      'DELETE FROM personal WHERE id = $1',
  update:      'UPDATE personal SET surname = $1, lastname = $2, professional_id = $3, last_login = $4, id_role = $5, login = $6, password = $7, id_hospital = $8 WHERE id = $9',
  read:        'SELECT * FROM personal WHERE 1=1 ORDER BY id',
  getById:     'SELECT p.id, p.surname, p.lastname, p.professional_id, p.last_login, p.id_role, p.login, p.id_hospital, r.description AS role FROM personal p JOIN role r ON p.id_role = r.id WHERE p.id = $1',
  credentials: 'SELECT * FROM personal WHERE login = $1 AND password = $2',
  login:       'UPDATE personal SET jwt = $1, last_login = $3 WHERE id = $2',
  logout:      'UPDATE personal SET jwt = null WHERE id = $1',
}

personal_alarm_suscriptions = {
  create:  'INSERT INTO personal_alarm_suscriptions (id_user, id_room, id_area, id_floor) VALUES ($1, $2, $3, $4) RETURNING id',
  delete:  'DELETE FROM personal_alarm_suscriptions WHERE id = $1',
  update:  'UPDATE personal_alarm_suscriptions SET id_user = $1, id_room = $2, id_area = $3, id_floor = $4 WHERE id = $5',
  read:    'SELECT * FROM personal_alarm_suscriptions WHERE 1=1 ORDER BY id',
  getById: 'SELECT * FROM personal_alarm_suscriptions WHERE id = $1'
}

module.exports = {
  sensor,
  util,
  alarm,
  bed,
  build,
  floor,
  hospital,
  patient,
  role,
  room,
  personal,
  area,
  personal_alarm_suscriptions,
}
