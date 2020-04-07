-- Database: cv19makers_vitalox

-- DROP DATABASE cv19makers_vitalox;

CREATE DATABASE cv19makers_vitalox
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;



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
-- TOC entry 206 (class 1259 OID 33910)
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
-- TOC entry 205 (class 1259 OID 33908)
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
-- TOC entry 2284 (class 0 OID 0)
-- Dependencies: 205
-- Name: alarm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alarm_id_seq OWNED BY public.alarm.id;


--
-- TOC entry 200 (class 1259 OID 33886)
-- Name: area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.area (
    id bigint NOT NULL,
    description character varying(20),
    id_floor bigint
);


ALTER TABLE public.area OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 33884)
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
-- TOC entry 2285 (class 0 OID 0)
-- Dependencies: 199
-- Name: area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.area_id_seq OWNED BY public.area.id;


--
-- TOC entry 196 (class 1259 OID 33870)
-- Name: bed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bed (
    id bigint NOT NULL,
    description character varying(20),
    id_room bigint
);


ALTER TABLE public.bed OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 33868)
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
-- TOC entry 2286 (class 0 OID 0)
-- Dependencies: 195
-- Name: bed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bed_id_seq OWNED BY public.bed.id;


--
-- TOC entry 204 (class 1259 OID 33902)
-- Name: build; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.build (
    id bigint NOT NULL,
    description character varying(20),
    id_hospital smallint
);


ALTER TABLE public.build OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 33900)
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
-- TOC entry 2287 (class 0 OID 0)
-- Dependencies: 203
-- Name: build_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.build_id_seq OWNED BY public.build.id;


--
-- TOC entry 202 (class 1259 OID 33894)
-- Name: floor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.floor (
    id bigint NOT NULL,
    description character varying(20),
    id_build bigint
);


ALTER TABLE public.floor OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 33892)
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
-- TOC entry 2288 (class 0 OID 0)
-- Dependencies: 201
-- Name: floor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.floor_id_seq OWNED BY public.floor.id;


--
-- TOC entry 210 (class 1259 OID 33927)
-- Name: hospital; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospital (
    id smallint NOT NULL,
    description character varying(20)
);


ALTER TABLE public.hospital OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 33925)
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
-- TOC entry 2289 (class 0 OID 0)
-- Dependencies: 209
-- Name: hospital_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hospital_id_seq OWNED BY public.hospital.id;


--
-- TOC entry 192 (class 1259 OID 33853)
-- Name: meassurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meassurement (
    id bigint NOT NULL,
    "time" timestamp without time zone DEFAULT ('now'::text)::timestamp(2) with time zone,
    spo2 smallint,
    ppm smallint,
    batt smallint,
    sequence bigint,
    sensorid bigint
);


ALTER TABLE public.meassurement OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 33851)
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
-- TOC entry 2290 (class 0 OID 0)
-- Dependencies: 191
-- Name: meassurement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meassurement_id_seq OWNED BY public.meassurement.id;


--
-- TOC entry 194 (class 1259 OID 33862)
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
    spo2_max smallint,
    spo2_min smallint,
    pulse_max smallint,
    pulse_min smallint,
    temp_max smallint,
    temp_min smallint,
    status smallint
);


ALTER TABLE public.patient OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 33860)
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
-- TOC entry 2291 (class 0 OID 0)
-- Dependencies: 193
-- Name: patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patient_id_seq OWNED BY public.patient.id;


--
-- TOC entry 186 (class 1259 OID 33829)
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
-- TOC entry 208 (class 1259 OID 33919)
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
-- TOC entry 185 (class 1259 OID 33827)
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
-- TOC entry 2292 (class 0 OID 0)
-- Dependencies: 185
-- Name: personal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personal_id_seq OWNED BY public.personal.id;


--
-- TOC entry 188 (class 1259 OID 33837)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id smallint NOT NULL,
    description character varying(40)
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 33835)
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
-- TOC entry 2293 (class 0 OID 0)
-- Dependencies: 187
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 198 (class 1259 OID 33878)
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id bigint NOT NULL,
    description character varying(40),
    id_area bigint
);


ALTER TABLE public.room OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 33876)
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
-- TOC entry 2294 (class 0 OID 0)
-- Dependencies: 197
-- Name: room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;


--
-- TOC entry 190 (class 1259 OID 33845)
-- Name: sensor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensor (
    id bigint NOT NULL,
    type bigint,
    auth_id character varying(20)
);


