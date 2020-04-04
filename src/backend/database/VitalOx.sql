

DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user" (
	"id" SERIAL NOT NULL,
	"surname" varchar(20),
	"lastname" varchar(20),
	"professional_id" varchar(20),
	"last_login" date,
	"id_role" int2,
	"login" varchar(20),
	"password" varchar(200),
	"id_hospital" int2,
	"jwt" varchar(200),
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "role" CASCADE;

CREATE TABLE "role" (
	"id" SMALLSERIAL NOT NULL,
	"description" varchar(40),
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "sensor" CASCADE;

CREATE TABLE "sensor" (
	"id" BIGSERIAL NOT NULL,
	"type" int8,
	"auth_id" varchar(20),
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "meassurement" CASCADE;

CREATE TABLE "meassurement" (
	"id" BIGSERIAL NOT NULL,
	"time" timestamp DEFAULT CURRENT_TIMESTAMP(2),
	"spo2" int2,
	"ppm" int2,
	"batt" int2,
	"temperature" int2,
	"sequence" int8,
	"id_sensor" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "patient" CASCADE;

CREATE TABLE "patient" (
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

DROP TABLE IF EXISTS "bed" CASCADE;

CREATE TABLE "bed" (
	"id" BIGSERIAL NOT NULL,
	"description" varchar(20),
	"id_room" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "room" CASCADE;

CREATE TABLE "room" (
	"id" BIGSERIAL NOT NULL,
	"description" varchar(40),
	"id_area" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "area" CASCADE;

CREATE TABLE "area" (
	"id" BIGSERIAL NOT NULL,
	"desc" varchar(20),
	"id_floor" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "floor" CASCADE;

CREATE TABLE "floor" (
	"id" BIGSERIAL NOT NULL,
	"desc" varchar(20),
	"id_build" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "build" CASCADE;

CREATE TABLE "build" (
	"id" BIGSERIAL NOT NULL,
	"desc" varchar(20),
	"id_hospital" int2,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "alarm" CASCADE;

CREATE TABLE "alarm" (
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

DROP TABLE IF EXISTS "user_alarm_suscriptions" CASCADE;

CREATE TABLE "user_alarm_suscriptions" (
	"id" BIGSERIAL NOT NULL,
	"id_user" int4,
	"id_room" int8,
	"id_area" int8,
	"id_floor" int8,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "hospital" CASCADE;

CREATE TABLE "hospital" (
	"id" SMALLSERIAL NOT NULL,
	"desc" varchar(20),
	PRIMARY KEY("id")
);


ALTER TABLE "user" ADD CONSTRAINT "ref_user_to_role" FOREIGN KEY ("id_role")
	REFERENCES "role"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "user" ADD CONSTRAINT "ref_user_to_hospital" FOREIGN KEY ("id_hospital")
	REFERENCES "hospital"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "meassurement" ADD CONSTRAINT "ref_meassurement_to_sensor" FOREIGN KEY ("id_sensor")
	REFERENCES "sensor"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "patient" ADD CONSTRAINT "ref_patient_to_bed" FOREIGN KEY ("id_bed")
	REFERENCES "bed"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "patient" ADD CONSTRAINT "ref_patient_to_sensor" FOREIGN KEY ("id_sensor")
	REFERENCES "sensor"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "bed" ADD CONSTRAINT "ref_bed_to_room" FOREIGN KEY ("id_room")
	REFERENCES "room"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "room" ADD CONSTRAINT "ref_room_to_area" FOREIGN KEY ("id_area")
	REFERENCES "area"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "area" ADD CONSTRAINT "ref_area_to_floor" FOREIGN KEY ("id_floor")
	REFERENCES "floor"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "floor" ADD CONSTRAINT "ref_floor_to_hospital" FOREIGN KEY ("id_build")
	REFERENCES "build"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "build" ADD CONSTRAINT "ref_build_to_hospital" FOREIGN KEY ("id_hospital")
	REFERENCES "hospital"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "alarm" ADD CONSTRAINT "ref_alarm_to_patient" FOREIGN KEY ("id_patient")
	REFERENCES "patient"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "alarm" ADD CONSTRAINT "ref_alarm_to_sensor" FOREIGN KEY ("id_sensor")
	REFERENCES "sensor"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "alarm" ADD CONSTRAINT "ref_alarm_to_user" FOREIGN KEY ("ack_user")
	REFERENCES "user"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "alarm" ADD CONSTRAINT "ref_alarm_to_bed" FOREIGN KEY ("id_bed")
	REFERENCES "bed"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "user_alarm_suscriptions" ADD CONSTRAINT "ref_user_alarm_suscriptions_to_user" FOREIGN KEY ("id_user")
	REFERENCES "user"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "user_alarm_suscriptions" ADD CONSTRAINT "ref_user_alarm_suscriptions_to_room" FOREIGN KEY ("id_room")
	REFERENCES "room"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "user_alarm_suscriptions" ADD CONSTRAINT "ref_user_alarm_suscriptions_to_area" FOREIGN KEY ("id_area")
	REFERENCES "area"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "user_alarm_suscriptions" ADD CONSTRAINT "ref_user_alarm_suscriptions_to_floor" FOREIGN KEY ("id_floor")
	REFERENCES "floor"("id")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;
