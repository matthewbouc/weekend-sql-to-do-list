--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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

--
-- Name: weekend-to-do-app; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "weekend-to-do-app" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


\connect -reuse-previous=on "dbname='weekend-to-do-app'"

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
-- Name: todo_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.todo_list (
    id integer NOT NULL,
    task character varying(50),
    notes character varying(350),
    completed boolean DEFAULT false
);


--
-- Name: todo_list_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.todo_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: todo_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.todo_list_id_seq OWNED BY public.todo_list.id;


--
-- Name: todo_list id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo_list ALTER COLUMN id SET DEFAULT nextval('public.todo_list_id_seq'::regclass);


--
-- Data for Name: todo_list; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.todo_list (id, task, notes, completed) VALUES
	(43, 'TASK 1', 'Details', false),
	(44, 'TASK 2', 'SLIGHTLY Longer details', false),
	(45, 'task 3', 'Adding stuff into the database to maybe make it easier for this to load up and assess.', false),
	(46, 'task 4', 'Test', false),
	(47, 'Task 5', 'These can get pretty long.  oday is gonna be the day that they''re gonna throw it back to you
By now, you shoulda somehow realised what you gotta do
I don''t believe that anybody feels the way I do about you now

[Verse 2]
Backbeat, the word is on the street that the fire in your heart is out
I''m sure you''ve heard it all before, but you never really', false),
	(48, 'Task 6', 'And all the roads we have to walk are winding
And all the lights that lead us there are blinding
There are many things that I would like to say to you
But I don''t know how', false),
	(49, 'Task 7', 'Probably enough', false);


--
-- Name: todo_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.todo_list_id_seq', 49, true);


--
-- Name: todo_list todo_list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo_list
    ADD CONSTRAINT todo_list_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