ALTER TABLE public.sensor OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 33843)
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
-- TOC entry 2295 (class 0 OID 0)
-- Dependencies: 189
-- Name: sensor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sensor_id_seq OWNED BY public.sensor.id;


--
-- TOC entry 207 (class 1259 OID 33917)
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
-- TOC entry 2296 (class 0 OID 0)
-- Dependencies: 207
-- Name: user_alarm_suscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_alarm_suscriptions_id_seq OWNED BY public.personal_alarm_suscriptions.id;


--
-- TOC entry 2088 (class 2604 OID 33913)
-- Name: alarm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm ALTER COLUMN id SET DEFAULT nextval('public.alarm_id_seq'::regclass);


--
-- TOC entry 2085 (class 2604 OID 33889)
-- Name: area id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area ALTER COLUMN id SET DEFAULT nextval('public.area_id_seq'::regclass);


--
-- TOC entry 2083 (class 2604 OID 33873)
-- Name: bed id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed ALTER COLUMN id SET DEFAULT nextval('public.bed_id_seq'::regclass);


--
-- TOC entry 2087 (class 2604 OID 33905)
-- Name: build id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build ALTER COLUMN id SET DEFAULT nextval('public.build_id_seq'::regclass);


--
-- TOC entry 2086 (class 2604 OID 33897)
-- Name: floor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor ALTER COLUMN id SET DEFAULT nextval('public.floor_id_seq'::regclass);


--
-- TOC entry 2091 (class 2604 OID 33930)
-- Name: hospital id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital ALTER COLUMN id SET DEFAULT nextval('public.hospital_id_seq'::regclass);


--
-- TOC entry 2080 (class 2604 OID 33856)
-- Name: meassurement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meassurement ALTER COLUMN id SET DEFAULT nextval('public.meassurement_id_seq'::regclass);


--
-- TOC entry 2082 (class 2604 OID 33865)
-- Name: patient id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient ALTER COLUMN id SET DEFAULT nextval('public.patient_id_seq'::regclass);


--
-- TOC entry 2077 (class 2604 OID 33832)
-- Name: personal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal ALTER COLUMN id SET DEFAULT nextval('public.personal_id_seq'::regclass);


--
-- TOC entry 2090 (class 2604 OID 33922)
-- Name: personal_alarm_suscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions ALTER COLUMN id SET DEFAULT nextval('public.user_alarm_suscriptions_id_seq'::regclass);


--
-- TOC entry 2078 (class 2604 OID 33840)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 2084 (class 2604 OID 33881)
-- Name: room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);


--
-- TOC entry 2079 (class 2604 OID 33848)
-- Name: sensor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor ALTER COLUMN id SET DEFAULT nextval('public.sensor_id_seq'::regclass);


--
-- TOC entry 2274 (class 0 OID 33910)
-- Dependencies: 206
-- Data for Name: alarm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alarm (id, created, id_patient, id_sensor, ack_user, ack_date, status, id_bed) FROM stdin;
\.


--
-- TOC entry 2268 (class 0 OID 33886)
-- Dependencies: 200
-- Data for Name: area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.area (id, description, id_floor) FROM stdin;
\.


--
-- TOC entry 2264 (class 0 OID 33870)
-- Dependencies: 196
-- Data for Name: bed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bed (id, description, id_room) FROM stdin;
\.


--
-- TOC entry 2272 (class 0 OID 33902)
-- Dependencies: 204
-- Data for Name: build; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.build (id, description, id_hospital) FROM stdin;
\.


--
-- TOC entry 2270 (class 0 OID 33894)
-- Dependencies: 202
-- Data for Name: floor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.floor (id, description, id_build) FROM stdin;
\.


--
-- TOC entry 2278 (class 0 OID 33927)
-- Dependencies: 210
-- Data for Name: hospital; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hospital (id, description) FROM stdin;
\.


--
-- TOC entry 2260 (class 0 OID 33853)
-- Dependencies: 192
-- Data for Name: meassurement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meassurement (id, "time", spo2, ppm, batt, sequence, sensorid) FROM stdin;
\.


--
-- TOC entry 2262 (class 0 OID 33862)
-- Dependencies: 194
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patient (id, surname, lastname, hospital_reference, suscribed, unsuscribed, id_bed, id_sensor, spo2_max, spo2_min, pulse_max, pulse_min, temp_max, temp_min, status) FROM stdin;
\.


