-- Database: cv19makers_vitalox

-- DROP DATABASE cv19makers_vitalox;

CREATE DATABASE cv19makers_vitalox
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.21
-- Dumped by pg_dump version 12.2

-- Started on 2020-05-04 08:52:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 181 (class 1259 OID 17071)
-- Name: alarm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alarm (
    id bigint NOT NULL,
    created timestamp with time zone DEFAULT ('now'::text)::timestamp(2) with time zone,
    id_patient bigint,
    id_sensor bigint,
    ack_user integer,
    ack_date timestamp with time zone,
    status smallint,
    id_bed bigint
);


ALTER TABLE public.alarm OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 17077)
-- Name: area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.area (
    id bigint NOT NULL,
    description character varying(20),
    id_floor bigint
);


ALTER TABLE public.area OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 17082)
-- Name: bed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bed (
    id bigint NOT NULL,
    description character varying(20),
    id_room bigint
);


ALTER TABLE public.bed OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 17092)
-- Name: floor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.floor (
    id bigint NOT NULL,
    description character varying(20),
    id_build bigint
);


ALTER TABLE public.floor OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17126)
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id bigint NOT NULL,
    description character varying(40),
    id_area bigint
);


ALTER TABLE public.room OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 17288)
-- Name: active_alarms; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.active_alarms AS
 SELECT alarm.id,
    alarm.created,
    alarm.id_patient,
    alarm.id_sensor,
    alarm.ack_user,
    alarm.ack_date,
    alarm.status,
    bed.id AS id_bed,
    bed.description AS bed_desc,
    area.id AS id_area,
    area.description AS area_desc,
    room.id AS id_room,
    room.description AS room_desc,
    floor.id AS id_floor,
    floor.description AS floor_desc
   FROM public.alarm,
    public.bed,
    public.room,
    public.area,
    public.floor
  WHERE ((alarm.status < 10) AND (bed.id = alarm.id_bed) AND (room.id = bed.id_room) AND (area.id = room.id_area) AND (floor.id = area.id_floor));


ALTER TABLE public.active_alarms OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 17075)
-- Name: alarm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alarm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alarm_id_seq OWNER TO postgres;

--
-- TOC entry 2252 (class 0 OID 0)
-- Dependencies: 182
-- Name: alarm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alarm_id_seq OWNED BY public.alarm.id;


--
-- TOC entry 184 (class 1259 OID 17080)
-- Name: area_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.area_id_seq OWNER TO postgres;

--
-- TOC entry 2253 (class 0 OID 0)
-- Dependencies: 184
-- Name: area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.area_id_seq OWNED BY public.area.id;


--
-- TOC entry 207 (class 1259 OID 17268)
-- Name: audit_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_data (
    id bigint[] NOT NULL,
    event character varying,
    event__id integer,
    old_value character varying,
    new_value character varying,
    modified_by integer,
    "when" timestamp with time zone
);


ALTER TABLE public.audit_data OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 17085)
-- Name: bed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bed_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bed_id_seq OWNER TO postgres;

--
-- TOC entry 2254 (class 0 OID 0)
-- Dependencies: 186
-- Name: bed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bed_id_seq OWNED BY public.bed.id;


--
-- TOC entry 187 (class 1259 OID 17087)
-- Name: build; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.build (
    id bigint NOT NULL,
    description character varying(20),
    id_hospital smallint
);


ALTER TABLE public.build OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 17090)
-- Name: build_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.build_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.build_id_seq OWNER TO postgres;

--
-- TOC entry 2255 (class 0 OID 0)
-- Dependencies: 188
-- Name: build_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.build_id_seq OWNED BY public.build.id;


--
-- TOC entry 190 (class 1259 OID 17095)
-- Name: floor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.floor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.floor_id_seq OWNER TO postgres;

--
-- TOC entry 2256 (class 0 OID 0)
-- Dependencies: 190
-- Name: floor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.floor_id_seq OWNED BY public.floor.id;


--
-- TOC entry 191 (class 1259 OID 17097)
-- Name: hospital; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospital (
    id smallint NOT NULL,
    description character varying(20)
);


