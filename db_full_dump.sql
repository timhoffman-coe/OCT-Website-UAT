--
-- PostgreSQL database dump
--

\restrict CWC3tpRjaVQRIxrbfDybodgFJcNvKQfBbK6iDrUqYm1dS543JfcfQFVa83SwxyD

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

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

ALTER TABLE IF EXISTS ONLY public."WidgetInstance" DROP CONSTRAINT IF EXISTS "WidgetInstance_widgetDefinitionId_fkey";
ALTER TABLE IF EXISTS ONLY public."WidgetInstance" DROP CONSTRAINT IF EXISTS "WidgetInstance_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."TrelloBoard" DROP CONSTRAINT IF EXISTS "TrelloBoard_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."Team" DROP CONSTRAINT IF EXISTS "Team_parentId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamTab" DROP CONSTRAINT IF EXISTS "TeamTab_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamService" DROP CONSTRAINT IF EXISTS "TeamService_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamQuickLink" DROP CONSTRAINT IF EXISTS "TeamQuickLink_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamPermission" DROP CONSTRAINT IF EXISTS "TeamPermission_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamPermission" DROP CONSTRAINT IF EXISTS "TeamPermission_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamMember" DROP CONSTRAINT IF EXISTS "TeamMember_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamInitiative" DROP CONSTRAINT IF EXISTS "TeamInitiative_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."TeamContact" DROP CONSTRAINT IF EXISTS "TeamContact_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."SubpageService" DROP CONSTRAINT IF EXISTS "SubpageService_subpageId_fkey";
ALTER TABLE IF EXISTS ONLY public."SubpageQuickLink" DROP CONSTRAINT IF EXISTS "SubpageQuickLink_subpageId_fkey";
ALTER TABLE IF EXISTS ONLY public."SubpageInitiative" DROP CONSTRAINT IF EXISTS "SubpageInitiative_subpageId_fkey";
ALTER TABLE IF EXISTS ONLY public."SubpageContact" DROP CONSTRAINT IF EXISTS "SubpageContact_subpageId_fkey";
ALTER TABLE IF EXISTS ONLY public."ServiceArea" DROP CONSTRAINT IF EXISTS "ServiceArea_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."Portfolio" DROP CONSTRAINT IF EXISTS "Portfolio_teamId_fkey";
ALTER TABLE IF EXISTS ONLY public."Portfolio" DROP CONSTRAINT IF EXISTS "Portfolio_linkedTeamId_fkey";
ALTER TABLE IF EXISTS ONLY public."PortfolioSubpage" DROP CONSTRAINT IF EXISTS "PortfolioSubpage_portfolioId_fkey";
ALTER TABLE IF EXISTS ONLY public."DiagramLink" DROP CONSTRAINT IF EXISTS "DiagramLink_teamTabId_fkey";
ALTER TABLE IF EXISTS ONLY public."AuditLog" DROP CONSTRAINT IF EXISTS "AuditLog_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."AccordionLink" DROP CONSTRAINT IF EXISTS "AccordionLink_groupId_fkey";
ALTER TABLE IF EXISTS ONLY public."AccordionGroup" DROP CONSTRAINT IF EXISTS "AccordionGroup_teamId_fkey";
DROP INDEX IF EXISTS public."WidgetInstance_teamId_widgetDefinitionId_key";
DROP INDEX IF EXISTS public."WidgetInstance_teamId_sortOrder_idx";
DROP INDEX IF EXISTS public."WidgetDefinition_widgetType_key";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."Team_slug_key";
DROP INDEX IF EXISTS public."TeamPermission_userId_teamId_key";
DROP INDEX IF EXISTS public."Portfolio_linkedTeamId_key";
DROP INDEX IF EXISTS public."PortfolioSubpage_portfolioId_key";
ALTER TABLE IF EXISTS ONLY public."WidgetInstance" DROP CONSTRAINT IF EXISTS "WidgetInstance_pkey";
ALTER TABLE IF EXISTS ONLY public."WidgetDefinition" DROP CONSTRAINT IF EXISTS "WidgetDefinition_pkey";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."TrelloBoard" DROP CONSTRAINT IF EXISTS "TrelloBoard_pkey";
ALTER TABLE IF EXISTS ONLY public."Team" DROP CONSTRAINT IF EXISTS "Team_pkey";
ALTER TABLE IF EXISTS ONLY public."TeamTab" DROP CONSTRAINT IF EXISTS "TeamTab_pkey";
ALTER TABLE IF EXISTS ONLY public."TeamService" DROP CONSTRAINT IF EXISTS "TeamService_pkey";
ALTER TABLE IF EXISTS ONLY public."TeamQuickLink" DROP CONSTRAINT IF EXISTS "TeamQuickLink_pkey";
ALTER TABLE IF EXISTS ONLY public."TeamPermission" DROP CONSTRAINT IF EXISTS "TeamPermission_pkey";
ALTER TABLE IF EXISTS ONLY public."TeamMember" DROP CONSTRAINT IF EXISTS "TeamMember_pkey";
ALTER TABLE IF EXISTS ONLY public."TeamInitiative" DROP CONSTRAINT IF EXISTS "TeamInitiative_pkey";
ALTER TABLE IF EXISTS ONLY public."TeamContact" DROP CONSTRAINT IF EXISTS "TeamContact_pkey";
ALTER TABLE IF EXISTS ONLY public."SubpageService" DROP CONSTRAINT IF EXISTS "SubpageService_pkey";
ALTER TABLE IF EXISTS ONLY public."SubpageQuickLink" DROP CONSTRAINT IF EXISTS "SubpageQuickLink_pkey";
ALTER TABLE IF EXISTS ONLY public."SubpageInitiative" DROP CONSTRAINT IF EXISTS "SubpageInitiative_pkey";
ALTER TABLE IF EXISTS ONLY public."SubpageContact" DROP CONSTRAINT IF EXISTS "SubpageContact_pkey";
ALTER TABLE IF EXISTS ONLY public."ServiceArea" DROP CONSTRAINT IF EXISTS "ServiceArea_pkey";
ALTER TABLE IF EXISTS ONLY public."Portfolio" DROP CONSTRAINT IF EXISTS "Portfolio_pkey";
ALTER TABLE IF EXISTS ONLY public."PortfolioSubpage" DROP CONSTRAINT IF EXISTS "PortfolioSubpage_pkey";
ALTER TABLE IF EXISTS ONLY public."DiagramLink" DROP CONSTRAINT IF EXISTS "DiagramLink_pkey";
ALTER TABLE IF EXISTS ONLY public."AuditLog" DROP CONSTRAINT IF EXISTS "AuditLog_pkey";
ALTER TABLE IF EXISTS ONLY public."AccordionLink" DROP CONSTRAINT IF EXISTS "AccordionLink_pkey";
ALTER TABLE IF EXISTS ONLY public."AccordionGroup" DROP CONSTRAINT IF EXISTS "AccordionGroup_pkey";
DROP TABLE IF EXISTS public."WidgetInstance";
DROP TABLE IF EXISTS public."WidgetDefinition";
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."TrelloBoard";
DROP TABLE IF EXISTS public."TeamTab";
DROP TABLE IF EXISTS public."TeamService";
DROP TABLE IF EXISTS public."TeamQuickLink";
DROP TABLE IF EXISTS public."TeamPermission";
DROP TABLE IF EXISTS public."TeamMember";
DROP TABLE IF EXISTS public."TeamInitiative";
DROP TABLE IF EXISTS public."TeamContact";
DROP TABLE IF EXISTS public."Team";
DROP TABLE IF EXISTS public."SubpageService";
DROP TABLE IF EXISTS public."SubpageQuickLink";
DROP TABLE IF EXISTS public."SubpageInitiative";
DROP TABLE IF EXISTS public."SubpageContact";
DROP TABLE IF EXISTS public."ServiceArea";
DROP TABLE IF EXISTS public."PortfolioSubpage";
DROP TABLE IF EXISTS public."Portfolio";
DROP TABLE IF EXISTS public."DiagramLink";
DROP TABLE IF EXISTS public."AuditLog";
DROP TABLE IF EXISTS public."AccordionLink";
DROP TABLE IF EXISTS public."AccordionGroup";
DROP TYPE IF EXISTS public."Role";
DROP TYPE IF EXISTS public."PageTemplate";
--
-- Name: PageTemplate; Type: TYPE; Schema: public; Owner: coe_admin
--

CREATE TYPE public."PageTemplate" AS ENUM (
    'ITS_TEAM',
    'SECTION',
    'SUB_TEAM',
    'CUSTOM'
);


ALTER TYPE public."PageTemplate" OWNER TO coe_admin;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: coe_admin
--

CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'TEAM_ADMIN',
    'VIEWER'
);


