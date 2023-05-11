--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    address_id integer NOT NULL,
    street character varying NOT NULL,
    city character varying NOT NULL,
    state character varying,
    country character varying NOT NULL,
    zip_code character varying NOT NULL
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: address_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_address_id_seq OWNER TO postgres;

--
-- Name: address_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_address_id_seq OWNED BY public.address.address_id;


--
-- Name: cart_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_session (
    total numeric,
    cart_id character varying NOT NULL
);


ALTER TABLE public.cart_session OWNER TO postgres;

--
-- Name: cart_stickers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_stickers (
    qty integer,
    sticker_id integer,
    cart_id character varying
);


ALTER TABLE public.cart_stickers OWNER TO postgres;

--
-- Name: stickers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stickers (
    id integer NOT NULL,
    title character varying,
    price numeric,
    qty_in_stock integer
);


ALTER TABLE public.stickers OWNER TO postgres;

--
-- Name: decal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.decal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.decal_id_seq OWNER TO postgres;

--
-- Name: decal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.decal_id_seq OWNED BY public.stickers.id;


--
-- Name: federated_credentials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.federated_credentials (
    user_id integer,
    provider character varying NOT NULL,
    subject character varying NOT NULL
);


ALTER TABLE public.federated_credentials OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    status character varying,
    address_id integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: orders_stickers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_stickers (
    sticker_id integer,
    qty integer,
    order_id integer
);


ALTER TABLE public.orders_stickers OWNER TO postgres;

--
-- Name: stickers_per_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stickers_per_lists (
    decal_id integer,
    list_id integer
);


ALTER TABLE public.stickers_per_lists OWNER TO postgres;

--
-- Name: user_sticker_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sticker_list (
    id integer NOT NULL,
    name character varying,
    user_id integer
);


ALTER TABLE public.user_sticker_list OWNER TO postgres;

--
-- Name: user_decal_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_decal_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_decal_list_id_seq OWNER TO postgres;

--
-- Name: user_decal_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_decal_list_id_seq OWNED BY public.user_sticker_list.id;


--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30),
    hashed_password bytea,
    salt bytea,
    name text,
    address_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_address_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: stickers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stickers ALTER COLUMN id SET DEFAULT nextval('public.decal_id_seq'::regclass);


--
-- Name: user_sticker_list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sticker_list ALTER COLUMN id SET DEFAULT nextval('public.user_decal_list_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (address_id, street, city, state, country, zip_code) FROM stdin;
\.


--
-- Data for Name: cart_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_session (total, cart_id) FROM stdin;
0	gJMX6Q4NxfnyLCAqXZzBZQ
0	gVpGoqKGGWLaT6amDtjHm6
0	18jdkC9sodQ2zAhZR8FKhc
0	si7nxrN2hyQSCWCfN3CpaU
0	gEAquT54AwV4chY6JezUdm
0	ndhNSgCGxMAa6wGSsTURbi
0	v3kGaxXR1jL7e8nMdQSNfj
0	97JwZK72QbjXre73trZ7Fw
\.


--
-- Data for Name: cart_stickers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_stickers (qty, sticker_id, cart_id) FROM stdin;
5	1	gJMX6Q4NxfnyLCAqXZzBZQ
3	2	gJMX6Q4NxfnyLCAqXZzBZQ
6	3	gJMX6Q4NxfnyLCAqXZzBZQ
\.


--
-- Data for Name: federated_credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.federated_credentials (user_id, provider, subject) FROM stdin;
3	https://accounts.google.com	115954529227902016294
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, status, address_id) FROM stdin;
\.


--
-- Data for Name: orders_stickers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_stickers (sticker_id, qty, order_id) FROM stdin;
\.


--
-- Data for Name: stickers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stickers (id, title, price, qty_in_stock) FROM stdin;
1	Hufflepuff	9.99	50
2	Gryffindor	9.99	100
3	Slytherin	9.99	25
4	Ravenclaw	9.99	50
\.


--
-- Data for Name: stickers_per_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stickers_per_lists (decal_id, list_id) FROM stdin;
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sessions (sid, sess, expire) FROM stdin;
K5Q9aq5ERXXThcjmkCoPiOQg_BlH94OJ	{"cookie":{"originalMaxAge":2592000000,"expires":"2023-05-20T23:25:38.842Z","httpOnly":true,"path":"/"},"passport":{"user":{"id":1,"username":"yoshi123"}}}	2023-05-20 15:25:39
e_jt3u00e9KP6nZei-gDg5vI9wpS_yHh	{"cookie":{"originalMaxAge":2592000000,"expires":"2023-05-24T18:33:42.605Z","httpOnly":true,"path":"/"},"cart":{"id":"gJMX6Q4NxfnyLCAqXZzBZQ","total":0}}	2023-05-24 14:12:28
EhREHaV5ic3hF9PFz_1Qo2z8WSNnAuFR	{"cookie":{"originalMaxAge":2592000000,"expires":"2023-05-25T20:55:35.015Z","httpOnly":true,"path":"/"}}	2023-05-25 12:55:36
\.