ALTER TABLE public.hospital OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 17100)
-- Name: hospital_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hospital_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hospital_id_seq OWNER TO postgres;

--
-- TOC entry 2257 (class 0 OID 0)
-- Dependencies: 192
-- Name: hospital_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hospital_id_seq OWNED BY public.hospital.id;


--
-- TOC entry 193 (class 1259 OID 17102)
-- Name: meassurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meassurement (
    id bigint NOT NULL,
    "time" timestamp without time zone DEFAULT ('now'::text)::timestamp(2) with time zone,
    spo2 numeric,
    ppm numeric,
    batt numeric,
    sequence bigint,
    sensorid bigint
);


ALTER TABLE public.meassurement OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 17106)
-- Name: meassurement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meassurement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meassurement_id_seq OWNER TO postgres;

--
-- TOC entry 2258 (class 0 OID 0)
-- Dependencies: 194
-- Name: meassurement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meassurement_id_seq OWNED BY public.meassurement.id;


--
-- TOC entry 195 (class 1259 OID 17108)
-- Name: patient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient (
    id bigint NOT NULL,
    surname character varying(40),
    lastname character varying(40),
    hospital_reference character varying(40),
    suscribed timestamp without time zone,
    unsuscribed timestamp without time zone,
    id_bed bigint,
    id_sensor bigint,
    spo2_max numeric,
    spo2_min numeric,
    pulse_max numeric,
    pulse_min numeric,
    temp_max numeric,
    temp_min smallint,
    status smallint
);


ALTER TABLE public.patient OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 17111)
-- Name: patient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patient_id_seq OWNER TO postgres;

--
-- TOC entry 2259 (class 0 OID 0)
-- Dependencies: 196
-- Name: patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patient_id_seq OWNED BY public.patient.id;


--
-- TOC entry 197 (class 1259 OID 17113)
-- Name: personal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal (
    id integer NOT NULL,
    surname character varying(20),
    lastname character varying(20),
    professional_id character varying(20),
    last_login date,
    id_role smallint,
    login character varying(20),
    password character varying(200),
    id_hospital smallint,
    jwt character varying(200)
);


ALTER TABLE public.personal OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 17116)
-- Name: personal_alarm_suscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_alarm_suscriptions (
    id bigint NOT NULL,
    id_user integer,
    id_room bigint,
    id_area bigint,
    id_floor bigint
);


ALTER TABLE public.personal_alarm_suscriptions OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 17119)
-- Name: personal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personal_id_seq OWNER TO postgres;

--
-- TOC entry 2260 (class 0 OID 0)
-- Dependencies: 199
-- Name: personal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personal_id_seq OWNED BY public.personal.id;


--
-- TOC entry 200 (class 1259 OID 17121)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id smallint NOT NULL,
    description character varying(40)
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 17124)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 2261 (class 0 OID 0)
-- Dependencies: 201
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 203 (class 1259 OID 17129)
-- Name: room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_id_seq OWNER TO postgres;

--
-- TOC entry 2262 (class 0 OID 0)
-- Dependencies: 203
-- Name: room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;


--
-- TOC entry 204 (class 1259 OID 17131)
-- Name: sensor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensor (
    id bigint NOT NULL,
    type bigint,
    auth_id character varying(20)
);


ALTER TABLE public.sensor OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 17134)
-- Name: sensor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sensor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sensor_id_seq OWNER TO postgres;

--
-- TOC entry 2263 (class 0 OID 0)
-- Dependencies: 205
-- Name: sensor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sensor_id_seq OWNED BY public.sensor.id;


--
-- TOC entry 206 (class 1259 OID 17136)
-- Name: user_alarm_suscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_alarm_suscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_alarm_suscriptions_id_seq OWNER TO postgres;

--
-- TOC entry 2264 (class 0 OID 0)
-- Dependencies: 206
-- Name: user_alarm_suscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_alarm_suscriptions_id_seq OWNED BY public.personal_alarm_suscriptions.id;


--
-- TOC entry 2069 (class 2604 OID 17138)
-- Name: alarm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm ALTER COLUMN id SET DEFAULT nextval('public.alarm_id_seq'::regclass);


