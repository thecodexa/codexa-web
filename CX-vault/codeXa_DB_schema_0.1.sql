--
-- PostgreSQL database dump
--

\restrict lwD50zEHPfb8oVYR98xA4ln9TTOlRHUqCOIxgfycW8cpco1FZVtTCJMgFFO6651

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-24 19:16:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16872)
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16977)
-- Name: batches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.batches (
    batch_id integer NOT NULL,
    name character varying(100) NOT NULL,
    year integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.batches OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16982)
-- Name: batches_batch_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.batches_batch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.batches_batch_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 219
-- Name: batches_batch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.batches_batch_id_seq OWNED BY public.batches.batch_id;


--
-- TOC entry 220 (class 1259 OID 16983)
-- Name: contest_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contest_registrations (
    id integer NOT NULL,
    user_id integer NOT NULL,
    contest_id integer NOT NULL,
    status character varying(20) DEFAULT 'registered'::character varying NOT NULL,
    total_score integer DEFAULT 0,
    registered_at timestamp without time zone DEFAULT now(),
    CONSTRAINT contest_registrations_status_check CHECK (((status)::text = ANY (ARRAY[('registered'::character varying)::text, ('participated'::character varying)::text, ('completed'::character varying)::text])))
);


ALTER TABLE public.contest_registrations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16990)
-- Name: contest_registrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contest_registrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contest_registrations_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 221
-- Name: contest_registrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contest_registrations_id_seq OWNED BY public.contest_registrations.id;


--
-- TOC entry 222 (class 1259 OID 16991)
-- Name: contests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contests (
    contest_id integer NOT NULL,
    title character varying(150) NOT NULL,
    description text,
    created_by integer,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.contests OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16998)
-- Name: contests_contest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contests_contest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contests_contest_id_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 223
-- Name: contests_contest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contests_contest_id_seq OWNED BY public.contests.contest_id;


--
-- TOC entry 224 (class 1259 OID 16999)
-- Name: problems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.problems (
    problem_id integer NOT NULL,
    contest_id integer NOT NULL,
    title character varying(150) NOT NULL,
    description text NOT NULL,
    difficulty character varying(20) NOT NULL,
    max_score integer NOT NULL,
    time_limit integer DEFAULT 2,
    memory_limit integer DEFAULT 256,
    input_format text,
    output_format text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT problems_difficulty_check CHECK (((difficulty)::text = ANY (ARRAY[('easy'::character varying)::text, ('medium'::character varying)::text, ('hard'::character varying)::text])))
);


ALTER TABLE public.problems OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17009)
-- Name: problems_problem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.problems_problem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.problems_problem_id_seq OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 225
-- Name: problems_problem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.problems_problem_id_seq OWNED BY public.problems.problem_id;


--
-- TOC entry 226 (class 1259 OID 17010)
-- Name: submissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.submissions (
    submission_id integer NOT NULL,
    problem_id integer NOT NULL,
    user_id integer NOT NULL,
    code text NOT NULL,
    language character varying(30) NOT NULL,
    status character varying(30) NOT NULL,
    score integer DEFAULT 0,
    submitted_at timestamp without time zone DEFAULT now(),
    time_taken double precision DEFAULT 0,
    memory_used integer DEFAULT 0,
    CONSTRAINT submissions_status_check CHECK (((status)::text = ANY (ARRAY[('Accepted'::character varying)::text, ('Wrong Answer'::character varying)::text, ('TLE'::character varying)::text, ('Runtime Error'::character varying)::text, ('Compile Error'::character varying)::text])))
);


ALTER TABLE public.submissions OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17020)
-- Name: submissions_submission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.submissions_submission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.submissions_submission_id_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 227
-- Name: submissions_submission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.submissions_submission_id_seq OWNED BY public.submissions.submission_id;