ALTER TYPE public."Role" OWNER TO coe_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AccordionGroup; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."AccordionGroup" (
    id text NOT NULL,
    "teamId" text,
    "groupId" text NOT NULL,
    title text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."AccordionGroup" OWNER TO coe_admin;

--
-- Name: AccordionLink; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."AccordionLink" (
    id text NOT NULL,
    "groupId" text NOT NULL,
    label text NOT NULL,
    href text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."AccordionLink" OWNER TO coe_admin;

--
-- Name: AuditLog; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."AuditLog" (
    id text NOT NULL,
    "userId" text NOT NULL,
    action text NOT NULL,
    entity text NOT NULL,
    "entityId" text NOT NULL,
    changes jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."AuditLog" OWNER TO coe_admin;

--
-- Name: DiagramLink; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."DiagramLink" (
    id text NOT NULL,
    "teamTabId" text NOT NULL,
    label text NOT NULL,
    href text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."DiagramLink" OWNER TO coe_admin;

--
-- Name: Portfolio; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."Portfolio" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    "iconName" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    href text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "linkedTeamId" text
);


ALTER TABLE public."Portfolio" OWNER TO coe_admin;

--
-- Name: PortfolioSubpage; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."PortfolioSubpage" (
    id text NOT NULL,
    "portfolioId" text NOT NULL,
    "parentTeam" text NOT NULL,
    "parentTeamHref" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "iconName" text NOT NULL,
    "showStatus" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."PortfolioSubpage" OWNER TO coe_admin;

--
-- Name: ServiceArea; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."ServiceArea" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    "serviceAreaId" text NOT NULL,
    title text NOT NULL,
    "shortDescription" text NOT NULL,
    "fullDescription" text NOT NULL,
    features text[],
    icon text,
    link text,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."ServiceArea" OWNER TO coe_admin;

--
-- Name: SubpageContact; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."SubpageContact" (
    id text NOT NULL,
    "subpageId" text NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    email text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."SubpageContact" OWNER TO coe_admin;

--
-- Name: SubpageInitiative; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."SubpageInitiative" (
    id text NOT NULL,
    "subpageId" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    href text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."SubpageInitiative" OWNER TO coe_admin;

--
-- Name: SubpageQuickLink; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."SubpageQuickLink" (
    id text NOT NULL,
    "subpageId" text NOT NULL,
    label text NOT NULL,
    description text NOT NULL,
    href text NOT NULL,
    "isSecure" boolean DEFAULT false NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."SubpageQuickLink" OWNER TO coe_admin;

--
-- Name: SubpageService; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."SubpageService" (
    id text NOT NULL,
    "subpageId" text NOT NULL,
    title text NOT NULL,
    items text[],
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."SubpageService" OWNER TO coe_admin;

--
-- Name: Team; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."Team" (
    id text NOT NULL,
    slug text NOT NULL,
    "teamName" text NOT NULL,
    "teamShortName" text NOT NULL,
    "pageTemplate" public."PageTemplate" DEFAULT 'ITS_TEAM'::public."PageTemplate" NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isPublished" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "pageTitle" text,
    "pageDescription" text,
    "iconName" text,
    "showStatus" boolean DEFAULT false NOT NULL,
    "parentId" text
);


ALTER TABLE public."Team" OWNER TO coe_admin;

--
-- Name: TeamContact; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TeamContact" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    email text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TeamContact" OWNER TO coe_admin;

--
-- Name: TeamInitiative; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TeamInitiative" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    href text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TeamInitiative" OWNER TO coe_admin;

--
-- Name: TeamMember; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TeamMember" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    name text NOT NULL,
    title text NOT NULL,
    email text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TeamMember" OWNER TO coe_admin;

--
-- Name: TeamPermission; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TeamPermission" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "teamId" text NOT NULL
);


ALTER TABLE public."TeamPermission" OWNER TO coe_admin;

--
-- Name: TeamQuickLink; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TeamQuickLink" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    label text NOT NULL,
    description text NOT NULL,
    href text NOT NULL,
    "isSecure" boolean DEFAULT false NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TeamQuickLink" OWNER TO coe_admin;

--
-- Name: TeamService; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TeamService" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    title text NOT NULL,
    items text[],
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TeamService" OWNER TO coe_admin;

--
-- Name: TeamTab; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TeamTab" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    "tabId" text NOT NULL,
    label text NOT NULL,
    "videoTitle" text NOT NULL,
    "videoDescription" text NOT NULL,
    "videoUrl" text NOT NULL,
    "diagramsTitle" text NOT NULL,
    "diagramsDescription" text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TeamTab" OWNER TO coe_admin;

--
-- Name: TrelloBoard; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."TrelloBoard" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    href text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TrelloBoard" OWNER TO coe_admin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    role public."Role" DEFAULT 'VIEWER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO coe_admin;

--
-- Name: WidgetDefinition; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."WidgetDefinition" (
    id text NOT NULL,
    "widgetType" text NOT NULL,
    label text NOT NULL,
    description text,
    icon text DEFAULT 'LayoutGrid'::text NOT NULL,
    "isEnabled" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."WidgetDefinition" OWNER TO coe_admin;

--
-- Name: WidgetInstance; Type: TABLE; Schema: public; Owner: coe_admin
--

CREATE TABLE public."WidgetInstance" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    "widgetDefinitionId" text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    config jsonb
);


ALTER TABLE public."WidgetInstance" OWNER TO coe_admin;

--
-- Data for Name: AccordionGroup; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."AccordionGroup" (id, "teamId", "groupId", title, "sortOrder") FROM stdin;
cmlvent5000506en2e6lxorbc	\N	incident	Incident Management	0
cmlvent5e00586en2ifhvxaov	\N	change	Change Management	1
cmlvent5n005h6en2tlx6zn1u	\N	resource	Resource Management	2
cmlvent5x005r6en2t5fgxj2y	\N	its-links	ITS Team Sites & Other Links	3
\.


--
-- Data for Name: AccordionLink; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."AccordionLink" (id, "groupId", label, href, "sortOrder") FROM stdin;
cmlvent5100516en2e7x3glnr	cmlvent5000506en2e6lxorbc	Helix (Remedy) SmartIT	#	0
cmlvent5100526en2sa019y7d	cmlvent5000506en2e6lxorbc	Helix (Remedy) DWP	#	1
cmlvent5100536en2fi1j5r0n	cmlvent5000506en2e6lxorbc	Incident Management Process	#	2
cmlvent5100546en2268hr21y	cmlvent5000506en2e6lxorbc	WO from Incident Ticket	#	3
cmlvent5100556en24e4yp75d	cmlvent5000506en2e6lxorbc	Incident Management Flow Charts	#	4
cmlvent5100566en21dmkwrcd	cmlvent5000506en2e6lxorbc	Problem Mgmt Process Guide	#	5
cmlvent5100576en2if14b8tl	cmlvent5000506en2e6lxorbc	Root Cause Analysis (RCA)	#	6
cmlvent5f00596en25wwwwnoc	cmlvent5e00586en2ifhvxaov	OCT Change Management	#	0
cmlvent5f005a6en2vgwtbg2f	cmlvent5e00586en2ifhvxaov	OCT Schedule Outages	#	1
cmlvent5f005b6en2r13kgaec	cmlvent5e00586en2ifhvxaov	Severity 1 Procedures	#	2
cmlvent5f005c6en2av1l3lmf	cmlvent5e00586en2ifhvxaov	OCT Change Management Definitions	#	3
cmlvent5f005d6en24vbcg8gs	cmlvent5e00586en2ifhvxaov	Change Approval - Form	#	4
cmlvent5f005e6en2rx944lmg	cmlvent5e00586en2ifhvxaov	Work Order vs Change Ticket	#	5
cmlvent5f005f6en2k3pdxzc2	cmlvent5e00586en2ifhvxaov	Remedy Definitions	#	6
cmlvent5f005g6en27lbabgdn	cmlvent5e00586en2ifhvxaov	Change Ticket Cheat Sheet	#	7
cmlvent5o005i6en2qhl37e3m	cmlvent5n005h6en2tlx6zn1u	Taleo	#	0
cmlvent5o005j6en29cpjmx3l	cmlvent5n005h6en2tlx6zn1u	Recruitment Toolkit	#	1
cmlvent5o005k6en2uud9wtr3	cmlvent5n005h6en2tlx6zn1u	Recruitment Approval Process User Guide	#	2
cmlvent5o005l6en2tknmtamp	cmlvent5n005h6en2tlx6zn1u	Recruitment Approval Form	#	3
cmlvent5o005m6en2smxzbid1	cmlvent5n005h6en2tlx6zn1u	SAP Time Entry Request	#	4
cmlvent5o005n6en254ckml6x	cmlvent5n005h6en2tlx6zn1u	New Account Request	#	5
cmlvent5o005o6en2wfbv6pe9	cmlvent5n005h6en2tlx6zn1u	Phone Request	#	6
cmlvent5o005p6en2yq7c3n7o	cmlvent5n005h6en2tlx6zn1u	Offboarding Link	#	7
cmlvent5o005q6en263uf4uhw	cmlvent5n005h6en2tlx6zn1u	Supervisor Offboarding Checklist	#	8
cmlvent5y005s6en2w1hzhd65	cmlvent5x005r6en2t5fgxj2y	ITS Service Catalog	#	0
cmlvent5y005t6en2ugtnxkqn	cmlvent5x005r6en2t5fgxj2y	Technology Infrastructure Operations	#	1
cmlvent5y005u6en23jy7yfre	cmlvent5x005r6en2t5fgxj2y	Service Desk	#	2
cmlvent5y005v6en2vq1l3qms	cmlvent5x005r6en2t5fgxj2y	Service Management Office	#	3
cmlvent5y005w6en20x8eayrm	cmlvent5x005r6en2t5fgxj2y	Enterprise Commons Project	#	4
cmlvent5y005x6en2gowpg77x	cmlvent5x005r6en2t5fgxj2y	OCT Employee Links	#	5
cmlvent5y005y6en2btam7wjr	cmlvent5x005r6en2t5fgxj2y	Technology PMO	#	6
cmlvent5y005z6en2gonx8ejh	cmlvent5x005r6en2t5fgxj2y	Open Data Portal	#	7
cmlvent5y00606en2tioryxhs	cmlvent5x005r6en2t5fgxj2y	Open City	#	8
\.


--
-- Data for Name: AuditLog; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."AuditLog" (id, "userId", action, entity, "entityId", changes, "createdAt") FROM stdin;
\.


--
-- Data for Name: DiagramLink; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."DiagramLink" (id, "teamTabId", label, href, "sortOrder") FROM stdin;
cmlvensuv00066en2qd8864gm	cmlvensut00056en234d08r19	Data Centre	#	0
cmlvensuv00076en2py4s3ail	cmlvensut00056en234d08r19	Campus	#	1
cmlvensuv00086en25x3skbpq	cmlvensut00056en234d08r19	Cloud	#	2
cmlvensuv00096en29wbv2q5v	cmlvensut00056en234d08r19	Partners	#	3
cmlvensv1000b6en21pe8iqtz	cmlvensv0000a6en20wtstdw1	Corporate Voice	#	0
cmlvensv1000c6en2x0ukkgzd	cmlvensv0000a6en20wtstdw1	Mobile Fleet	#	1
cmlvensv1000d6en2jz5ejrum	cmlvensv0000a6en20wtstdw1	IoT Platform	#	2
cmlvensv5000f6en2h30c3qya	cmlvensv4000e6en24x66syx5	Compute	#	0
cmlvensv5000g6en2b9u0bbnt	cmlvensv4000e6en24x66syx5	Storage & Backup	#	1
cmlvensv5000h6en2ps7xycj1	cmlvensv4000e6en24x66syx5	Hosting (PaaS/IaaS)	#	2
cmlvensvb000j6en2582xr301	cmlvensv8000i6en2spj9dmvi	CI/CD Pipeline	#	0
cmlvensvb000k6en2tf4zvhz3	cmlvensv8000i6en2spj9dmvi	App Support Model	#	1
cmlvensvb000l6en20730bcxm	cmlvensv8000i6en2spj9dmvi	Database Services	#	2
cmlvenswv000x6en28tig9uzt	cmlvenswu000w6en29e6ox1pw	Ticket Workflow	#	0
cmlvenswv000y6en2tsjy1og9	cmlvenswu000w6en29e6ox1pw	Escalation Process	#	1
cmlvenswv000z6en2mbj6eqp4	cmlvenswu000w6en29e6ox1pw	SLA Guidelines	#	2
cmlvenswz00116en27tgup0mx	cmlvenswy00106en26zn74zqd	Break-Fix Process	#	0
cmlvenswz00126en2t7qzw44f	cmlvenswy00106en26zn74zqd	Hardware Lifecycle	#	1
cmlvenswz00136en2myyryk3p	cmlvenswy00106en26zn74zqd	Field Support Areas	#	2
cmlvensx300156en2v37poo1c	cmlvensx200146en2v1gcf24h	Device Management	#	0
cmlvensx300166en21r6gbbgp	cmlvensx200146en2v1gcf24h	Patch Management	#	1
cmlvensx300176en2stwc39vx	cmlvensx200146en2v1gcf24h	Software Deployment	#	2
cmlvensyf001j6en2iqjpmimm	cmlvensyd001i6en2hwaabnya	Database Architecture	#	0
cmlvensyf001k6en2u185rmdr	cmlvensyd001i6en2hwaabnya	Backup & Recovery	#	1
cmlvensyf001l6en20iaaasxb	cmlvensyd001i6en2hwaabnya	High Availability	#	2
cmlvensyj001n6en2cw8try1f	cmlvensyi001m6en2fr1df3r6	Server Architecture	#	0
cmlvensyj001o6en2q1prw473	cmlvensyi001m6en2fr1df3r6	Storage Systems	#	1
cmlvensyj001p6en2uww1racd	cmlvensyi001m6en2fr1df3r6	Automation Workflows	#	2
cmlvensyp001r6en2dhrd9okj	cmlvensyk001q6en2g62wzi6o	VMware Infrastructure	#	0
cmlvensyp001s6en2hqu9o40h	cmlvensyk001q6en2g62wzi6o	Hyper-V Environment	#	1
cmlvensyp001t6en2s97jo0iz	cmlvensyk001q6en2g62wzi6o	Container Platforms	#	2
\.


--
-- Data for Name: Portfolio; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."Portfolio" (id, "teamId", "iconName", title, description, href, "sortOrder", "linkedTeamId") FROM stdin;
cmlvensuo00026en2be2oxi5r	cmlvensul00016en27ro3bxrt	Network	Network Services	Core network, connectivity, security perimeter, and traffic management.	/data-technology/network-services	0	cmlventin008e6en2fbfvks30
cmlvensuo00036en2el992hxu	cmlvensul00016en27ro3bxrt	Server	Data Centre	Compute, storage, backup, recovery, and hosting platforms.	/data-technology/data-centre	1	cmlventl4008v6en2iz7ygp0g
cmlvensuo00046en24u6vtwnv	cmlvensul00016en27ro3bxrt	Smartphone	Voice, Mobility & IoT	Corporate voice, mobile fleet, radio, and smart/connected devices.	/data-technology/voice-mobility-iot	2	cmlventns009c6en24cffno5p
cmlvensws000t6en20gpl14oj	cmlvenswo000s6en253u5ag6s	Headphones	Service Desk	IT assistance via tickets and calls, providing remote troubleshooting and support.	/partner-experience/service-desk	0	cmlventqv009t6en2pk5blh5c
cmlvensws000u6en21qv0szal	cmlvenswo000s6en253u5ag6s	Wrench	Desktop Support	In-person break-fix services for hardware and software issues.	/partner-experience/desktop-support	1	cmlventtf00aa6en2l4uc4syn
cmlvensws000v6en29a1f5f2v	cmlvenswo000s6en253u5ag6s	Monitor	Desktop Administration	Managing approximately 12,000 computing devices across the City.	/partner-experience/desktop-administration	2	cmlventvy00ar6en2gmjolwjb
cmlvensyb001f6en2it8cv9uf	cmlvensya001e6en2la9l1uja	Database	Database Management	Supporting the City database environment with reliable, secure data storage and retrieval.	/technology-infrastructure-operations/database	0	cmlventyy00b86en2yzuio14r
cmlvensyb001g6en2sqi6rjql	cmlvensya001e6en2la9l1uja	Server	Server Solutions & Automation	OS, storage, printing, data protection, and automated infrastructure management.	/technology-infrastructure-operations/server-solutions	1	cmlvenu2000bp6en2302jxreg
cmlvensyb001h6en2xz4wxgf8	cmlvensya001e6en2la9l1uja	Layers	Virtualization	Server infrastructure and virtualization platforms for efficient resource utilization.	/technology-infrastructure-operations/virtualization	2	cmlvenu5100c66en2zn8wq782
\.


--
-- Data for Name: PortfolioSubpage; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."PortfolioSubpage" (id, "portfolioId", "parentTeam", "parentTeamHref", title, description, "iconName", "showStatus") FROM stdin;
cmlvent0c00206en2whujcokz	cmlvensuo00026en2be2oxi5r	Data Technology	/data-technology	Network Services	We provide the digital foundation for the City of Edmonton. Our team manages the core connectivity, security perimeter, and traffic management infrastructure that connects over 300 City facilities.	Network	t
cmlvent1c002c6en21s84yet7	cmlvensuo00036en2el992hxu	Data Technology	/data-technology	Data Centre	We manage the City's physical computing infrastructure, including on-premises data centres and colocation facilities, ensuring reliable, secure hosting for all City applications and services.	Building2	t
cmlvent27002o6en2d92bysq9	cmlvensuo00046en24u6vtwnv	Data Technology	/data-technology	Voice, Mobility & IoT	We provide comprehensive communication services including wireline and VoIP phone systems, cellular wireless, machine-to-machine connectivity, and the City's LoRaWAN IoT network infrastructure.	Phone	t
cmlvent2p00306en2vgsairgc	cmlvensws000t6en20gpl14oj	Partner Experience	/partner-experience	Service Desk	We provide IT assistance via tickets and calls, offering remote troubleshooting and support to help City employees stay productive. Our team is available to assist with technical issues, service requests, and general IT inquiries.	Headphones	t
cmlvent30003c6en2b67c70bg	cmlvensws000u6en21qv0szal	Partner Experience	/partner-experience	Desktop Support	We provide in-person break-fix services for hardware and software issues across City facilities. Our field technicians are available to resolve complex issues that cannot be handled remotely.	Wrench	t
cmlvent3b003o6en23y1fwt74	cmlvensws000v6en29a1f5f2v	Partner Experience	/partner-experience	Desktop Administration	We manage approximately 12,000 computing devices across the City, including operating system deployment, patch management, software distribution, and configuration management.	Monitor	t
cmlvent3m00406en2hyhwox4p	cmlvensyb001f6en2it8cv9uf	Technology Infrastructure Operations	/technology-infrastructure-operations	Database Management	We support the City's database environment, ensuring data services are reliable, secure, and performant. Our team manages SQL Server, Oracle, and PostgreSQL platforms across the enterprise.	Database	t
cmlvent3y004c6en2s2u0wwow	cmlvensyb001g6en2sqi6rjql	Technology Infrastructure Operations	/technology-infrastructure-operations	Server Solutions & Automation	We manage the City's server infrastructure including operating systems, storage, printing, and data protection services, with a focus on automation and process improvements.	Server	t
cmlvent4g004o6en27uxy2g98	cmlvensyb001h6en2xz4wxgf8	Technology Infrastructure Operations	/technology-infrastructure-operations	Virtualization	We manage the City's virtualization platforms including VMware, Hyper-V, and container services, enabling efficient resource utilization and flexible infrastructure deployment.	Layers	t
\.


--
-- Data for Name: ServiceArea; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."ServiceArea" (id, "teamId", "serviceAreaId", title, "shortDescription", "fullDescription", features, icon, link, "sortOrder") FROM stdin;
cmlvent6700626en2632ajftb	cmlvent6600616en2hs0z7mic	posse	Application Support for POSSE	Technical support, development and maintenance of the POSSE platform - a powerful configurable enterprise platform and workflow engine that automates business processes.	Technical support, development and maintenance of the POSSE platform. POSSE (Public One Stop Service) is a powerful configurable enterprise platform and workflow engine that automates, integrates, monitors and enforces business process rules.\n\nThe term "configurable" simply means that POSSE can be changed to meet the needs of different business areas. POSSE is a corporate system used by all city departments, citizens and other external business partners.	{"Enterprise platform and workflow engine","Business process automation and integration","Business process rule enforcement","Configurable to meet different business area needs","Used by all City departments and external partners"}	\N	\N	0
cmlvent6700636en288zs0h85	cmlvent6600616en2hs0z7mic	tacs	Application Support for TACS	Full in-house design and development for the Taxation and Collection System (TACS) - responsible for approximately 60% of the City's operating budget.	Provide full-in-house design and in-house application development for the Taxation and Collection System (TACS) application for the City of Edmonton.\n\nThe usage of TACS in the organization is to assess, bill, and collect property taxes and is responsible for approximately 60% of the City's operating budget.	{"Property tax assessment","Tax billing and collection","Responsible for ~60% of City operating budget","Full in-house development and support","Critical financial system"}	\N	\N	1
cmlvent6700646en2x7wkcqme	cmlvent6600616en2hs0z7mic	weblogic	Application Support for WebLogic	Technical support and maintenance of Oracle WebLogic Server infrastructure that runs critical Oracle applications including AMIS, TACS, and TOPS.	Technical support and maintenance of the infrastructure. The Oracle Weblogic Server is a JAVA virtual machine that at the City of Edmonton is used to run Oracle Fusion Middleware.\n\nThe middleware allows for the development, deployment, and execution of Oracle applications (AMIS, CACTIS, Debentures, ETDS, MVCIS, PAC, TACS, TOPS).	{"Oracle WebLogic Server infrastructure support","Oracle Fusion Middleware management","Support for 8+ critical Oracle applications","JAVA virtual machine environment","Application deployment and execution"}	\N	\N	2
cmlvent6700656en2yp2wyiye	cmlvent6600616en2hs0z7mic	google-workspace	Application Support for Google Workspace	Cloud-based productivity and collaboration tools including Gmail, Drive, Docs, Meet, and Calendar for all City employees.	Google Workspace is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google.\n\nIt provides comprehensive communication, collaboration, cloud storage, and content creation capabilities for all City of Edmonton employees.	{"Communication: Gmail, Contacts, Calendar, Meet, Chat","Cloud Storage: Google Drive","Content Creation: Docs, Sheets, Slides, Forms","Collaboration: Sites, Drawings, Keep","Enterprise-wide deployment"}	\N	\N	3
cmlvent6700666en2c4uztrz0	cmlvent6600616en2hs0z7mic	branch-solutions	Business Solutions for City Branches	Technical support for branch-specific applications including troubleshooting, updates, upgrades, roadmapping, and low-code/no-code app creation.	Technical support for the identified business areas' applications. Services include troubleshooting, problem-solving, software updates, application upgrades and maintenance, application roadmapping, and low-code/no-code application creation.\n\nWe work directly with City branches to deliver tailored solutions that meet their unique business needs.	{"Application troubleshooting and problem-solving","Software updates and application upgrades","Application maintenance and support","Application roadmapping and planning","Low-code/no-code application development"}	\N	\N	4
cmlvent6700676en26lpu41fr	cmlvent6600616en2hs0z7mic	rapid-development	Rapid Development Services	Agile, iterative development using low-code platforms to deliver robust functionality with unprecedented speed and efficiency.	Rapid Development Services empower you to transform your business with unprecedented speed and efficiency. By leveraging an agile, iterative approach and cutting-edge tools like low-code platforms, we deliver the robust functionality of custom development without the traditional overhead.\n\nExperience the power of streamlined workflows, captivating apps, and optimized processes, all within a fraction of the time and cost. Unlock your organization's full potential and accelerate your path to success with Rapid Development Services.	{"Agile, iterative development approach","Low-code platform utilization","Rapid application delivery","Reduced time and cost","Streamlined workflows and processes"}	\N	\N	5
cmlvent6j00696en2fzd6bsyo	cmlvent6i00686en299x0kho2	advisory-services	Cyber Security Advisory Services	Providing cyber security advice on specifications, best practices, risk assessments, scorecards, and risk acceptance for all City systems.	The Cyber Security Advisory Services and Architecture team provides cyber security advice to all City of Edmonton (CoE) IT Service providers on CoE Cyber security specifications and best practices; and to all CoE business units for security requirements, risk assessments, scorecards, and risk acceptance.\n\nYou will need to reach out to the Cyber Security Advisory Services team if you are implementing or significantly changing the security posture of an existing system either on-premise or in the cloud where the system deals with: Operational Technology, politically and reputationally sensitive public facing systems, providing or managing access to CoE systems for non-CoE personnel, a system that is operationally critical or if it is going to contain Confidential (including FOIP) or Restricted information.	{"Cyber security specifications and best practices","Security requirements and risk assessments","Security scorecards and risk acceptance","Operational Technology security","Public-facing system security consultation"}	\N	\N	0
cmlvent6j006a6en25kxmdi3f	cmlvent6i00686en299x0kho2	directory-services	Directory Services	Managing the Corporate Directory Service - the backbone for all Corporate network and technology assets including Active Directory and PKI.	The Corporate Directory Service is the backbone for all Corporate network and technology assets. Without this critical service, employees and partners would not be able to access Corporate technology resources and assets.\n\nWe provide comprehensive directory and access management services to ensure secure and reliable access to all City technology resources.	{"Active Directory management","Domain Groups and Policies management","Domain Controller management","PKI and SSL Certificate management","Secure File Transfer Protocol services","Azure environment access management"}	\N	\N	1
cmlvent6j006b6en2904qdll4	cmlvent6i00686en299x0kho2	continuity-recovery	Continuity and Recovery Services	IT Disaster Recovery Program ensuring critical services remain available through business continuity planning and crisis management.	Supporting the City in its delivery of uninterrupted critical services, Open City and Technology is responsible for ensuring that the technology required to deliver the CoE's most critical services are available when needed most.\n\nThis is achieved through the Information Technology Disaster Recovery Program which aligns to the corporate Business Continuity Management Program.	{"OCT business continuity planning","Crisis management planning and coordination","Disaster recovery training and awareness","Current state capability assessments","Improvement recommendations","Exercise design, implementation, and reporting","IT business continuity and DR audits"}	\N	\N	2
cmlvent6j006c6en2ujxd0zk7	cmlvent6i00686en299x0kho2	incident-response	Cybersecurity Investigation & Incident Response	SOC monitoring, threat detection, incident response, vulnerability management, and malware forensics with 24x7 MDR service.	Providing comprehensive cybersecurity investigation, incident response, and security operations services to protect the City from cyber threats.\n\nWe operate an internal SOC monitoring threats entering via email, network, endpoint, or cloud, working closely with Mandiant MDR SOC to remediate threats 24x7.	{"Vulnerability Assurance - iterative vulnerability management","Cybersecurity Operations Centre - 24x7 threat monitoring","Incident Management - MDR service with FireEye/Mandiant","Malware Forensics & Investigations","Computer forensics and employee investigations"}	\N	\N	3
cmlvent6j006d6en261gia2d2	cmlvent6i00686en299x0kho2	governance-compliance	Governance, Risk, Compliance, and Awareness	Creating cybersecurity policies, delivering awareness education, providing risk assessments, and coordinating security audits.	Providing governance, risk management, compliance, and awareness services to establish and maintain a strong cybersecurity posture across the City.\n\nWe create policies, deliver training, assess risks, and coordinate audits to ensure the City meets cybersecurity requirements and best practices.	{"Cybersecurity policies and standards creation","Cybersecurity awareness and education","Consulting and risk assessment services","Internal and external audit coordination","Exercise design and implementation"}	\N	\N	4
cmlvent6j006e6en2wm4m515i	cmlvent6i00686en299x0kho2	identity-access	Digital Identity & Access Management	Enterprise IAM operations including user provisioning, offboarding, EIAM portal, and Multi-Factor Authentication implementation.	Digital Identity & Access Management (IAM) operations provide comprehensive identity and access services for the City's workforce.\n\nFrom onboarding to offboarding, we manage digital identities and access rights, implementing modern security controls like Multi-Factor Authentication across all externally available workforce access.	{"New user digital ID creation and access provisioning","Employee offboarding and access removal","Enterprise IAM (EIAM) portal operation","Self-serve Digital ID services","Multi-Factor Authentication implementation"}	\N	\N	5
cmlvent6u006g6en2i72qrne5	cmlvent6t006f6en2cjwul3e0	technology-investment	Technology Investment & Financial Management	Managing the intake, evaluation, and governance of multi-stakeholder technology projects aligned with City strategies.	Technology Investment is responsible for the intake and governance of multi-stakeholder and complex technology projects (commonly referred to as Tier A). By taking an investment focused approach, our team helps align Tier A (over $75,000) projects to the City's strategies and objectives, ensuring that the value from these projects is communicated and realized.\n\nThe team also manages the governance of Tier A technology projects by facilitating and coordinating regularly recurring meetings between directors, branch managers, and executives across the City of Edmonton.	{"Technology Investment intake, evaluation, and prioritization","4-year Corporate Technology Capital budget planning","Financial Management Office - budget planning and reporting","Corporate Business Technology Governance support","People Services - staffing and FTE management"}	\N	\N	0
cmlvent6u006h6en2rbxjg95o	cmlvent6t006f6en2cjwul3e0	business-engagement	Business Engagement	First point of contact for new technology initiatives, providing business case consulting and portfolio management.	This team is the first point of contact for new technology initiatives and provides services such as business case consulting and review, strategy and portfolio management, and organization change management.\n\nWe oversee and manage the OCT intake process for all technology requests (Tier A, B, & C) and the OCT concurrence process with focus on building business engagement with stakeholders across the city.	{"Technology Intake - track and evaluate new requests","Technology Concurrence - guide OCT concurrence process","Business Case Review - quality assurance and validation","Organizational Change Management consultation","Strategy and Portfolio Management"}	\N	\N	1
cmlvent6u006i6en2u1da4wzc	cmlvent6t006f6en2cjwul3e0	vendor-management	Vendor Management Office	Proactive management of technology vendors and contracts, supporting $30M annually in transactions.	The Vendor Management Office (VMO) is responsible for the effective and proactive management of all Technology Related Vendors (TRV) and contracts associated with the delivery of computer hardware, software, and supporting services for the City of Edmonton.\n\nThe VMO currently supports, negotiates, and manages approximately 500 contracts over 400 different vendors and is responsible for approximately $30M annually in transactions on behalf of OCT and branches across the City.	{"Contract Lifecycle Management from initiation to termination","Advisory Services for procurement and negotiations","Procurement of IT hardware, software, and support","Financial Management and audit support","Vendor relationship management"}	\N	\N	2
cmlvent6u006j6en27bija8dp	cmlvent6t006f6en2cjwul3e0	it-asset-management	IT Asset Management	Comprehensive lifecycle management of technology assets to maximize business value and ensure compliance.	IT asset management (ITAM) provides an accurate account of technology asset lifecycle costs and risks in order to maximize the business value of technology strategy, architecture, funding, contractual and sourcing decisions.\n\nThis service includes financial, contractual and inventory services to support life cycle management and strategic decision making for the IT environment. Assets include all elements of software and hardware that are found in the business environment.	{"Purchase, lease, or rent hardware and software","Software installation and license compliance","Online hardware and software catalogs with self-service","Software audit and rationalization","Hardware delivery, installation, and configuration","Device rental and loaner pool management","Telephony and mobility device management"}	\N	\N	3
cmlvent73006l6en2gpn128uy	cmlvent73006k6en269eb9fx0	infrastructure-operations	Technology Infrastructure Operations	Ensuring servers, storage, backup, database, and workspace technology are always available through process improvements and automation.	Technology Infrastructure Operations ensures that servers, storage, backup, database, and workspace technology are always available and operate efficiently through process improvements and automation.\n\nOur team provides critical services supporting the City's database environment, storage and server operating systems, printing, data protection, server infrastructure, and virtualization platforms.	{"Database Management - supporting City database environment","Server Solutions & Automation - OS, storage, printing, data protection","Virtualization - server infrastructure and platforms","Process improvements and automation","High availability and efficiency"}	\N	/technology-infrastructure-operations	0
cmlvent73006m6en2ugzg9nve	cmlvent73006k6en269eb9fx0	telecom-iot	Telecom and Internet of Things (IoT)	Communication services including wireline, VoIP, cellular wireless, M2M, LoRaWAN IoT network and Cisco Call Center solutions.	Telecommunications provides various communication services including wireline & VoIP (Voice over IP) phone, cellular wireless, M2M (machine to machine), LoRaWAN IoT network and a Cisco Call Center solution to serve and support all City business areas.\n\nThe Internet of Things (IoT) refers to networked devices embedded with sensors and software, allowing them to collect and share data that can be processed and utilized for various purposes across the City.	{"Wireline & VoIP phone services","Cellular wireless and M2M communications","LoRaWAN IoT network infrastructure","Cisco Call Center solutions","IoT device management and data collection"}	\N	/telecom-iot	1
cmlvent73006n6en2peh60p8l	cmlvent73006k6en269eb9fx0	data-technology	Data Technology	Core networking, data center operations, and application delivery services enabling seamless connectivity across the City.	Data Technology is a core component of the Integrated Technology Solutions (ITS) team, dedicated to enabling City of Edmonton employees and citizens to seamlessly connect with technology, applications, and each other.\n\nWe manage the City's network infrastructure, data center facilities, and application delivery platforms to ensure reliable, secure connectivity across all City operations.	{"Connecting Technologies - ADCs, cloud, Appspace, digital faxing","Data Center - on-prem and colocation facility management","Network - 1,000+ switches, 1,400+ APs, 300 km fiber","Secure application delivery","City-wide connectivity infrastructure"}	\N	/data-technology	2
cmlvent73006o6en2eo94wm8l	cmlvent73006k6en269eb9fx0	partner-experience	Partner Experience	User assistance and computing environment management including Service Desk, Desktop Support, and Desktop Administration.	Partner Experience delivers essential user assistance and manages our computing environment through several key functional areas to help our internal customers provide services to our citizens.\n\nWe provide comprehensive support from remote troubleshooting to in-person assistance, managing approximately 12,000 computing devices across the City.	{"Service Desk - IT assistance via tickets and calls","Desktop Support - in-person break-fix services","Desktop Administration - ~12,000 device management","Operating system and patch management","Software deployment and configuration"}	\N	/partner-experience	3
cmlvent73006p6en207lqjdq5	cmlvent73006k6en269eb9fx0	service-delivery	Service Delivery and Analytics	Service Management Office and Monitoring & Analytics providing process management, ITSM platform support, and comprehensive monitoring.	The Service Management Office (SMO) is instrumental in both operational and business-facing aspects of IT service delivery, focusing on Change, Problem, and Incident Management processes while managing the Digital Workplace Catalog and Work Order process.\n\nMonitoring & Analytics provides reliable monitoring platforms for IT infrastructure, networks, applications, and user interfaces with modern alerting, dashboards, and AI-powered analysis tools.	{"Change, Problem, and Incident Management","Digital Workplace Catalog management","CMDB and Remedy ITSM platform support","Infrastructure and application monitoring","AI-powered data analysis and dashboards"}	\N	/service-delivery	4
\.


--
-- Data for Name: SubpageContact; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."SubpageContact" (id, "subpageId", name, role, email, "sortOrder") FROM stdin;
cmlvent0l00276en2uqdhwf83	cmlvent0c00206en2whujcokz	First Last	Manager, Network Services	firstname.lastname@edmonton.ca	0
cmlvent0l00286en28qdn5p7a	cmlvent0c00206en2whujcokz	First Last	Lead Network Architect	firstname.lastname@edmonton.ca	1
cmlvent1h002j6en2h6q46t8s	cmlvent1c002c6en21s84yet7	First Last	Manager, Data Centre Operations	firstname.lastname@edmonton.ca	0
cmlvent1h002k6en23e9803k5	cmlvent1c002c6en21s84yet7	First Last	Facilities Coordinator	firstname.lastname@edmonton.ca	1
cmlvent2b002v6en2zqmrmoy2	cmlvent27002o6en2d92bysq9	First Last	Manager, Telecom & IoT	firstname.lastname@edmonton.ca	0
cmlvent2b002w6en2ibmajuyp	cmlvent27002o6en2d92bysq9	First Last	IoT Solutions Architect	firstname.lastname@edmonton.ca	1
cmlvent2r00376en2k19gug6z	cmlvent2p00306en2vgsairgc	First Last	Manager, Service Desk	firstname.lastname@edmonton.ca	0
cmlvent2r00386en26qoj266u	cmlvent2p00306en2vgsairgc	First Last	Team Lead, Service Desk	firstname.lastname@edmonton.ca	1
cmlvent33003j6en2ntmkpwvj	cmlvent30003c6en2b67c70bg	First Last	Manager, Desktop Support	firstname.lastname@edmonton.ca	0
cmlvent33003k6en2cxq7v88s	cmlvent30003c6en2b67c70bg	First Last	Team Lead, Field Services	firstname.lastname@edmonton.ca	1
cmlvent3d003v6en2z7h6vj7y	cmlvent3b003o6en23y1fwt74	First Last	Manager, Desktop Administration	firstname.lastname@edmonton.ca	0
cmlvent3d003w6en2lgog4ngq	cmlvent3b003o6en23y1fwt74	First Last	Senior Desktop Engineer	firstname.lastname@edmonton.ca	1
cmlvent3p00476en2cslie095	cmlvent3m00406en2hyhwox4p	First Last	Manager, Database Services	firstname.lastname@edmonton.ca	0
cmlvent3p00486en24ml7wclp	cmlvent3m00406en2hyhwox4p	First Last	Senior Database Administrator	firstname.lastname@edmonton.ca	1
cmlvent43004j6en2z2l9n6dq	cmlvent3y004c6en2s2u0wwow	First Last	Manager, Server Solutions	firstname.lastname@edmonton.ca	0
cmlvent43004k6en2muwo3upg	cmlvent3y004c6en2s2u0wwow	First Last	Senior Systems Administrator	firstname.lastname@edmonton.ca	1
cmlvent4j004v6en2ci59q95u	cmlvent4g004o6en27uxy2g98	First Last	Manager, Virtualization Services	firstname.lastname@edmonton.ca	0
cmlvent4j004w6en226idlnxa	cmlvent4g004o6en27uxy2g98	First Last	Senior Virtualization Engineer	firstname.lastname@edmonton.ca	1
\.


--
-- Data for Name: SubpageInitiative; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."SubpageInitiative" (id, "subpageId", title, description, href, "sortOrder") FROM stdin;
cmlvent0j00256en24j24tn9v	cmlvent0c00206en2whujcokz	Next-Gen Firewall Upgrade	Replacing legacy edge hardware to improve throughput and security inspection capabilities.	#	0
cmlvent0j00266en21xtjvetr	cmlvent0c00206en2whujcokz	Fibre Expansion Phase 4	Extending dark fibre connectivity to new facilities in the southwest quadrant.	#	1
cmlvent1g002h6en2rhxw7xmz	cmlvent1c002c6en21s84yet7	Data Centre Consolidation	Migrating workloads from legacy facilities to modernized infrastructure.	#	0
cmlvent1g002i6en2iyo76uik	cmlvent1c002c6en21s84yet7	Green IT Initiative	Implementing energy-efficient cooling and power management solutions.	#	1
cmlvent2a002t6en2y74e753c	cmlvent27002o6en2d92bysq9	Smart City Sensor Expansion	Deploying additional LoRaWAN sensors for air quality and traffic monitoring.	#	0
cmlvent2a002u6en2hhax3nms	cmlvent27002o6en2d92bysq9	Unified Communications Migration	Transitioning to cloud-based collaboration and voice platforms.	#	1
cmlvent2r00356en2zylpmc4j	cmlvent2p00306en2vgsairgc	AI-Powered Support Chat	Implementing intelligent chatbot for faster resolution of common issues.	#	0
cmlvent2r00366en2l32nyz9a	cmlvent2p00306en2vgsairgc	Self-Service Portal Enhancement	Expanding self-service capabilities to reduce ticket volume and improve user experience.	#	1
cmlvent32003h6en20fo9hprn	cmlvent30003c6en2b67c70bg	Mobile Technician Program	Deploying mobile support teams for faster on-site response times.	#	0
cmlvent32003i6en2hrwe50g3	cmlvent30003c6en2b67c70bg	Hardware Lifecycle Management	Implementing proactive hardware refresh cycles to reduce break-fix incidents.	#	1
cmlvent3d003t6en2s6muj009	cmlvent3b003o6en23y1fwt74	Windows 11 Migration	Upgrading City devices to Windows 11 with improved security features.	#	0
cmlvent3d003u6en2c0odyux3	cmlvent3b003o6en23y1fwt74	Endpoint Detection & Response	Deploying advanced endpoint security monitoring across all managed devices.	#	1
cmlvent3o00456en2k44f5cwo	cmlvent3m00406en2hyhwox4p	Database Modernization	Migrating legacy databases to modern platforms with improved performance and security.	#	0
cmlvent3o00466en2k65ftfhu	cmlvent3m00406en2hyhwox4p	Automated Patching Program	Implementing automated database patching to ensure security compliance.	#	1
cmlvent42004h6en2o4kv79xg	cmlvent3y004c6en2s2u0wwow	Server Automation Program	Implementing infrastructure-as-code for automated server provisioning and configuration.	#	0
cmlvent42004i6en2if6nhi1o	cmlvent3y004c6en2s2u0wwow	Storage Tier Optimization	Migrating data to appropriate storage tiers based on access patterns and requirements.	#	1
cmlvent4i004t6en2rjzysra1	cmlvent4g004o6en27uxy2g98	Hybrid Cloud Integration	Extending virtualization platform to support hybrid cloud workloads.	#	0
cmlvent4i004u6en211vctzai	cmlvent4g004o6en27uxy2g98	VDI Refresh Project	Upgrading virtual desktop infrastructure for improved performance and user experience.	#	1
\.


--
-- Data for Name: SubpageQuickLink; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."SubpageQuickLink" (id, "subpageId", label, description, href, "isSecure", "sortOrder") FROM stdin;
cmlvent0q00296en2ftia9a19	cmlvent0c00206en2whujcokz	Network Diagrams	Visio topologies for Data Centre and Campus.	#	f	0
cmlvent0q002a6en27kxizt16	cmlvent0c00206en2whujcokz	SolarWinds Dashboard	Real-time uptime and bandwidth monitoring.	#	f	1
cmlvent0q002b6en2z2xprsq5	cmlvent0c00206en2whujcokz	IP Address Management (IPAM)	Internal DNS and subnet allocation tool.	#	t	2
cmlvent1k002l6en2wlza36d2	cmlvent1c002c6en21s84yet7	Data Centre Access Request	Submit requests for physical access to facilities.	#	f	0
cmlvent1k002m6en2nao8jrjq	cmlvent1c002c6en21s84yet7	Environmental Monitoring	Temperature, humidity, and power dashboards.	#	f	1
cmlvent1k002n6en2mkop4tpw	cmlvent1c002c6en21s84yet7	Rack Layout Diagrams	Current server placement and capacity.	#	t	2
cmlvent2c002x6en2lhji8o6t	cmlvent27002o6en2d92bysq9	Phone Request Form	Request new VoIP phones or extensions.	#	f	0
cmlvent2c002y6en21wsuwgte	cmlvent27002o6en2d92bysq9	IoT Device Portal	Manage and monitor connected devices.	#	f	1
cmlvent2c002z6en23y6c2k5u	cmlvent27002o6en2d92bysq9	Cellular Plan Requests	Corporate mobile device and plan management.	#	t	2
cmlvent2s00396en2vjfsjaac	cmlvent2p00306en2vgsairgc	Submit a Ticket	Create a new support request.	#	f	0
cmlvent2s003a6en2uxfpckd9	cmlvent2p00306en2vgsairgc	Knowledge Base	Search self-help articles and guides.	#	f	1
cmlvent2s003b6en2wszrmo8f	cmlvent2p00306en2vgsairgc	Track My Tickets	View status of your open requests.	#	t	2
cmlvent34003l6en2sn83mkxs	cmlvent30003c6en2b67c70bg	Request On-Site Support	Schedule a technician visit.	#	f	0
cmlvent34003m6en2atb49sab	cmlvent30003c6en2b67c70bg	Hardware Request Form	Request new or replacement hardware.	#	f	1
cmlvent34003n6en2dtjku2qc	cmlvent30003c6en2b67c70bg	Equipment Return	Schedule equipment pickup or return.	#	t	2
cmlvent3e003x6en2wkl6gvxj	cmlvent3b003o6en23y1fwt74	Software Request Form	Request new software installation.	#	f	0
cmlvent3e003y6en2fqy4s02l	cmlvent3b003o6en23y1fwt74	Device Inventory	View managed device information.	#	f	1
cmlvent3e003z6en2fjtmj8i8	cmlvent3b003o6en23y1fwt74	Patch Compliance Dashboard	View patch status across the organization.	#	t	2
cmlvent3p00496en2yg07epvy	cmlvent3m00406en2hyhwox4p	Database Request Form	Request new databases or modifications.	#	f	0
cmlvent3p004a6en2al14feo0	cmlvent3m00406en2hyhwox4p	Performance Dashboard	Monitor database health and metrics.	#	f	1
cmlvent3p004b6en2tvohi31k	cmlvent3m00406en2hyhwox4p	Data Recovery Request	Submit data restoration requests.	#	t	2
cmlvent47004l6en2tyi0n94x	cmlvent3y004c6en2s2u0wwow	Server Request Form	Request new servers or modifications.	#	f	0
cmlvent47004m6en2u6jxv0tv	cmlvent3y004c6en2s2u0wwow	Storage Dashboard	Monitor storage capacity and usage.	#	f	1
cmlvent47004n6en2gfpw7l29	cmlvent3y004c6en2s2u0wwow	Backup Restore Request	Submit file or system restoration requests.	#	t	2
cmlvent4k004x6en2hbuqa4bx	cmlvent4g004o6en27uxy2g98	VM Request Form	Request new virtual machines.	#	f	0
cmlvent4k004y6en2c1e13jxa	cmlvent4g004o6en27uxy2g98	vCenter Dashboard	Monitor virtualization infrastructure.	#	f	1
cmlvent4k004z6en2yeb4s0um	cmlvent4g004o6en27uxy2g98	VDI Access Request	Request virtual desktop access.	#	t	2
\.


--
-- Data for Name: SubpageService; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."SubpageService" (id, "subpageId", title, items, "sortOrder") FROM stdin;
cmlvent0e00216en2g9zm5895	cmlvent0c00206en2whujcokz	Connectivity (LAN/WAN)	{"Wired office connectivity","Fibre optic backbone","Site-to-site switching"}	0
cmlvent0e00226en26tipmf1y	cmlvent0c00206en2whujcokz	Wireless (Wi-Fi)	{"Corporate Secure Wi-Fi","Guest/Public Wi-Fi","High-density event wireless"}	1
cmlvent0e00236en28v5in82m	cmlvent0c00206en2whujcokz	Security Perimeter	{"Firewall management","VPN & Remote Access","Intrusion Detection"}	2
cmlvent0e00246en217q9khe5	cmlvent0c00206en2whujcokz	Load Balancing	{"Application traffic management","F5 BigIP Administration","SSL Offloading"}	3
cmlvent1d002d6en2rpp5qrg9	cmlvent1c002c6en21s84yet7	Facility Management	{"Primary data centre operations","Colocation site management","Physical security controls"}	0
cmlvent1d002e6en2imja174q	cmlvent1c002c6en21s84yet7	Power & Cooling	{"UPS and generator systems","HVAC monitoring and control","Environmental sensors"}	1
cmlvent1d002f6en29ym5ftav	cmlvent1c002c6en21s84yet7	Rack & Cabling	{"Server rack provisioning","Structured cabling standards","Cable management systems"}	2
cmlvent1d002g6en2drjrh7h4	cmlvent1c002c6en21s84yet7	Disaster Recovery	{"Secondary site failover","Backup power testing","Business continuity planning"}	3
cmlvent29002p6en24cl100m8	cmlvent27002o6en2d92bysq9	Voice Services (VoIP)	{"Cisco IP phone provisioning","Voicemail and unified messaging","Call centre solutions"}	0
cmlvent29002q6en2rm3wxllr	cmlvent27002o6en2d92bysq9	Cellular & M2M	{"Corporate mobile device plans","Machine-to-machine connectivity","Fleet tracking integration"}	1
cmlvent29002r6en2qhvnyw3c	cmlvent27002o6en2d92bysq9	IoT Network	{"LoRaWAN sensor network","Smart city device management","Environmental monitoring sensors"}	2
cmlvent29002s6en2b8fmroxq	cmlvent27002o6en2d92bysq9	Collaboration Tools	{"Video conferencing systems","Digital signage (Appspace)","Meeting room technology"}	3
cmlvent2p00316en27zz979ys	cmlvent2p00306en2vgsairgc	Incident Support	{"Ticket submission and tracking","Phone support (780-496-8000)","Live chat assistance"}	0
cmlvent2q00326en2d2ff7gnn	cmlvent2p00306en2vgsairgc	Remote Troubleshooting	{"Remote desktop support","Password resets","Software assistance"}	1
cmlvent2q00336en2s6k83spi	cmlvent2p00306en2vgsairgc	Service Requests	{"Account provisioning","Access requests","Software installation"}	2
cmlvent2q00346en29shss1ey	cmlvent2p00306en2vgsairgc	Knowledge Base	{"Self-service articles","How-to guides","FAQ documentation"}	3
cmlvent31003d6en2rvmunic5	cmlvent30003c6en2b67c70bg	Hardware Support	{"Computer repairs","Peripheral troubleshooting","Hardware replacement"}	0
cmlvent31003e6en2a1b1vw6c	cmlvent30003c6en2b67c70bg	Software Support	{"Application troubleshooting","Software installation","Configuration issues"}	1
cmlvent31003f6en26klraeqk	cmlvent30003c6en2b67c70bg	Workspace Setup	{"New employee setup","Desk relocations","Equipment deployment"}	2
cmlvent31003g6en2a5r61km0	cmlvent30003c6en2b67c70bg	Field Services	{"On-site support visits","Multi-facility coverage","Emergency response"}	3
cmlvent3c003p6en2q23vrfxg	cmlvent3b003o6en23y1fwt74	Device Management	{"Endpoint provisioning","Device inventory","Asset tracking"}	0
cmlvent3c003q6en28m7yany8	cmlvent3b003o6en23y1fwt74	Patch Management	{"Security updates","OS patching","Compliance reporting"}	1
cmlvent3c003r6en2o1ivbzst	cmlvent3b003o6en23y1fwt74	Software Deployment	{"Application packaging","Automated deployment","License management"}	2
cmlvent3c003s6en20wz09qa5	cmlvent3b003o6en23y1fwt74	Configuration Management	{"Group Policy management","Standard images","Security baselines"}	3
cmlvent3m00416en2zxae3s1t	cmlvent3m00406en2hyhwox4p	Database Administration	{"SQL Server management","Oracle database support","PostgreSQL operations"}	0
cmlvent3n00426en226ozbhdi	cmlvent3m00406en2hyhwox4p	Performance Optimization	{"Query tuning and analysis","Index management","Resource monitoring"}	1
cmlvent3n00436en2e6uc3g1r	cmlvent3m00406en2hyhwox4p	High Availability	{"Always-On clustering","Database replication","Failover configuration"}	2
cmlvent3n00446en2eciiuq55	cmlvent3m00406en2hyhwox4p	Security & Compliance	{"Access control management","Data encryption","Audit logging"}	3
cmlvent41004d6en2ke172u9i	cmlvent3y004c6en2s2u0wwow	Operating Systems	{"Windows Server administration","Linux server management","OS patching and updates"}	0
cmlvent41004e6en276xngd5u	cmlvent3y004c6en2s2u0wwow	Storage Solutions	{"SAN/NAS management","Storage provisioning","Capacity planning"}	1
cmlvent41004f6en2uwtv32fm	cmlvent3y004c6en2s2u0wwow	Data Protection	{"Backup operations","Disaster recovery","Data replication"}	2
cmlvent41004g6en2ly4pbeyi	cmlvent3y004c6en2s2u0wwow	Print Services	{"Print server management","Printer deployment","Print queue administration"}	3
cmlvent4h004p6en234aa3728	cmlvent4g004o6en27uxy2g98	VMware Infrastructure	{"vSphere cluster management","VM provisioning","Resource allocation"}	0
cmlvent4h004q6en2bxgpgacq	cmlvent4g004o6en27uxy2g98	Hyper-V Services	{"Microsoft virtualization","Failover clustering","Live migration"}	1
cmlvent4h004r6en2iuewl56v	cmlvent4g004o6en27uxy2g98	Virtual Desktop (VDI)	{"Horizon desktop pools","Application virtualization","Remote access solutions"}	2
cmlvent4h004s6en2ygta2jlp	cmlvent4g004o6en27uxy2g98	Container Services	{"Kubernetes orchestration","Container registry","Microservices hosting"}	3
\.


--
-- Data for Name: Team; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."Team" (id, slug, "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") FROM stdin;
cmlvent6600616en2hs0z7mic	business-solutions	Business Solutions	Business Solutions	SECTION	3	t	2026-02-20 21:31:56.141	2026-02-20 21:31:56.141	Business Solutions	IT business solutions encompass a range of software, applications, programs, and services designed to assist in achieving business goals. From 311 to internal tools, we develop, implement, and support the applications that power City services.	\N	f	\N
cmlvent6i00686en299x0kho2	corporate-information-security	Corporate Information Security	Info Security	SECTION	4	t	2026-02-20 21:31:56.152	2026-02-20 21:31:56.152	Corporate Information Security	Protecting the City's data, assets, and information from cyber threats. We safeguard citizen privacy and ensure the integrity of municipal operations against evolving risks through comprehensive security services, incident response, and continuous monitoring.	\N	f	\N
cmlvent6t006f6en2cjwul3e0	technology-planning	Technology Planning	Tech Planning	SECTION	5	t	2026-02-20 21:31:56.162	2026-02-20 21:31:56.162	Technology Planning	The Technology Planning and Business Engagement section enables the City to make informed technology decisions that provide value to our citizens, businesses and partners.	\N	f	\N
cmlvent73006k6en269eb9fx0	integrated-technology-solutions	Integrated Technology Solutions	ITS	SECTION	6	t	2026-02-20 21:31:56.174	2026-02-20 21:31:56.174	Integrated Technology Solutions	IT infrastructure serves as the underlying structure that supports all services and solutions within the City's technology environment. We ensure that technology resources are always available and operate efficiently, forming the foundation for all digital services.	\N	f	\N
cmlvensul00016en27ro3bxrt	data-technology	Data Technology	Data Technology	ITS_TEAM	0	t	2026-02-20 21:31:55.714	2026-02-20 21:31:56.185	\N	\N	\N	f	cmlvent73006k6en269eb9fx0
cmlvenswo000s6en253u5ag6s	partner-experience	Partner Experience	Partner Experience	ITS_TEAM	1	t	2026-02-20 21:31:55.793	2026-02-20 21:31:56.19	\N	\N	\N	f	cmlvent73006k6en269eb9fx0
cmlvensya001e6en2la9l1uja	technology-infrastructure-operations	Technology Infrastructure Operations	Infrastructure Operations	ITS_TEAM	2	t	2026-02-20 21:31:55.853	2026-02-20 21:31:56.193	\N	\N	\N	f	cmlvent73006k6en269eb9fx0
cmlvent7q006q6en244qn4p3h	service-delivery	Service Delivery and Analytics	Service Delivery	ITS_TEAM	3	t	2026-02-20 21:31:56.197	2026-02-20 21:31:56.197	\N	\N	\N	f	cmlvent73006k6en269eb9fx0
cmlvent7v006r6en2bupsvv2m	telecom-iot	Telecom and Internet of Things (IoT)	Telecom & IoT	ITS_TEAM	4	t	2026-02-20 21:31:56.203	2026-02-20 21:31:56.203	\N	\N	\N	f	cmlvent73006k6en269eb9fx0
cmlventin008e6en2fbfvks30	network-services	Network Services	Network Services	SUB_TEAM	0	t	2026-02-20 21:31:56.591	2026-02-20 21:31:56.591	\N	We provide the digital foundation for the City of Edmonton. Our team manages the core connectivity, security perimeter, and traffic management infrastructure that connects over 300 City facilities.	Network	t	cmlvensul00016en27ro3bxrt
cmlventl4008v6en2iz7ygp0g	data-centre	Data Centre	Data Centre	SUB_TEAM	1	t	2026-02-20 21:31:56.68	2026-02-20 21:31:56.68	\N	We manage the City's physical computing infrastructure, including on-premises data centres and colocation facilities, ensuring reliable, secure hosting for all City applications and services.	Building2	t	cmlvensul00016en27ro3bxrt
cmlventns009c6en24cffno5p	voice-mobility-iot	Voice, Mobility & IoT	Voice, Mobility & IoT	SUB_TEAM	2	t	2026-02-20 21:31:56.776	2026-02-20 21:31:56.776	\N	We provide comprehensive communication services including wireline and VoIP phone systems, cellular wireless, machine-to-machine connectivity, and the City's LoRaWAN IoT network infrastructure.	Phone	t	cmlvensul00016en27ro3bxrt
cmlventqv009t6en2pk5blh5c	service-desk	Service Desk	Service Desk	SUB_TEAM	0	t	2026-02-20 21:31:56.887	2026-02-20 21:31:56.887	\N	We provide IT assistance via tickets and calls, offering remote troubleshooting and support to help City employees stay productive. Our team is available to assist with technical issues, service requests, and general IT inquiries.	Headphones	t	cmlvenswo000s6en253u5ag6s
cmlventtf00aa6en2l4uc4syn	desktop-support	Desktop Support	Desktop Support	SUB_TEAM	1	t	2026-02-20 21:31:56.979	2026-02-20 21:31:56.979	\N	We provide in-person break-fix services for hardware and software issues across City facilities. Our field technicians are available to resolve complex issues that cannot be handled remotely.	Wrench	t	cmlvenswo000s6en253u5ag6s
cmlventvy00ar6en2gmjolwjb	desktop-administration	Desktop Administration	Desktop Administration	SUB_TEAM	2	t	2026-02-20 21:31:57.07	2026-02-20 21:31:57.07	\N	We manage approximately 12,000 computing devices across the City, including operating system deployment, patch management, software distribution, and configuration management.	Monitor	t	cmlvenswo000s6en253u5ag6s
cmlventyy00b86en2yzuio14r	database	Database Management	Database Management	SUB_TEAM	0	t	2026-02-20 21:31:57.178	2026-02-20 21:31:57.178	\N	We support the City's database environment, ensuring data services are reliable, secure, and performant. Our team manages SQL Server, Oracle, and PostgreSQL platforms across the enterprise.	Database	t	cmlvensya001e6en2la9l1uja
cmlvenu2000bp6en2302jxreg	server-solutions	Server Solutions & Automation	Server Solutions & Automation	SUB_TEAM	1	t	2026-02-20 21:31:57.288	2026-02-20 21:31:57.288	\N	We manage the City's server infrastructure including operating systems, storage, printing, and data protection services, with a focus on automation and process improvements.	Server	t	cmlvensya001e6en2la9l1uja
cmlvenu5100c66en2zn8wq782	virtualization	Virtualization	Virtualization	SUB_TEAM	2	t	2026-02-20 21:31:57.397	2026-02-20 21:31:57.397	\N	We manage the City's virtualization platforms including VMware, Hyper-V, and container services, enabling efficient resource utilization and flexible infrastructure deployment.	Layers	t	cmlvensya001e6en2la9l1uja
\.


--
-- Data for Name: TeamContact; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TeamContact" (id, "teamId", name, role, email, "sortOrder") FROM stdin;
cmlventjm008l6en2qp4vt89j	cmlventin008e6en2fbfvks30	First Last	Manager, Network Services	firstname.lastname@edmonton.ca	0
cmlventjq008m6en2ln32m1ex	cmlventin008e6en2fbfvks30	First Last	Lead Network Architect	firstname.lastname@edmonton.ca	1
cmlventlt00926en2rzc7ih8j	cmlventl4008v6en2iz7ygp0g	First Last	Manager, Data Centre Operations	firstname.lastname@edmonton.ca	0
cmlventlw00936en2dfnxv3c5	cmlventl4008v6en2iz7ygp0g	First Last	Facilities Coordinator	firstname.lastname@edmonton.ca	1
cmlventow009j6en2npgwj8qz	cmlventns009c6en24cffno5p	First Last	Manager, Telecom & IoT	firstname.lastname@edmonton.ca	0
cmlventp1009k6en2441uigya	cmlventns009c6en24cffno5p	First Last	IoT Solutions Architect	firstname.lastname@edmonton.ca	1
cmlventrs00a06en2telouzqk	cmlventqv009t6en2pk5blh5c	First Last	Manager, Service Desk	firstname.lastname@edmonton.ca	0
cmlventrw00a16en2lnrcrp6a	cmlventqv009t6en2pk5blh5c	First Last	Team Lead, Service Desk	firstname.lastname@edmonton.ca	1
cmlventu700ah6en2bas4xfyq	cmlventtf00aa6en2l4uc4syn	First Last	Manager, Desktop Support	firstname.lastname@edmonton.ca	0
cmlventub00ai6en27oxmky9t	cmlventtf00aa6en2l4uc4syn	First Last	Team Lead, Field Services	firstname.lastname@edmonton.ca	1
cmlventwy00ay6en2lv5ishea	cmlventvy00ar6en2gmjolwjb	First Last	Manager, Desktop Administration	firstname.lastname@edmonton.ca	0
cmlventx300az6en2kos0yd33	cmlventvy00ar6en2gmjolwjb	First Last	Senior Desktop Engineer	firstname.lastname@edmonton.ca	1
cmlvenu0700bf6en24l7uccp3	cmlventyy00b86en2yzuio14r	First Last	Manager, Database Services	firstname.lastname@edmonton.ca	0
cmlvenu0c00bg6en2kc3ejnp4	cmlventyy00b86en2yzuio14r	First Last	Senior Database Administrator	firstname.lastname@edmonton.ca	1
cmlvenu2w00bw6en2ie3a1r6s	cmlvenu2000bp6en2302jxreg	First Last	Manager, Server Solutions	firstname.lastname@edmonton.ca	0
cmlvenu3100bx6en2lxd7mgzn	cmlvenu2000bp6en2302jxreg	First Last	Senior Systems Administrator	firstname.lastname@edmonton.ca	1
cmlvenu6100cd6en201zvzvxm	cmlvenu5100c66en2zn8wq782	First Last	Manager, Virtualization Services	firstname.lastname@edmonton.ca	0
cmlvenu6600ce6en2tei8e0hz	cmlvenu5100c66en2zn8wq782	First Last	Senior Virtualization Engineer	firstname.lastname@edmonton.ca	1
\.


--
-- Data for Name: TeamInitiative; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TeamInitiative" (id, "teamId", title, description, href, "sortOrder") FROM stdin;
cmlventjf008j6en246xj669d	cmlventin008e6en2fbfvks30	Next-Gen Firewall Upgrade	Replacing legacy edge hardware to improve throughput and security inspection capabilities.	#	0
cmlventji008k6en27vioh2e0	cmlventin008e6en2fbfvks30	Fibre Expansion Phase 4	Extending dark fibre connectivity to new facilities in the southwest quadrant.	#	1
cmlventlm00906en2l3kakk5h	cmlventl4008v6en2iz7ygp0g	Data Centre Consolidation	Migrating workloads from legacy facilities to modernized infrastructure.	#	0
cmlventlq00916en2j5iyjklp	cmlventl4008v6en2iz7ygp0g	Green IT Initiative	Implementing energy-efficient cooling and power management solutions.	#	1
cmlventon009h6en28n01rcvo	cmlventns009c6en24cffno5p	Smart City Sensor Expansion	Deploying additional LoRaWAN sensors for air quality and traffic monitoring.	#	0
cmlventos009i6en246ei4r3o	cmlventns009c6en24cffno5p	Unified Communications Migration	Transitioning to cloud-based collaboration and voice platforms.	#	1
cmlventrk009y6en2zonsy5cp	cmlventqv009t6en2pk5blh5c	AI-Powered Support Chat	Implementing intelligent chatbot for faster resolution of common issues.	#	0
cmlventro009z6en2f3yyyq3j	cmlventqv009t6en2pk5blh5c	Self-Service Portal Enhancement	Expanding self-service capabilities to reduce ticket volume and improve user experience.	#	1
cmlventu000af6en2ogwwd3yf	cmlventtf00aa6en2l4uc4syn	Mobile Technician Program	Deploying mobile support teams for faster on-site response times.	#	0
cmlventu400ag6en2qg8047ea	cmlventtf00aa6en2l4uc4syn	Hardware Lifecycle Management	Implementing proactive hardware refresh cycles to reduce break-fix incidents.	#	1
cmlventwq00aw6en29kyeqkqn	cmlventvy00ar6en2gmjolwjb	Windows 11 Migration	Upgrading City devices to Windows 11 with improved security features.	#	0
cmlventwu00ax6en25ca54gi8	cmlventvy00ar6en2gmjolwjb	Endpoint Detection & Response	Deploying advanced endpoint security monitoring across all managed devices.	#	1
cmlventzy00bd6en2ulok3lap	cmlventyy00b86en2yzuio14r	Database Modernization	Migrating legacy databases to modern platforms with improved performance and security.	#	0
cmlvenu0300be6en2ox5ys29m	cmlventyy00b86en2yzuio14r	Automated Patching Program	Implementing automated database patching to ensure security compliance.	#	1
cmlvenu2n00bu6en239g7tqr4	cmlvenu2000bp6en2302jxreg	Server Automation Program	Implementing infrastructure-as-code for automated server provisioning and configuration.	#	0
cmlvenu2s00bv6en2tidna8ap	cmlvenu2000bp6en2302jxreg	Storage Tier Optimization	Migrating data to appropriate storage tiers based on access patterns and requirements.	#	1
cmlvenu5r00cb6en27dw1pvk7	cmlvenu5100c66en2zn8wq782	Hybrid Cloud Integration	Extending virtualization platform to support hybrid cloud workloads.	#	0
cmlvenu5w00cc6en29cxv7jhf	cmlvenu5100c66en2zn8wq782	VDI Refresh Project	Upgrading virtual desktop infrastructure for improved performance and user experience.	#	1
\.


--
-- Data for Name: TeamMember; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TeamMember" (id, "teamId", name, title, email, "sortOrder") FROM stdin;
cmlvensvo000p6en2q3vc7l09	cmlvensul00016en27ro3bxrt	First Last	Director, Data Technology	firstname.lastname@edmonton.ca	0
cmlvensvo000q6en27naadsbu	cmlvensul00016en27ro3bxrt	First Last	Manager, Network Services	firstname.lastname@edmonton.ca	1
cmlvensvo000r6en2twhvljtj	cmlvensul00016en27ro3bxrt	First Last	Manager, Data Centre & Voice	firstname.lastname@edmonton.ca	2
cmlvensxc001b6en2d3znquxu	cmlvenswo000s6en253u5ag6s	First Last	Manager, Partner Experience	firstname.lastname@edmonton.ca	0
cmlvensxc001c6en24ecfgl6n	cmlvenswo000s6en253u5ag6s	First Last	Team Lead, Service Desk	firstname.lastname@edmonton.ca	1
cmlvensxc001d6en2z2auflhn	cmlvenswo000s6en253u5ag6s	First Last	Team Lead, Desktop Support	firstname.lastname@edmonton.ca	2
cmlvensyr001x6en2vd0k9scw	cmlvensya001e6en2la9l1uja	First Last	Manager, Technology Infrastructure Operations	firstname.lastname@edmonton.ca	0
cmlvensyr001y6en2r99bvvox	cmlvensya001e6en2la9l1uja	First Last	Team Lead, Database Management	firstname.lastname@edmonton.ca	1
cmlvensyr001z6en2t3fpgdr1	cmlvensya001e6en2la9l1uja	First Last	Team Lead, Server Solutions	firstname.lastname@edmonton.ca	2
\.


--
-- Data for Name: TeamPermission; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TeamPermission" (id, "userId", "teamId") FROM stdin;
\.


--
-- Data for Name: TeamQuickLink; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TeamQuickLink" (id, "teamId", label, description, href, "isSecure", "sortOrder") FROM stdin;
cmlventjv008n6en25tc2bu9c	cmlventin008e6en2fbfvks30	Network Diagrams	Visio topologies for Data Centre and Campus.	#	f	0
cmlventjy008o6en2g2o965t3	cmlventin008e6en2fbfvks30	SolarWinds Dashboard	Real-time uptime and bandwidth monitoring.	#	f	1
cmlventk2008p6en25et9rg3c	cmlventin008e6en2fbfvks30	IP Address Management (IPAM)	Internal DNS and subnet allocation tool.	#	t	2
cmlventm000946en25j10edge	cmlventl4008v6en2iz7ygp0g	Data Centre Access Request	Submit requests for physical access to facilities.	#	f	0
cmlventm400956en2vplp4dzd	cmlventl4008v6en2iz7ygp0g	Environmental Monitoring	Temperature, humidity, and power dashboards.	#	f	1
cmlventm800966en2t53m6363	cmlventl4008v6en2iz7ygp0g	Rack Layout Diagrams	Current server placement and capacity.	#	t	2
cmlventp5009l6en2gsvrbg15	cmlventns009c6en24cffno5p	Phone Request Form	Request new VoIP phones or extensions.	#	f	0
cmlventpa009m6en2qbu7znp8	cmlventns009c6en24cffno5p	IoT Device Portal	Manage and monitor connected devices.	#	f	1
cmlventpf009n6en2dbuy3wv1	cmlventns009c6en24cffno5p	Cellular Plan Requests	Corporate mobile device and plan management.	#	t	2
cmlvents000a26en2uzg1wr7k	cmlventqv009t6en2pk5blh5c	Submit a Ticket	Create a new support request.	#	f	0
cmlvents400a36en24c4oeaqy	cmlventqv009t6en2pk5blh5c	Knowledge Base	Search self-help articles and guides.	#	f	1
cmlvents700a46en27axmbxuf	cmlventqv009t6en2pk5blh5c	Track My Tickets	View status of your open requests.	#	t	2
cmlventuf00aj6en285xezudl	cmlventtf00aa6en2l4uc4syn	Request On-Site Support	Schedule a technician visit.	#	f	0
cmlventui00ak6en2s8k509a6	cmlventtf00aa6en2l4uc4syn	Hardware Request Form	Request new or replacement hardware.	#	f	1
cmlventum00al6en2cb2no9ue	cmlventtf00aa6en2l4uc4syn	Equipment Return	Schedule equipment pickup or return.	#	t	2
cmlventx700b06en27gzbm1cu	cmlventvy00ar6en2gmjolwjb	Software Request Form	Request new software installation.	#	f	0
cmlventxb00b16en2ifkjwksw	cmlventvy00ar6en2gmjolwjb	Device Inventory	View managed device information.	#	f	1
cmlventxf00b26en237qss5he	cmlventvy00ar6en2gmjolwjb	Patch Compliance Dashboard	View patch status across the organization.	#	t	2
cmlvenu0g00bh6en2mazmnl02	cmlventyy00b86en2yzuio14r	Database Request Form	Request new databases or modifications.	#	f	0
cmlvenu0l00bi6en22pgzgwis	cmlventyy00b86en2yzuio14r	Performance Dashboard	Monitor database health and metrics.	#	f	1
cmlvenu0q00bj6en2y1wnrh62	cmlventyy00b86en2yzuio14r	Data Recovery Request	Submit data restoration requests.	#	t	2
cmlvenu3600by6en2tioxdim6	cmlvenu2000bp6en2302jxreg	Server Request Form	Request new servers or modifications.	#	f	0
cmlvenu3b00bz6en2io0ctoiu	cmlvenu2000bp6en2302jxreg	Storage Dashboard	Monitor storage capacity and usage.	#	f	1
cmlvenu3g00c06en20nsn45pm	cmlvenu2000bp6en2302jxreg	Backup Restore Request	Submit file or system restoration requests.	#	t	2
cmlvenu6b00cf6en2dxhd10n1	cmlvenu5100c66en2zn8wq782	VM Request Form	Request new virtual machines.	#	f	0
cmlvenu6g00cg6en2rh0hura4	cmlvenu5100c66en2zn8wq782	vCenter Dashboard	Monitor virtualization infrastructure.	#	f	1
cmlvenu6l00ch6en2ke9egllp	cmlvenu5100c66en2zn8wq782	VDI Access Request	Request virtual desktop access.	#	t	2
\.


--
-- Data for Name: TeamService; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TeamService" (id, "teamId", title, items, "sortOrder") FROM stdin;
cmlventiy008f6en23ygux1bo	cmlventin008e6en2fbfvks30	Connectivity (LAN/WAN)	{"Wired office connectivity","Fibre optic backbone","Site-to-site switching"}	0
cmlventj3008g6en2zet28xe7	cmlventin008e6en2fbfvks30	Wireless (Wi-Fi)	{"Corporate Secure Wi-Fi","Guest/Public Wi-Fi","High-density event wireless"}	1
cmlventj7008h6en2cbd3umfl	cmlventin008e6en2fbfvks30	Security Perimeter	{"Firewall management","VPN & Remote Access","Intrusion Detection"}	2
cmlventja008i6en2qr7zp9j2	cmlventin008e6en2fbfvks30	Load Balancing	{"Application traffic management","F5 BigIP Administration","SSL Offloading"}	3
cmlventl9008w6en2yebhl8zf	cmlventl4008v6en2iz7ygp0g	Facility Management	{"Primary data centre operations","Colocation site management","Physical security controls"}	0
cmlventlc008x6en2d925ac5x	cmlventl4008v6en2iz7ygp0g	Power & Cooling	{"UPS and generator systems","HVAC monitoring and control","Environmental sensors"}	1
cmlventlf008y6en2is5hg7ek	cmlventl4008v6en2iz7ygp0g	Rack & Cabling	{"Server rack provisioning","Structured cabling standards","Cable management systems"}	2
cmlventlj008z6en2edlccnxx	cmlventl4008v6en2iz7ygp0g	Disaster Recovery	{"Secondary site failover","Backup power testing","Business continuity planning"}	3
cmlvento0009d6en2p6e4ftkp	cmlventns009c6en24cffno5p	Voice Services (VoIP)	{"Cisco IP phone provisioning","Voicemail and unified messaging","Call centre solutions"}	0
cmlvento6009e6en2tmctr5ej	cmlventns009c6en24cffno5p	Cellular & M2M	{"Corporate mobile device plans","Machine-to-machine connectivity","Fleet tracking integration"}	1
cmlventoc009f6en26d1ouhxl	cmlventns009c6en24cffno5p	IoT Network	{"LoRaWAN sensor network","Smart city device management","Environmental monitoring sensors"}	2
cmlventoj009g6en2zx1wiy56	cmlventns009c6en24cffno5p	Collaboration Tools	{"Video conferencing systems","Digital signage (Appspace)","Meeting room technology"}	3
cmlventr3009u6en2qvevguym	cmlventqv009t6en2pk5blh5c	Incident Support	{"Ticket submission and tracking","Phone support (780-496-8000)","Live chat assistance"}	0
cmlventr6009v6en2u4t3omkc	cmlventqv009t6en2pk5blh5c	Remote Troubleshooting	{"Remote desktop support","Password resets","Software assistance"}	1
cmlventra009w6en2746nifid	cmlventqv009t6en2pk5blh5c	Service Requests	{"Account provisioning","Access requests","Software installation"}	2
cmlventrg009x6en2grrr650k	cmlventqv009t6en2pk5blh5c	Knowledge Base	{"Self-service articles","How-to guides","FAQ documentation"}	3
cmlventtk00ab6en2hlp4hf31	cmlventtf00aa6en2l4uc4syn	Hardware Support	{"Computer repairs","Peripheral troubleshooting","Hardware replacement"}	0
cmlventto00ac6en20rgzkrzx	cmlventtf00aa6en2l4uc4syn	Software Support	{"Application troubleshooting","Software installation","Configuration issues"}	1
cmlventts00ad6en28uzzr6j0	cmlventtf00aa6en2l4uc4syn	Workspace Setup	{"New employee setup","Desk relocations","Equipment deployment"}	2
cmlventtw00ae6en2ex8ftpn5	cmlventtf00aa6en2l4uc4syn	Field Services	{"On-site support visits","Multi-facility coverage","Emergency response"}	3
cmlventw500as6en2isn6kl2u	cmlventvy00ar6en2gmjolwjb	Device Management	{"Endpoint provisioning","Device inventory","Asset tracking"}	0
cmlventwa00at6en2iml3cbou	cmlventvy00ar6en2gmjolwjb	Patch Management	{"Security updates","OS patching","Compliance reporting"}	1
cmlventwg00au6en2c0wrkirc	cmlventvy00ar6en2gmjolwjb	Software Deployment	{"Application packaging","Automated deployment","License management"}	2
cmlventwl00av6en2tzcliclk	cmlventvy00ar6en2gmjolwjb	Configuration Management	{"Group Policy management","Standard images","Security baselines"}	3
cmlventz400b96en27ek0j6z9	cmlventyy00b86en2yzuio14r	Database Administration	{"SQL Server management","Oracle database support","PostgreSQL operations"}	0
cmlventzd00ba6en2juv036ut	cmlventyy00b86en2yzuio14r	Performance Optimization	{"Query tuning and analysis","Index management","Resource monitoring"}	1
cmlventzm00bb6en2og7jfspy	cmlventyy00b86en2yzuio14r	High Availability	{"Always-On clustering","Database replication","Failover configuration"}	2
cmlventzt00bc6en2o3785leg	cmlventyy00b86en2yzuio14r	Security & Compliance	{"Access control management","Data encryption","Audit logging"}	3
cmlvenu2600bq6en2owz1aeph	cmlvenu2000bp6en2302jxreg	Operating Systems	{"Windows Server administration","Linux server management","OS patching and updates"}	0
cmlvenu2a00br6en2cq6pefq2	cmlvenu2000bp6en2302jxreg	Storage Solutions	{"SAN/NAS management","Storage provisioning","Capacity planning"}	1
cmlvenu2f00bs6en2xv8tyo6e	cmlvenu2000bp6en2302jxreg	Data Protection	{"Backup operations","Disaster recovery","Data replication"}	2
cmlvenu2j00bt6en2olg0tih0	cmlvenu2000bp6en2302jxreg	Print Services	{"Print server management","Printer deployment","Print queue administration"}	3
cmlvenu5700c76en2859uoz5j	cmlvenu5100c66en2zn8wq782	VMware Infrastructure	{"vSphere cluster management","VM provisioning","Resource allocation"}	0
cmlvenu5c00c86en29gwdhgta	cmlvenu5100c66en2zn8wq782	Hyper-V Services	{"Microsoft virtualization","Failover clustering","Live migration"}	1
cmlvenu5h00c96en24glyee59	cmlvenu5100c66en2zn8wq782	Virtual Desktop (VDI)	{"Horizon desktop pools","Application virtualization","Remote access solutions"}	2
cmlvenu5m00ca6en2i8p5moft	cmlvenu5100c66en2zn8wq782	Container Services	{"Kubernetes orchestration","Container registry","Microservices hosting"}	3
\.


--
-- Data for Name: TeamTab; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TeamTab" (id, "teamId", "tabId", label, "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") FROM stdin;
cmlvensut00056en234d08r19	cmlvensul00016en27ro3bxrt	network	Network	Network Architecture	Watch this overview of our core network services and architecture.	https://drive.google.com/file/d/1RyjeaKqtnKkBT9PhGvUTM1QmXbYvDWnW/preview	Network Diagrams	View detailed diagrams for core network segments.	0
cmlvensv0000a6en20wtstdw1	cmlvensul00016en27ro3bxrt	voice-mobility	Voice & Mobility	Voice & Mobility Overview	Watch this overview of our corporate voice, mobile, and IoT services.	https://www.youtube.com/embed/dQw4w9WgXcQ	Service Diagrams	View detailed diagrams for core services.	1
cmlvensv4000e6en24x66syx5	cmlvensul00016en27ro3bxrt	data-centre	Data Centre	Data Centre Architecture	Watch this overview of our compute, storage, and hosting platforms.	https://www.youtube.com/embed/dQw4w9WgXcQ	Platform Diagrams	View detailed diagrams for core platforms.	2
cmlvensv8000i6en2spj9dmvi	cmlvensul00016en27ro3bxrt	app-delivery	Application Delivery	Application Delivery Overview	Watch this overview of our application delivery and support services.	https://www.youtube.com/embed/dQw4w9WgXcQ	Service Diagrams	View detailed diagrams for core services.	3
cmlvenswu000w6en29e6ox1pw	cmlvenswo000s6en253u5ag6s	service-desk	Service Desk	Service Desk Overview	Watch this overview of our Service Desk operations and support services.	https://www.youtube.com/embed/dQw4w9WgXcQ	Service Diagrams	View detailed diagrams for Service Desk operations.	0
cmlvenswy00106en26zn74zqd	cmlvenswo000s6en253u5ag6s	desktop-support	Desktop Support	Desktop Support Overview	Watch this overview of our Desktop Support services and processes.	https://www.youtube.com/embed/dQw4w9WgXcQ	Support Diagrams	View detailed diagrams for Desktop Support processes.	1
cmlvensx200146en2v1gcf24h	cmlvenswo000s6en253u5ag6s	desktop-admin	Desktop Administration	Desktop Administration Overview	Watch this overview of our Desktop Administration and device management.	https://www.youtube.com/embed/dQw4w9WgXcQ	Administration Diagrams	View detailed diagrams for Desktop Administration.	2
cmlvensyd001i6en2hwaabnya	cmlvensya001e6en2la9l1uja	database	Database	Database Management Overview	Watch this overview of our database management services and architecture.	https://www.youtube.com/embed/dQw4w9WgXcQ	Database Diagrams	View detailed diagrams for database infrastructure.	0
cmlvensyi001m6en2fr1df3r6	cmlvensya001e6en2la9l1uja	server	Server Solutions	Server Solutions Overview	Watch this overview of our server solutions and automation services.	https://www.youtube.com/embed/dQw4w9WgXcQ	Server Diagrams	View detailed diagrams for server infrastructure.	1
cmlvensyk001q6en2g62wzi6o	cmlvensya001e6en2la9l1uja	virtualization	Virtualization	Virtualization Overview	Watch this overview of our virtualization platforms and services.	https://www.youtube.com/embed/dQw4w9WgXcQ	Platform Diagrams	View detailed diagrams for virtualization platforms.	2
\.


--
-- Data for Name: TrelloBoard; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."TrelloBoard" (id, "teamId", title, description, href, "sortOrder") FROM stdin;
cmlvensve000m6en29j59mk1a	cmlvensul00016en27ro3bxrt	Network Services	High-level work priorities for the Network Services team.	https://trello.com/b/5qMgG2C2/network-services-work-priorities	0
cmlvensve000n6en2c3jnum29	cmlvensul00016en27ro3bxrt	Fibre Project	Tracking for the ongoing Network Services Fibre project.	https://trello.com/b/iukW90n7/network-services-fibre	1
cmlvensve000o6en2cx6e0pzc	cmlvensul00016en27ro3bxrt	Project/Initiatives requiring Network	Tracking other projects and initiatives that require Network team support.	https://trello.com/b/rlaQyc0m/projects-initiatives-requiring-network	2
cmlvensx600186en2pyw7gwle	cmlvenswo000s6en253u5ag6s	Partner Experience	High-level work priorities for the Partner Experience team.	#	0
cmlvensx600196en2lthyn81u	cmlvenswo000s6en253u5ag6s	Service Desk Operations	Tracking Service Desk initiatives and improvements.	#	1
cmlvensx6001a6en21fyeeorc	cmlvenswo000s6en253u5ag6s	Desktop Projects	Tracking desktop support and administration projects.	#	2
cmlvensyq001u6en2lgh7y9sk	cmlvensya001e6en2la9l1uja	Infrastructure Operations	High-level work priorities for the Infrastructure Operations team.	#	0
cmlvensyq001v6en2va64tq33	cmlvensya001e6en2la9l1uja	Database Projects	Tracking for ongoing database projects and initiatives.	#	1
cmlvensyq001w6en2ng62d8t2	cmlvensya001e6en2la9l1uja	Server & Virtualization	Tracking server and virtualization projects.	#	2
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."User" (id, email, name, role, "createdAt", "updatedAt") FROM stdin;
cmlvenss100006en28dunyuef	dev@edmonton.ca	Dev Admin	SUPER_ADMIN	2026-02-20 21:31:55.568	2026-02-20 21:31:55.568
\.


--
-- Data for Name: WidgetDefinition; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."WidgetDefinition" (id, "widgetType", label, description, icon, "isEnabled") FROM stdin;
cmlvent82006s6en2wvs0n3lk	page_header	Page Header	Team name banner with support request button	Type	t
cmlvent87006t6en262m69xxi	portfolios	Our Portfolios	Grid of portfolio cards with icons, descriptions, and links	LayoutGrid	t
cmlvent8b006u6en2kdi07gw4	team_tabs	Team Overviews	Tabbed interface with video embeds and diagram links	Columns	t
cmlvent8f006v6en28yd2qbrv	accordion_links	Important Links	Collapsible accordion groups of categorized links	List	t
cmlvent8k006w6en2rahxh51w	work_tracking	Work Tracking Boards	Grid of external board cards (Trello, etc.)	ClipboardList	t
cmlvent8o006x6en2y4n9h6x5	ongoing_projects	Ongoing Projects	Hero block highlighting current projects with CTA	FileText	t
cmlvent8t006y6en25wevvyur	budget_spend	Budget & Spend	Budget overview card with link to financial reports	BarChart3	t
cmlvent8x006z6en2xjn2dp9g	team_members	Who We Are	Team member cards grid with contact info	Users	t
cmlvent9100706en2675mk5m8	service_areas	Service Areas	Service area cards with modal detail views	Layers	t
cmlvent9500716en28iuvvrf6	subteam_header	Sub-Team Header	Hero section with icon, title, and breadcrumb	LayoutGrid	t
cmlvent9a00726en242whxcpi	subteam_services	Our Services	Grid of service cards with bullet items	Briefcase	t
cmlvent9e00736en2hiuybqjx	subteam_initiatives	Current Initiatives	Initiative cards with descriptions and links	Rocket	t
cmlvent9i00746en23d9tce9k	subteam_contacts	Key Contacts	Sidebar contact cards with roles and emails	Users	t
cmlvent9n00756en2hbba30tu	subteam_quick_links	Quick Links	Sidebar quick links with descriptions	Link	t
\.


--
-- Data for Name: WidgetInstance; Type: TABLE DATA; Schema: public; Owner: coe_admin
--

COPY public."WidgetInstance" (id, "teamId", "widgetDefinitionId", "sortOrder", config) FROM stdin;
cmlventa400766en2n75ekgyb	cmlvent6600616en2hs0z7mic	cmlvent9100706en2675mk5m8	0	\N
cmlventa900776en283nhovfz	cmlvent6i00686en299x0kho2	cmlvent9100706en2675mk5m8	0	\N
cmlventae00786en2vzzg1ahc	cmlvent6t006f6en2cjwul3e0	cmlvent9100706en2675mk5m8	0	\N
cmlventaj00796en2zlsnf36c	cmlvent73006k6en269eb9fx0	cmlvent9100706en2675mk5m8	0	\N
cmlventan007a6en2cpwauybt	cmlvensul00016en27ro3bxrt	cmlvent82006s6en2wvs0n3lk	0	\N
cmlventas007b6en2w769xvg5	cmlvensul00016en27ro3bxrt	cmlvent87006t6en262m69xxi	1	\N
cmlventaw007c6en2m70dfj9r	cmlvensul00016en27ro3bxrt	cmlvent8b006u6en2kdi07gw4	2	\N
cmlventb1007d6en2cro6bdq7	cmlvensul00016en27ro3bxrt	cmlvent8f006v6en28yd2qbrv	3	\N
cmlventb5007e6en27mln4swx	cmlvensul00016en27ro3bxrt	cmlvent8k006w6en2rahxh51w	4	\N
cmlventba007f6en2t2i0tzw1	cmlvensul00016en27ro3bxrt	cmlvent8o006x6en2y4n9h6x5	5	\N
cmlventbe007g6en2zth4hw8z	cmlvensul00016en27ro3bxrt	cmlvent8t006y6en25wevvyur	6	\N
cmlventbj007h6en2rn2k84se	cmlvensul00016en27ro3bxrt	cmlvent8x006z6en2xjn2dp9g	7	\N
cmlventbo007i6en2w6zu6iw3	cmlvenswo000s6en253u5ag6s	cmlvent82006s6en2wvs0n3lk	0	\N
cmlventbs007j6en2525j6rkh	cmlvenswo000s6en253u5ag6s	cmlvent87006t6en262m69xxi	1	\N
cmlventbx007k6en2ca9tg1a4	cmlvenswo000s6en253u5ag6s	cmlvent8b006u6en2kdi07gw4	2	\N
cmlventc1007l6en2rzm3g430	cmlvenswo000s6en253u5ag6s	cmlvent8f006v6en28yd2qbrv	3	\N
cmlventc5007m6en2ypo5xja1	cmlvenswo000s6en253u5ag6s	cmlvent8k006w6en2rahxh51w	4	\N
cmlventca007n6en2i16c6q5h	cmlvenswo000s6en253u5ag6s	cmlvent8o006x6en2y4n9h6x5	5	\N
cmlventce007o6en2jg32po11	cmlvenswo000s6en253u5ag6s	cmlvent8t006y6en25wevvyur	6	\N
cmlventci007p6en2wzxwdoz8	cmlvenswo000s6en253u5ag6s	cmlvent8x006z6en2xjn2dp9g	7	\N
cmlventcn007q6en2if43pqgr	cmlvensya001e6en2la9l1uja	cmlvent82006s6en2wvs0n3lk	0	\N
cmlventcr007r6en205sukt3l	cmlvensya001e6en2la9l1uja	cmlvent87006t6en262m69xxi	1	\N
cmlventcw007s6en2e76yzzqm	cmlvensya001e6en2la9l1uja	cmlvent8b006u6en2kdi07gw4	2	\N
cmlventd0007t6en2kbc9je7q	cmlvensya001e6en2la9l1uja	cmlvent8f006v6en28yd2qbrv	3	\N
cmlventd4007u6en280uro4z0	cmlvensya001e6en2la9l1uja	cmlvent8k006w6en2rahxh51w	4	\N
cmlventd9007v6en2suulgrcp	cmlvensya001e6en2la9l1uja	cmlvent8o006x6en2y4n9h6x5	5	\N
cmlventde007w6en28a85zpft	cmlvensya001e6en2la9l1uja	cmlvent8t006y6en25wevvyur	6	\N
cmlventdl007x6en2e9yjg6uz	cmlvensya001e6en2la9l1uja	cmlvent8x006z6en2xjn2dp9g	7	\N
cmlventdq007y6en2ourybxsm	cmlvent7q006q6en244qn4p3h	cmlvent82006s6en2wvs0n3lk	0	\N
cmlventdw007z6en2g59jw95y	cmlvent7q006q6en244qn4p3h	cmlvent87006t6en262m69xxi	1	\N
cmlvente100806en211rif57q	cmlvent7q006q6en244qn4p3h	cmlvent8b006u6en2kdi07gw4	2	\N
cmlvente700816en2jof0e8p4	cmlvent7q006q6en244qn4p3h	cmlvent8f006v6en28yd2qbrv	3	\N
cmlventec00826en2rx6a5lrj	cmlvent7q006q6en244qn4p3h	cmlvent8k006w6en2rahxh51w	4	\N
cmlventei00836en2519f7nej	cmlvent7q006q6en244qn4p3h	cmlvent8o006x6en2y4n9h6x5	5	\N
cmlventen00846en2e8wpk7y9	cmlvent7q006q6en244qn4p3h	cmlvent8t006y6en25wevvyur	6	\N
cmlventes00856en20qyasfxy	cmlvent7q006q6en244qn4p3h	cmlvent8x006z6en2xjn2dp9g	7	\N
cmlventey00866en2vq9q75md	cmlvent7v006r6en2bupsvv2m	cmlvent82006s6en2wvs0n3lk	0	\N
cmlventf200876en2pli6ud82	cmlvent7v006r6en2bupsvv2m	cmlvent87006t6en262m69xxi	1	\N
cmlventf600886en2hu4r0lhy	cmlvent7v006r6en2bupsvv2m	cmlvent8b006u6en2kdi07gw4	2	\N
cmlventfa00896en2iol881gi	cmlvent7v006r6en2bupsvv2m	cmlvent8f006v6en28yd2qbrv	3	\N
cmlventff008a6en2tlkvhgbp	cmlvent7v006r6en2bupsvv2m	cmlvent8k006w6en2rahxh51w	4	\N
cmlventfk008b6en2wtmt21u9	cmlvent7v006r6en2bupsvv2m	cmlvent8o006x6en2y4n9h6x5	5	\N
cmlventfp008c6en215bm6f45	cmlvent7v006r6en2bupsvv2m	cmlvent8t006y6en25wevvyur	6	\N
cmlventfu008d6en219gt6t82	cmlvent7v006r6en2bupsvv2m	cmlvent8x006z6en2xjn2dp9g	7	\N
cmlventk8008q6en250v6ea9i	cmlventin008e6en2fbfvks30	cmlvent9500716en28iuvvrf6	0	\N
cmlventkd008r6en20t1jqcj8	cmlventin008e6en2fbfvks30	cmlvent9a00726en242whxcpi	1	\N
cmlventkj008s6en23u24dpl6	cmlventin008e6en2fbfvks30	cmlvent9e00736en2hiuybqjx	2	\N
cmlventkp008t6en2h8v3ksei	cmlventin008e6en2fbfvks30	cmlvent9i00746en23d9tce9k	3	\N
cmlventku008u6en2cwn036hd	cmlventin008e6en2fbfvks30	cmlvent9n00756en2hbba30tu	4	\N
cmlventmg00976en2jn1dmw6g	cmlventl4008v6en2iz7ygp0g	cmlvent9500716en28iuvvrf6	0	\N
cmlventmp00986en2nkhhp2t7	cmlventl4008v6en2iz7ygp0g	cmlvent9a00726en242whxcpi	1	\N
cmlventmx00996en2xtqz7isr	cmlventl4008v6en2iz7ygp0g	cmlvent9e00736en2hiuybqjx	2	\N
cmlventn7009a6en2s74fxmlu	cmlventl4008v6en2iz7ygp0g	cmlvent9i00746en23d9tce9k	3	\N
cmlventng009b6en2902y8fcs	cmlventl4008v6en2iz7ygp0g	cmlvent9n00756en2hbba30tu	4	\N
cmlventpm009o6en22yqws0ps	cmlventns009c6en24cffno5p	cmlvent9500716en28iuvvrf6	0	\N
cmlventpv009p6en27a40or2y	cmlventns009c6en24cffno5p	cmlvent9a00726en242whxcpi	1	\N
cmlventq5009q6en22jwjk6jb	cmlventns009c6en24cffno5p	cmlvent9e00736en2hiuybqjx	2	\N
cmlventqe009r6en232s8k6m8	cmlventns009c6en24cffno5p	cmlvent9i00746en23d9tce9k	3	\N
cmlventqm009s6en20bm3xp2k	cmlventns009c6en24cffno5p	cmlvent9n00756en2hbba30tu	4	\N
cmlventsd00a56en211zlf1mq	cmlventqv009t6en2pk5blh5c	cmlvent9500716en28iuvvrf6	0	\N
cmlventsl00a66en2bqa91g54	cmlventqv009t6en2pk5blh5c	cmlvent9a00726en242whxcpi	1	\N
cmlventsr00a76en2zgoz2pop	cmlventqv009t6en2pk5blh5c	cmlvent9e00736en2hiuybqjx	2	\N
cmlventsy00a86en2ttvrhe5n	cmlventqv009t6en2pk5blh5c	cmlvent9i00746en23d9tce9k	3	\N
cmlventt500a96en2adx1iehn	cmlventqv009t6en2pk5blh5c	cmlvent9n00756en2hbba30tu	4	\N
cmlventur00am6en2gx2y57ht	cmlventtf00aa6en2l4uc4syn	cmlvent9500716en28iuvvrf6	0	\N
cmlventuz00an6en29xrocb1r	cmlventtf00aa6en2l4uc4syn	cmlvent9a00726en242whxcpi	1	\N
cmlventv700ao6en26qx5vaqx	cmlventtf00aa6en2l4uc4syn	cmlvent9e00736en2hiuybqjx	2	\N
cmlventvf00ap6en21py4q9ix	cmlventtf00aa6en2l4uc4syn	cmlvent9i00746en23d9tce9k	3	\N
cmlventvm00aq6en28dv9ooin	cmlventtf00aa6en2l4uc4syn	cmlvent9n00756en2hbba30tu	4	\N
cmlventxm00b36en2l1ma8got	cmlventvy00ar6en2gmjolwjb	cmlvent9500716en28iuvvrf6	0	\N
cmlventxv00b46en2k7j00qnn	cmlventvy00ar6en2gmjolwjb	cmlvent9a00726en242whxcpi	1	\N
cmlventy400b56en225kixott	cmlventvy00ar6en2gmjolwjb	cmlvent9e00736en2hiuybqjx	2	\N
cmlventyd00b66en2jpvf8hf4	cmlventvy00ar6en2gmjolwjb	cmlvent9i00746en23d9tce9k	3	\N
cmlventym00b76en27iudch90	cmlventvy00ar6en2gmjolwjb	cmlvent9n00756en2hbba30tu	4	\N
cmlvenu0w00bk6en29e4nzjd0	cmlventyy00b86en2yzuio14r	cmlvent9500716en28iuvvrf6	0	\N
cmlvenu1400bl6en2c7jft0ed	cmlventyy00b86en2yzuio14r	cmlvent9a00726en242whxcpi	1	\N
cmlvenu1c00bm6en2xg1jq699	cmlventyy00b86en2yzuio14r	cmlvent9e00736en2hiuybqjx	2	\N
cmlvenu1j00bn6en2z2ct4u7u	cmlventyy00b86en2yzuio14r	cmlvent9i00746en23d9tce9k	3	\N
cmlvenu1r00bo6en20h0m3c8h	cmlventyy00b86en2yzuio14r	cmlvent9n00756en2hbba30tu	4	\N
cmlvenu3o00c16en2ddc2u0o4	cmlvenu2000bp6en2302jxreg	cmlvent9500716en28iuvvrf6	0	\N
cmlvenu3x00c26en2of8mf8a8	cmlvenu2000bp6en2302jxreg	cmlvent9a00726en242whxcpi	1	\N
cmlvenu4800c36en2wvi0wli1	cmlvenu2000bp6en2302jxreg	cmlvent9e00736en2hiuybqjx	2	\N
cmlvenu4j00c46en2h608cxya	cmlvenu2000bp6en2302jxreg	cmlvent9i00746en23d9tce9k	3	\N
cmlvenu4r00c56en2jqg5f1gq	cmlvenu2000bp6en2302jxreg	cmlvent9n00756en2hbba30tu	4	\N
cmlvenu6t00ci6en2nkw68m8j	cmlvenu5100c66en2zn8wq782	cmlvent9500716en28iuvvrf6	0	\N
cmlvenu7300cj6en22aphcqnj	cmlvenu5100c66en2zn8wq782	cmlvent9a00726en242whxcpi	1	\N
cmlvenu7c00ck6en24njg3vqm	cmlvenu5100c66en2zn8wq782	cmlvent9e00736en2hiuybqjx	2	\N
cmlvenu7l00cl6en205spg8k0	cmlvenu5100c66en2zn8wq782	cmlvent9i00746en23d9tce9k	3	\N
cmlvenu7u00cm6en22thi6iwo	cmlvenu5100c66en2zn8wq782	cmlvent9n00756en2hbba30tu	4	\N
\.


--
-- Name: AccordionGroup AccordionGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."AccordionGroup"
    ADD CONSTRAINT "AccordionGroup_pkey" PRIMARY KEY (id);


--
-- Name: AccordionLink AccordionLink_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."AccordionLink"
    ADD CONSTRAINT "AccordionLink_pkey" PRIMARY KEY (id);


--
-- Name: AuditLog AuditLog_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_pkey" PRIMARY KEY (id);


--
-- Name: DiagramLink DiagramLink_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."DiagramLink"
    ADD CONSTRAINT "DiagramLink_pkey" PRIMARY KEY (id);


--
-- Name: PortfolioSubpage PortfolioSubpage_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."PortfolioSubpage"
    ADD CONSTRAINT "PortfolioSubpage_pkey" PRIMARY KEY (id);


--
-- Name: Portfolio Portfolio_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_pkey" PRIMARY KEY (id);


--
-- Name: ServiceArea ServiceArea_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."ServiceArea"
    ADD CONSTRAINT "ServiceArea_pkey" PRIMARY KEY (id);


--
-- Name: SubpageContact SubpageContact_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageContact"
    ADD CONSTRAINT "SubpageContact_pkey" PRIMARY KEY (id);


--
-- Name: SubpageInitiative SubpageInitiative_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageInitiative"
    ADD CONSTRAINT "SubpageInitiative_pkey" PRIMARY KEY (id);


--
-- Name: SubpageQuickLink SubpageQuickLink_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageQuickLink"
    ADD CONSTRAINT "SubpageQuickLink_pkey" PRIMARY KEY (id);


--
-- Name: SubpageService SubpageService_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageService"
    ADD CONSTRAINT "SubpageService_pkey" PRIMARY KEY (id);


--
-- Name: TeamContact TeamContact_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamContact"
    ADD CONSTRAINT "TeamContact_pkey" PRIMARY KEY (id);


--
-- Name: TeamInitiative TeamInitiative_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamInitiative"
    ADD CONSTRAINT "TeamInitiative_pkey" PRIMARY KEY (id);


--
-- Name: TeamMember TeamMember_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY (id);


--
-- Name: TeamPermission TeamPermission_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamPermission"
    ADD CONSTRAINT "TeamPermission_pkey" PRIMARY KEY (id);


--
-- Name: TeamQuickLink TeamQuickLink_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamQuickLink"
    ADD CONSTRAINT "TeamQuickLink_pkey" PRIMARY KEY (id);


--
-- Name: TeamService TeamService_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamService"
    ADD CONSTRAINT "TeamService_pkey" PRIMARY KEY (id);


--
-- Name: TeamTab TeamTab_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamTab"
    ADD CONSTRAINT "TeamTab_pkey" PRIMARY KEY (id);


--
-- Name: Team Team_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);


--
-- Name: TrelloBoard TrelloBoard_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TrelloBoard"
    ADD CONSTRAINT "TrelloBoard_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WidgetDefinition WidgetDefinition_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."WidgetDefinition"
    ADD CONSTRAINT "WidgetDefinition_pkey" PRIMARY KEY (id);


--
-- Name: WidgetInstance WidgetInstance_pkey; Type: CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."WidgetInstance"
    ADD CONSTRAINT "WidgetInstance_pkey" PRIMARY KEY (id);


--
-- Name: PortfolioSubpage_portfolioId_key; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE UNIQUE INDEX "PortfolioSubpage_portfolioId_key" ON public."PortfolioSubpage" USING btree ("portfolioId");


--
-- Name: Portfolio_linkedTeamId_key; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE UNIQUE INDEX "Portfolio_linkedTeamId_key" ON public."Portfolio" USING btree ("linkedTeamId");


--
-- Name: TeamPermission_userId_teamId_key; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE UNIQUE INDEX "TeamPermission_userId_teamId_key" ON public."TeamPermission" USING btree ("userId", "teamId");


--
-- Name: Team_slug_key; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE UNIQUE INDEX "Team_slug_key" ON public."Team" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: WidgetDefinition_widgetType_key; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE UNIQUE INDEX "WidgetDefinition_widgetType_key" ON public."WidgetDefinition" USING btree ("widgetType");


--
-- Name: WidgetInstance_teamId_sortOrder_idx; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE INDEX "WidgetInstance_teamId_sortOrder_idx" ON public."WidgetInstance" USING btree ("teamId", "sortOrder");


--
-- Name: WidgetInstance_teamId_widgetDefinitionId_key; Type: INDEX; Schema: public; Owner: coe_admin
--

CREATE UNIQUE INDEX "WidgetInstance_teamId_widgetDefinitionId_key" ON public."WidgetInstance" USING btree ("teamId", "widgetDefinitionId");


--
-- Name: AccordionGroup AccordionGroup_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."AccordionGroup"
    ADD CONSTRAINT "AccordionGroup_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccordionLink AccordionLink_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."AccordionLink"
    ADD CONSTRAINT "AccordionLink_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."AccordionGroup"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AuditLog AuditLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DiagramLink DiagramLink_teamTabId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."DiagramLink"
    ADD CONSTRAINT "DiagramLink_teamTabId_fkey" FOREIGN KEY ("teamTabId") REFERENCES public."TeamTab"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PortfolioSubpage PortfolioSubpage_portfolioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."PortfolioSubpage"
    ADD CONSTRAINT "PortfolioSubpage_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES public."Portfolio"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Portfolio Portfolio_linkedTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_linkedTeamId_fkey" FOREIGN KEY ("linkedTeamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Portfolio Portfolio_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ServiceArea ServiceArea_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."ServiceArea"
    ADD CONSTRAINT "ServiceArea_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SubpageContact SubpageContact_subpageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageContact"
    ADD CONSTRAINT "SubpageContact_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES public."PortfolioSubpage"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SubpageInitiative SubpageInitiative_subpageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageInitiative"
    ADD CONSTRAINT "SubpageInitiative_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES public."PortfolioSubpage"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SubpageQuickLink SubpageQuickLink_subpageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageQuickLink"
    ADD CONSTRAINT "SubpageQuickLink_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES public."PortfolioSubpage"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SubpageService SubpageService_subpageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."SubpageService"
    ADD CONSTRAINT "SubpageService_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES public."PortfolioSubpage"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamContact TeamContact_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamContact"
    ADD CONSTRAINT "TeamContact_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamInitiative TeamInitiative_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamInitiative"
    ADD CONSTRAINT "TeamInitiative_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamMember TeamMember_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamPermission TeamPermission_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamPermission"
    ADD CONSTRAINT "TeamPermission_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamPermission TeamPermission_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamPermission"
    ADD CONSTRAINT "TeamPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamQuickLink TeamQuickLink_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamQuickLink"
    ADD CONSTRAINT "TeamQuickLink_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamService TeamService_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamService"
    ADD CONSTRAINT "TeamService_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TeamTab TeamTab_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TeamTab"
    ADD CONSTRAINT "TeamTab_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Team Team_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TrelloBoard TrelloBoard_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."TrelloBoard"
    ADD CONSTRAINT "TrelloBoard_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WidgetInstance WidgetInstance_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."WidgetInstance"
    ADD CONSTRAINT "WidgetInstance_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WidgetInstance WidgetInstance_widgetDefinitionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coe_admin
--

ALTER TABLE ONLY public."WidgetInstance"
    ADD CONSTRAINT "WidgetInstance_widgetDefinitionId_fkey" FOREIGN KEY ("widgetDefinitionId") REFERENCES public."WidgetDefinition"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict CWC3tpRjaVQRIxrbfDybodgFJcNvKQfBbK6iDrUqYm1dS543JfcfQFVa83SwxyD