--
-- TOC entry 2070 (class 2604 OID 17139)
-- Name: area id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area ALTER COLUMN id SET DEFAULT nextval('public.area_id_seq'::regclass);


--
-- TOC entry 2071 (class 2604 OID 17140)
-- Name: bed id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed ALTER COLUMN id SET DEFAULT nextval('public.bed_id_seq'::regclass);


--
-- TOC entry 2072 (class 2604 OID 17141)
-- Name: build id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build ALTER COLUMN id SET DEFAULT nextval('public.build_id_seq'::regclass);


--
-- TOC entry 2073 (class 2604 OID 17142)
-- Name: floor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor ALTER COLUMN id SET DEFAULT nextval('public.floor_id_seq'::regclass);


--
-- TOC entry 2074 (class 2604 OID 17143)
-- Name: hospital id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital ALTER COLUMN id SET DEFAULT nextval('public.hospital_id_seq'::regclass);


--
-- TOC entry 2076 (class 2604 OID 17144)
-- Name: meassurement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meassurement ALTER COLUMN id SET DEFAULT nextval('public.meassurement_id_seq'::regclass);


--
-- TOC entry 2077 (class 2604 OID 17145)
-- Name: patient id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient ALTER COLUMN id SET DEFAULT nextval('public.patient_id_seq'::regclass);


--
-- TOC entry 2078 (class 2604 OID 17146)
-- Name: personal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal ALTER COLUMN id SET DEFAULT nextval('public.personal_id_seq'::regclass);


--
-- TOC entry 2079 (class 2604 OID 17147)
-- Name: personal_alarm_suscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions ALTER COLUMN id SET DEFAULT nextval('public.user_alarm_suscriptions_id_seq'::regclass);


--
-- TOC entry 2080 (class 2604 OID 17148)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 2081 (class 2604 OID 17149)
-- Name: room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);


--
-- TOC entry 2082 (class 2604 OID 17150)
-- Name: sensor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor ALTER COLUMN id SET DEFAULT nextval('public.sensor_id_seq'::regclass);


--
-- TOC entry 2084 (class 2606 OID 17152)
-- Name: alarm alarm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT alarm_pkey PRIMARY KEY (id);


--
-- TOC entry 2086 (class 2606 OID 17154)
-- Name: area area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id);


--
-- TOC entry 2112 (class 2606 OID 17275)
-- Name: audit_data audit_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_data
    ADD CONSTRAINT audit_data_pkey PRIMARY KEY (id);


--
-- TOC entry 2088 (class 2606 OID 17156)
-- Name: bed bed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed
    ADD CONSTRAINT bed_pkey PRIMARY KEY (id);


--
-- TOC entry 2090 (class 2606 OID 17158)
-- Name: build build_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build
    ADD CONSTRAINT build_pkey PRIMARY KEY (id);


--
-- TOC entry 2092 (class 2606 OID 17160)
-- Name: floor floor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor
    ADD CONSTRAINT floor_pkey PRIMARY KEY (id);


--
-- TOC entry 2094 (class 2606 OID 17162)
-- Name: hospital hospital_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital
    ADD CONSTRAINT hospital_pkey PRIMARY KEY (id);


--
-- TOC entry 2096 (class 2606 OID 17164)
-- Name: meassurement meassurement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meassurement
    ADD CONSTRAINT meassurement_pkey PRIMARY KEY (id);


--
-- TOC entry 2098 (class 2606 OID 17166)
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (id);


--
-- TOC entry 2100 (class 2606 OID 17168)
-- Name: personal personal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal
    ADD CONSTRAINT personal_pkey PRIMARY KEY (id);


--
-- TOC entry 2106 (class 2606 OID 17170)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 2108 (class 2606 OID 17172)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);


--
-- TOC entry 2110 (class 2606 OID 17174)
-- Name: sensor sensor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor
    ADD CONSTRAINT sensor_pkey PRIMARY KEY (id);