--
-- TOC entry 2254 (class 0 OID 33829)
-- Dependencies: 186
-- Data for Name: personal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal (id, surname, lastname, professional_id, last_login, id_role, login, password, id_hospital, jwt) FROM stdin;
\.


--
-- TOC entry 2276 (class 0 OID 33919)
-- Dependencies: 208
-- Data for Name: personal_alarm_suscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_alarm_suscriptions (id, id_user, id_room, id_area, id_floor) FROM stdin;
\.


--
-- TOC entry 2256 (class 0 OID 33837)
-- Dependencies: 188
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, description) FROM stdin;
\.


--
-- TOC entry 2266 (class 0 OID 33878)
-- Dependencies: 198
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id, description, id_area) FROM stdin;
\.


--
-- TOC entry 2258 (class 0 OID 33845)
-- Dependencies: 190
-- Data for Name: sensor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sensor (id, type, auth_id) FROM stdin;
\.


--
-- TOC entry 2297 (class 0 OID 0)
-- Dependencies: 205
-- Name: alarm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alarm_id_seq', 1, false);


--
-- TOC entry 2298 (class 0 OID 0)
-- Dependencies: 199
-- Name: area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.area_id_seq', 1, false);


--
-- TOC entry 2299 (class 0 OID 0)
-- Dependencies: 195
-- Name: bed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bed_id_seq', 1, false);


--
-- TOC entry 2300 (class 0 OID 0)
-- Dependencies: 203
-- Name: build_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.build_id_seq', 1, false);


--
-- TOC entry 2301 (class 0 OID 0)
-- Dependencies: 201
-- Name: floor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.floor_id_seq', 1, false);


--
-- TOC entry 2302 (class 0 OID 0)
-- Dependencies: 209
-- Name: hospital_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hospital_id_seq', 1, false);


--
-- TOC entry 2303 (class 0 OID 0)
-- Dependencies: 191
-- Name: meassurement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meassurement_id_seq', 1, false);


--
-- TOC entry 2304 (class 0 OID 0)
-- Dependencies: 193
-- Name: patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patient_id_seq', 1, false);


--
-- TOC entry 2305 (class 0 OID 0)
-- Dependencies: 185
-- Name: personal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personal_id_seq', 1, false);


--
-- TOC entry 2306 (class 0 OID 0)
-- Dependencies: 187
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- TOC entry 2307 (class 0 OID 0)
-- Dependencies: 197
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_id_seq', 1, false);


--
-- TOC entry 2308 (class 0 OID 0)
-- Dependencies: 189
-- Name: sensor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sensor_id_seq', 1, false);


--
-- TOC entry 2309 (class 0 OID 0)
-- Dependencies: 207
-- Name: user_alarm_suscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_alarm_suscriptions_id_seq', 1, false);


--
-- TOC entry 2113 (class 2606 OID 33916)
-- Name: alarm alarm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT alarm_pkey PRIMARY KEY (id);


--
-- TOC entry 2107 (class 2606 OID 33891)
-- Name: area area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id);


--
-- TOC entry 2103 (class 2606 OID 33875)
-- Name: bed bed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed
    ADD CONSTRAINT bed_pkey PRIMARY KEY (id);


--
-- TOC entry 2111 (class 2606 OID 33907)
-- Name: build build_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build
    ADD CONSTRAINT build_pkey PRIMARY KEY (id);


--
-- TOC entry 2109 (class 2606 OID 33899)
-- Name: floor floor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor
    ADD CONSTRAINT floor_pkey PRIMARY KEY (id);


--
-- TOC entry 2117 (class 2606 OID 33932)
-- Name: hospital hospital_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital
    ADD CONSTRAINT hospital_pkey PRIMARY KEY (id);


--
-- TOC entry 2099 (class 2606 OID 33859)
-- Name: meassurement meassurement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meassurement
    ADD CONSTRAINT meassurement_pkey PRIMARY KEY (id);


--
-- TOC entry 2101 (class 2606 OID 33867)
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (id);


--
-- TOC entry 2093 (class 2606 OID 33834)
-- Name: personal personal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal
    ADD CONSTRAINT personal_pkey PRIMARY KEY (id);


--
-- TOC entry 2095 (class 2606 OID 33842)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 2105 (class 2606 OID 33883)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);