--
-- TOC entry 228 (class 1259 OID 17021)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name public.citext,
    first_name character varying(50),
    last_name character varying(50),
    email public.citext NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) NOT NULL,
    batch_id integer,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY (ARRAY[('student'::character varying)::text, ('teacher'::character varying)::text, ('admin'::character varying)::text])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17030)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 229
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4857 (class 2604 OID 17031)
-- Name: batches batch_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batches ALTER COLUMN batch_id SET DEFAULT nextval('public.batches_batch_id_seq'::regclass);


--
-- TOC entry 4860 (class 2604 OID 17032)
-- Name: contest_registrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contest_registrations ALTER COLUMN id SET DEFAULT nextval('public.contest_registrations_id_seq'::regclass);


--
-- TOC entry 4864 (class 2604 OID 17033)
-- Name: contests contest_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contests ALTER COLUMN contest_id SET DEFAULT nextval('public.contests_contest_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 17034)
-- Name: problems problem_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problems ALTER COLUMN problem_id SET DEFAULT nextval('public.problems_problem_id_seq'::regclass);


--
-- TOC entry 4872 (class 2604 OID 17035)
-- Name: submissions submission_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions ALTER COLUMN submission_id SET DEFAULT nextval('public.submissions_submission_id_seq'::regclass);


--
-- TOC entry 4877 (class 2604 OID 17036)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4886 (class 2606 OID 17038)
-- Name: batches batches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_pkey PRIMARY KEY (batch_id);


--
-- TOC entry 4888 (class 2606 OID 17040)
-- Name: contest_registrations contest_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contest_registrations
    ADD CONSTRAINT contest_registrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4890 (class 2606 OID 17042)
-- Name: contest_registrations contest_registrations_user_id_contest_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contest_registrations
    ADD CONSTRAINT contest_registrations_user_id_contest_id_key UNIQUE (user_id, contest_id);


--
-- TOC entry 4892 (class 2606 OID 17044)
-- Name: contests contests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contests
    ADD CONSTRAINT contests_pkey PRIMARY KEY (contest_id);


--
-- TOC entry 4894 (class 2606 OID 17046)
-- Name: problems problems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problems
    ADD CONSTRAINT problems_pkey PRIMARY KEY (problem_id);


--
-- TOC entry 4896 (class 2606 OID 17048)
-- Name: submissions submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (submission_id);


--
-- TOC entry 4898 (class 2606 OID 17050)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4900 (class 2606 OID 17052)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4902 (class 2606 OID 17054)
-- Name: users users_user_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_name_key UNIQUE (user_name);


--
-- TOC entry 4903 (class 2606 OID 17055)
-- Name: contest_registrations contest_registrations_contest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contest_registrations
    ADD CONSTRAINT contest_registrations_contest_id_fkey FOREIGN KEY (contest_id) REFERENCES public.contests(contest_id) ON DELETE CASCADE;


--
-- TOC entry 4904 (class 2606 OID 17060)
-- Name: contest_registrations contest_registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contest_registrations
    ADD CONSTRAINT contest_registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4905 (class 2606 OID 17065)
-- Name: contests contests_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contests
    ADD CONSTRAINT contests_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- TOC entry 4909 (class 2606 OID 17070)
-- Name: users fk_batch; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_batch FOREIGN KEY (batch_id) REFERENCES public.batches(batch_id) ON DELETE SET NULL;


--
-- TOC entry 4906 (class 2606 OID 17075)
-- Name: problems problems_contest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problems
    ADD CONSTRAINT problems_contest_id_fkey FOREIGN KEY (contest_id) REFERENCES public.contests(contest_id) ON DELETE CASCADE;


--
-- TOC entry 4907 (class 2606 OID 17080)
-- Name: submissions submissions_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problems(problem_id) ON DELETE CASCADE;


--
-- TOC entry 4908 (class 2606 OID 17085)
-- Name: submissions submissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-09-24 19:16:21

--
-- PostgreSQL database dump complete
--

\unrestrict lwD50zEHPfb8oVYR98xA4ln9TTOlRHUqCOIxgfycW8cpco1FZVtTCJMgFFO6651