--
-- TOC entry 2102 (class 2606 OID 17279)
-- Name: personal_alarm_suscriptions unque_suscription; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT unque_suscription UNIQUE (id_user, id_room, id_area, id_floor);


--
-- TOC entry 2104 (class 2606 OID 17176)
-- Name: personal_alarm_suscriptions user_alarm_suscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT user_alarm_suscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 2113 (class 2606 OID 17177)
-- Name: alarm ref_alarm_to_bed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_bed FOREIGN KEY (id_bed) REFERENCES public.bed(id);


--
-- TOC entry 2114 (class 2606 OID 17182)
-- Name: alarm ref_alarm_to_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_patient FOREIGN KEY (id_patient) REFERENCES public.patient(id);


--
-- TOC entry 2115 (class 2606 OID 17187)
-- Name: alarm ref_alarm_to_sensor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_sensor FOREIGN KEY (id_sensor) REFERENCES public.sensor(id);


--
-- TOC entry 2116 (class 2606 OID 17192)
-- Name: alarm ref_alarm_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_user FOREIGN KEY (ack_user) REFERENCES public.personal(id);


--
-- TOC entry 2117 (class 2606 OID 17197)
-- Name: area ref_area_to_floor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area
    ADD CONSTRAINT ref_area_to_floor FOREIGN KEY (id_floor) REFERENCES public.floor(id);


--
-- TOC entry 2118 (class 2606 OID 17202)
-- Name: bed ref_bed_to_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed
    ADD CONSTRAINT ref_bed_to_room FOREIGN KEY (id_room) REFERENCES public.room(id);


--
-- TOC entry 2119 (class 2606 OID 17207)
-- Name: build ref_build_to_hospital; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build
    ADD CONSTRAINT ref_build_to_hospital FOREIGN KEY (id_hospital) REFERENCES public.hospital(id);


--
-- TOC entry 2120 (class 2606 OID 17212)
-- Name: floor ref_floor_to_hospital; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor
    ADD CONSTRAINT ref_floor_to_hospital FOREIGN KEY (id_build) REFERENCES public.build(id);


--
-- TOC entry 2121 (class 2606 OID 17217)
-- Name: meassurement ref_meassurement_to_sensor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meassurement
    ADD CONSTRAINT ref_meassurement_to_sensor FOREIGN KEY (sensorid) REFERENCES public.sensor(id);


--
-- TOC entry 2122 (class 2606 OID 17222)
-- Name: patient ref_patient_to_bed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT ref_patient_to_bed FOREIGN KEY (id_bed) REFERENCES public.bed(id);


--
-- TOC entry 2123 (class 2606 OID 17227)
-- Name: patient ref_patient_to_sensor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT ref_patient_to_sensor FOREIGN KEY (id_sensor) REFERENCES public.sensor(id);


--
-- TOC entry 2130 (class 2606 OID 17232)
-- Name: room ref_room_to_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT ref_room_to_area FOREIGN KEY (id_area) REFERENCES public.area(id);


--
-- TOC entry 2126 (class 2606 OID 17237)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_area FOREIGN KEY (id_area) REFERENCES public.area(id);


--
-- TOC entry 2127 (class 2606 OID 17242)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_floor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_floor FOREIGN KEY (id_floor) REFERENCES public.floor(id);


--
-- TOC entry 2128 (class 2606 OID 17247)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_room FOREIGN KEY (id_room) REFERENCES public.room(id);


--
-- TOC entry 2129 (class 2606 OID 17252)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_user FOREIGN KEY (id_user) REFERENCES public.personal(id);


--
-- TOC entry 2124 (class 2606 OID 17257)
-- Name: personal ref_user_to_hospital; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal
    ADD CONSTRAINT ref_user_to_hospital FOREIGN KEY (id_hospital) REFERENCES public.hospital(id);


--
-- TOC entry 2125 (class 2606 OID 17262)
-- Name: personal ref_user_to_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal
    ADD CONSTRAINT ref_user_to_role FOREIGN KEY (id_role) REFERENCES public.role(id);


--
-- TOC entry 2251 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2020-05-04 08:52:13

--
-- PostgreSQL database dump complete
--