--
-- TOC entry 2097 (class 2606 OID 33850)
-- Name: sensor sensor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensor
    ADD CONSTRAINT sensor_pkey PRIMARY KEY (id);


--
-- TOC entry 2115 (class 2606 OID 33924)
-- Name: personal_alarm_suscriptions user_alarm_suscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT user_alarm_suscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 2131 (class 2606 OID 33998)
-- Name: alarm ref_alarm_to_bed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_bed FOREIGN KEY (id_bed) REFERENCES public.bed(id);


--
-- TOC entry 2128 (class 2606 OID 33983)
-- Name: alarm ref_alarm_to_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_patient FOREIGN KEY (id_patient) REFERENCES public.patient(id);


--
-- TOC entry 2129 (class 2606 OID 33988)
-- Name: alarm ref_alarm_to_sensor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_sensor FOREIGN KEY (id_sensor) REFERENCES public.sensor(id);


--
-- TOC entry 2130 (class 2606 OID 33993)
-- Name: alarm ref_alarm_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alarm
    ADD CONSTRAINT ref_alarm_to_user FOREIGN KEY (ack_user) REFERENCES public.personal(id);


--
-- TOC entry 2125 (class 2606 OID 33968)
-- Name: area ref_area_to_floor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area
    ADD CONSTRAINT ref_area_to_floor FOREIGN KEY (id_floor) REFERENCES public.floor(id);


--
-- TOC entry 2123 (class 2606 OID 33958)
-- Name: bed ref_bed_to_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed
    ADD CONSTRAINT ref_bed_to_room FOREIGN KEY (id_room) REFERENCES public.room(id);


--
-- TOC entry 2127 (class 2606 OID 33978)
-- Name: build ref_build_to_hospital; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build
    ADD CONSTRAINT ref_build_to_hospital FOREIGN KEY (id_hospital) REFERENCES public.hospital(id);


--
-- TOC entry 2126 (class 2606 OID 33973)
-- Name: floor ref_floor_to_hospital; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor
    ADD CONSTRAINT ref_floor_to_hospital FOREIGN KEY (id_build) REFERENCES public.build(id);


--
-- TOC entry 2120 (class 2606 OID 33943)
-- Name: meassurement ref_meassurement_to_sensor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meassurement
    ADD CONSTRAINT ref_meassurement_to_sensor FOREIGN KEY (sensorid) REFERENCES public.sensor(id);


--
-- TOC entry 2121 (class 2606 OID 33948)
-- Name: patient ref_patient_to_bed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT ref_patient_to_bed FOREIGN KEY (id_bed) REFERENCES public.bed(id);


--
-- TOC entry 2122 (class 2606 OID 33953)
-- Name: patient ref_patient_to_sensor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT ref_patient_to_sensor FOREIGN KEY (id_sensor) REFERENCES public.sensor(id);


--
-- TOC entry 2124 (class 2606 OID 33963)
-- Name: room ref_room_to_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT ref_room_to_area FOREIGN KEY (id_area) REFERENCES public.area(id);


--
-- TOC entry 2134 (class 2606 OID 34013)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_area FOREIGN KEY (id_area) REFERENCES public.area(id);


--
-- TOC entry 2135 (class 2606 OID 34018)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_floor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_floor FOREIGN KEY (id_floor) REFERENCES public.floor(id);


--
-- TOC entry 2133 (class 2606 OID 34008)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_room FOREIGN KEY (id_room) REFERENCES public.room(id);


--
-- TOC entry 2132 (class 2606 OID 34003)
-- Name: personal_alarm_suscriptions ref_user_alarm_suscriptions_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_alarm_suscriptions
    ADD CONSTRAINT ref_user_alarm_suscriptions_to_user FOREIGN KEY (id_user) REFERENCES public.personal(id);


--
-- TOC entry 2119 (class 2606 OID 33938)
-- Name: personal ref_user_to_hospital; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal
    ADD CONSTRAINT ref_user_to_hospital FOREIGN KEY (id_hospital) REFERENCES public.hospital(id);


--
-- TOC entry 2118 (class 2606 OID 33933)
-- Name: personal ref_user_to_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal
    ADD CONSTRAINT ref_user_to_role FOREIGN KEY (id_role) REFERENCES public.role(id);


-- Completed on 2020-04-05 20:27:04

--
-- PostgreSQL database dump complete
--