--
-- Data for Name: user_sticker_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sticker_list (id, name, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, hashed_password, salt, name, address_id) FROM stdin;
1	yoshi123	\\xd07b54972b8e3fb2ddad838825d1698efb7e7c63eb997430c51c69ec51f9f22e	\\x229f526a5426455504eef189fbd43f89	yoshi123	\N
2	peach001	\\xedcf89bd5a8531ca13060705a46eeabd49616301a5a7487f574fab0f059dddd6	\\x259b049093a07d88618cc3faeb082e28	peach001	\N
3	\N	\N	\N	Ryan Bonk	\N
\.


--
-- Name: address_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_address_id_seq', 1, false);


--
-- Name: decal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.decal_id_seq', 4, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);


--
-- Name: user_decal_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_decal_list_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (address_id);


--
-- Name: cart_session cart_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_session
    ADD CONSTRAINT cart_session_pkey PRIMARY KEY (cart_id);


--
-- Name: stickers decal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stickers
    ADD CONSTRAINT decal_pkey PRIMARY KEY (id);


--
-- Name: federated_credentials federated_credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.federated_credentials
    ADD CONSTRAINT federated_credentials_pkey PRIMARY KEY (provider, subject);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: user_sessions session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: user_sticker_list user_decal_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sticker_list
    ADD CONSTRAINT user_decal_list_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.user_sessions USING btree (expire);


--
-- Name: cart_stickers cart_stickers_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_stickers
    ADD CONSTRAINT cart_stickers_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.cart_session(cart_id);


--
-- Name: cart_stickers cart_stickers_sticker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_stickers
    ADD CONSTRAINT cart_stickers_sticker_id_fkey FOREIGN KEY (sticker_id) REFERENCES public.stickers(id);


--
-- Name: stickers_per_lists decals_per_lists_decal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stickers_per_lists
    ADD CONSTRAINT decals_per_lists_decal_id_fkey FOREIGN KEY (decal_id) REFERENCES public.stickers(id);


--
-- Name: stickers_per_lists decals_per_lists_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stickers_per_lists
    ADD CONSTRAINT decals_per_lists_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.user_sticker_list(id);


--
-- Name: federated_credentials federated_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.federated_credentials
    ADD CONSTRAINT federated_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: orders orders_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(address_id);


--
-- Name: orders_stickers orders_decals_decal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_stickers
    ADD CONSTRAINT orders_decals_decal_id_fkey FOREIGN KEY (sticker_id) REFERENCES public.stickers(id);


--
-- Name: orders_stickers orders_decals_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_stickers
    ADD CONSTRAINT orders_decals_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: user_sticker_list user_decal_list_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sticker_list
    ADD CONSTRAINT user_decal_list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: TABLE address; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.address TO devdoodle;


--
-- Name: SEQUENCE address_address_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.address_address_id_seq TO devdoodle;


--
-- Name: TABLE cart_session; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.cart_session TO devdoodle;


--
-- Name: TABLE cart_stickers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.cart_stickers TO devdoodle;


--
-- Name: TABLE stickers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.stickers TO devdoodle;


--
-- Name: SEQUENCE decal_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.decal_id_seq TO devdoodle;


--
-- Name: TABLE federated_credentials; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.federated_credentials TO devdoodle;


--
-- Name: TABLE orders; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.orders TO devdoodle;


--
-- Name: SEQUENCE orders_order_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.orders_order_id_seq TO devdoodle;


--
-- Name: TABLE orders_stickers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.orders_stickers TO devdoodle;


--
-- Name: TABLE stickers_per_lists; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.stickers_per_lists TO devdoodle;


--
-- Name: TABLE user_sticker_list; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_sticker_list TO devdoodle;


--
-- Name: SEQUENCE user_decal_list_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.user_decal_list_id_seq TO devdoodle;


--
-- Name: TABLE user_sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_sessions TO devdoodle;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO devdoodle;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.users_id_seq TO devdoodle;


--
-- PostgreSQL database dump complete
--

