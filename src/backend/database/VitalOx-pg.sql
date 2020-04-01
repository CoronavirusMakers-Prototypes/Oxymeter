DROP TABLE IF EXISTS "User" CASCADE;

CREATE TABLE "User" (
	"id" SERIAL NOT NULL,
	"surname" varchar(20),
	"lastname" varchar(20),
	"professional_id" varchar(20),
	"last_login" date,
	"id_role" int2,
	"login" varchar(20),
	"password" varchar(20),
	"id_hospital" int2,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Role" CASCADE;

CREATE TABLE "Role" (
	"id" SMALLSERIAL NOT NULL,
	"description" varchar(40),
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Sensor" CASCADE;

CREATE TABLE "Sensor" (
	"id" BIGSERIAL NOT NULL,
	"type" int8,
	"auth_id" varchar(20),
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Meassurement" CASCADE;

CREATE TABLE "Meassurement" (
	"id" BIGSERIAL NOT NULL,
	"time" timestamp DEFAULT CURRENT_TIMESTAMP(2),
	"spo2" int2,
	"ppm" int2,
	"batt" int2,
	"sequence" int8,
	"sensorId" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Patient" CASCADE;

CREATE TABLE "Patient" (
	"id" BIGSERIAL NOT NULL,
	"surname" varchar(40),
	"lastname" varchar(40),
	"hospital_reference" varchar(40),
	"suscribed" timestamp,
	"unsuscribed" timestamp,
	"id_bed" int8,
	"id_sensor" int8,
	"spo2_max" int2,
	"spo2_min" int2,
	"pulse_max" int2,
	"pulse_min" int2,
	"temp_max" int2,
	"temp_min" int2,
	"status" int2,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Bed" CASCADE;

CREATE TABLE "Bed" (
	"id" BIGSERIAL NOT NULL,
	"description" varchar(20),
	"id_room" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Room" CASCADE;

CREATE TABLE "Room" (
	"id" BIGSERIAL NOT NULL,
	"description" varchar(40),
	"id_area" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Area" CASCADE;

CREATE TABLE "Area" (
	"id" BIGSERIAL NOT NULL,
	"desc" varchar(20),
	"id_floor" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Floor" CASCADE;

CREATE TABLE "Floor" (
	"id" BIGSERIAL NOT NULL,
	"desc" varchar(20),
	"id_build" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Build" CASCADE;

CREATE TABLE "Build" (
	"id" BIGSERIAL NOT NULL,
	"desc" varchar(20),
	"id_hospital" int2,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Alarm" CASCADE;

CREATE TABLE "Alarm" (
	"id" BIGSERIAL NOT NULL,
	"date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP(2),
	"id_patient" int8,
	"id_sensor" int8,
	"ack_user" int4,
	"ack_date" timestamp with time zone,
	"status" int2,
	"id_bed" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "User_Alarm_Suscriptions" CASCADE;

CREATE TABLE "User_Alarm_Suscriptions" (
	"id" BIGSERIAL NOT NULL,
	"id_user" int4,
	"id_room" int8,
	"id_area" int8,
	"id_floor" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "Hospital" CASCADE;

CREATE TABLE "Hospital" (
	"id" SMALLSERIAL NOT NULL,
	"desc" varchar(20),
	PRIMARY KEY("id")
);


ALTER TABLE "User" ADD CONSTRAINT "Ref_User_to_Role" FOREIGN KEY ("id_role")
  REFERENCES "Role"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "User" ADD CONSTRAINT "Ref_User_to_Hospital" FOREIGN KEY ("id_hospital")
  REFERENCES "Hospital"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Meassurement" ADD CONSTRAINT "Ref_Meassurement_to_Sensor" FOREIGN KEY ("sensorId")
  REFERENCES "Sensor"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Patient" ADD CONSTRAINT "Ref_Patient_to_Bed" FOREIGN KEY ("id_bed")
  REFERENCES "Bed"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Patient" ADD CONSTRAINT "Ref_Patient_to_Sensor" FOREIGN KEY ("id_sensor")
  REFERENCES "Sensor"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Bed" ADD CONSTRAINT "Ref_Bed_to_Room" FOREIGN KEY ("id_room")
  REFERENCES "Room"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Room" ADD CONSTRAINT "Ref_Room_to_Area" FOREIGN KEY ("id_area")
  REFERENCES "Area"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Area" ADD CONSTRAINT "Ref_Area_to_Floor" FOREIGN KEY ("id_floor")
  REFERENCES "Floor"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Floor" ADD CONSTRAINT "Ref_Floor_to_Hospital" FOREIGN KEY ("id_build")
  REFERENCES "Build"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Build" ADD CONSTRAINT "Ref_Build_to_Hospital" FOREIGN KEY ("id_hospital")
  REFERENCES "Hospital"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Alarm" ADD CONSTRAINT "Ref_Alarm_to_Patient" FOREIGN KEY ("id_patient")
  REFERENCES "Patient"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Alarm" ADD CONSTRAINT "Ref_Alarm_to_Sensor" FOREIGN KEY ("id_sensor")
  REFERENCES "Sensor"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Alarm" ADD CONSTRAINT "Ref_Alarm_to_User" FOREIGN KEY ("ack_user")
  REFERENCES "User"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "Alarm" ADD CONSTRAINT "Ref_Alarm_to_Bed" FOREIGN KEY ("id_bed")
  REFERENCES "Bed"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "User_Alarm_Suscriptions" ADD CONSTRAINT "Ref_User_Alarm_Suscriptions_to_User" FOREIGN KEY ("id_user")
  REFERENCES "User"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "User_Alarm_Suscriptions" ADD CONSTRAINT "Ref_User_Alarm_Suscriptions_to_Room" FOREIGN KEY ("id_room")
  REFERENCES "Room"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "User_Alarm_Suscriptions" ADD CONSTRAINT "Ref_User_Alarm_Suscriptions_to_Area" FOREIGN KEY ("id_area")
  REFERENCES "Area"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;

ALTER TABLE "User_Alarm_Suscriptions" ADD CONSTRAINT "Ref_User_Alarm_Suscriptions_to_Floor" FOREIGN KEY ("id_floor")
  REFERENCES "Floor"("id")
  MATCH SIMPLE
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
  NOT DEFERRABLE;
