export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Streaming & Real-Time' | 'Analytics Engineering' | 'Data Warehousing';
  featured: boolean;
  problem: string;
  solution: string;
  architectureDetails: string[];
  metrics: string[];
  tools: string[];
  githubUrl: string;
  liveUrl?: string;
  badge: string;
  accentColor: string;
  year: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  icon: string;
  skills: { name: string; level?: 'Core' | 'Proficient' | 'Familiar' }[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  type: 'Industry Certification' | 'Training Badge' | 'Intensive Program';
  icon: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'Training & Specialization' | 'Upskilling Initiative' | 'Degree';
  highlights: string[];
  technologies: string[];
}

export const PERSONAL_INFO = {
  name: "Ahmed EL-Tlawy",
  title: "Data Engineer",
  tagline: "Designing scalable streaming pipelines, robust Medallion warehouses, and production ELT/ETL workflows.",
  email: "AhmedMohsenITI@gmail.com",
  phone: "+20 106 511 4667",
  location: "Nasr City, Cairo, Egypt",
  militaryStatus: "Completed",
  github: {
    username: "ahmedmohsenfawzy",
    url: "https://github.com/ahmedmohsenfawzy"
  },
  linkedin: {
    username: "ahmed-el-tlawy",
    url: "https://linkedin.com/in/ahmed-el-tlawy"
  },
  summary: "Data Engineer with hands-on experience designing and implementing scalable data pipelines, warehousing solutions, and ELT/ETL workflows. Proficient in Python, SQL, dbt, Airflow, and modern cloud platforms. Passionate about data quality, medallion architecture, and integrating intelligent solutions into data processes. Holds the ITI Data Engineering Intensive Training Program certificate and industry certifications from Snowflake and Astronomer.",
  stats: [
    { label: "Core Platforms", value: "Snowflake & ClickHouse" },
    { label: "Architecture", value: "Medallion (Bronze/Silver/Gold)" },
    { label: "Pipeline Modes", value: "Real-Time Streaming & Batch" },
    { label: "Certifications", value: "Snowflake & Astronomer Certified" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "sky-eye",
    title: "Sky Eye — Real-Time & Batch ADS-B Flight Data Platform",
    subtitle: "Unified dual-pipeline streaming & batch architecture with Snowflake, ClickHouse, and ML scoring",
    category: "Streaming & Real-Time",
    featured: true,
    badge: "Flagship Architecture",
    accentColor: "cyan",
    year: "2026",
    problem: "Live ADS-B flight data streams at massive volume from multiple sources with no unified platform for real-time anomaly detection or historical trend analysis, making it impossible to monitor flight delays, detect anomalies, or generate reliable operational insights.",
    solution: "Designed and implemented a dual-pipeline ADS-B flight data platform — a streaming pipeline for near real-time monitoring and anomaly detection, and a batch pipeline for historical analytics — unified through a Snowflake-centred warehouse with downstream ML scoring and BI reporting.",
    architectureDetails: [
      "Built a streaming pipeline ingesting live flight records from the OpenSky API into Apache Kafka, fanning out to two parallel consumers.",
      "Consumer 1 lands raw events in MinIO as an object-store data lake, then promotes records into Snowflake where an ML anomaly-detection model scores them in near real time.",
      "Consumer 2 applies data cleaning and transformation before writing to ClickHouse for sub-second OLAP queries, surfaced through Grafana dashboards for live anomaly alerts, delay signals, and flight-traffic monitoring.",
      "Engineered a batch ingestion pipeline pulling historical ADS-B datasets from GitHub into AWS S3, loading raw records into a Snowflake Bronze layer as the immutable source.",
      "Applied Silver-layer transformations to fill nulls, normalize data types, and align business rules to produce a clean, query-ready dataset.",
      "Developed a Gold layer split into two parallel tracks: an ML track applying feature engineering and pre-processing transformations before scoring, and an Analytics track enriching and aggregating data into a star schema (fact_flights paired with dimension tables for routes, aircraft, airports, and time) powering Power BI dashboards."
    ],
    metrics: [
      "Sub-second OLAP queries via ClickHouse",
      "Dual Kafka consumer fanout architecture",
      "Bronze → Silver → Gold Medallion Lakehouse",
      "Near real-time ML anomaly detection scoring"
    ],
    tools: [
      "Python", "Apache Kafka", "MinIO", "OpenSky API", "AWS S3", "Snowflake", 
      "ClickHouse", "Grafana", "Power BI", "SQL", "Medallion Architecture", "Star Schema"
    ],
    githubUrl: "https://github.com/mrmohamedsalah/Sky-Eye"
  },
  {
    id: "airbnb-analytics",
    title: "Airbnb Analytics Engineering — dbt + Dagster",
    subtitle: "End-to-end data transformation, software-defined assets, and reproducible environments",
    category: "Analytics Engineering",
    featured: true,
    badge: "Modern Data Stack",
    accentColor: "emerald",
    year: "2026",
    problem: "Airbnb's raw listing and booking data is too fragmented for direct reporting, requiring a structured transformation layer before analysts can reliably track pricing trends, host performance, or occupancy patterns.",
    solution: "Built an end-to-end analytics engineering project on Airbnb data using dbt for data transformation and modelling, applying best practices such as staging, intermediate, and mart layers.",
    architectureDetails: [
      "Modeled multi-layered transformations: staging (raw sanitization), intermediate (business logic & joins), and mart layers (consumption-ready metrics).",
      "Integrated dbt with Dagster as the orchestration framework, building my_dbt_dagster_project that schedules and monitors dbt runs as software-defined assets.",
      "Configured modular models and reproducible Python environments via pyproject.toml and uv for rapid, deterministic execution.",
      "Connected transformed models to Snowflake for high-throughput analyst querying."
    ],
    metrics: [
      "Software-Defined Assets in Dagster",
      "Staging → Intermediate → Marts dbt layers",
      "Zero-drift environment reproducibility with uv",
      "Automated dbt tests and schema documentation"
    ],
    tools: ["Python", "dbt", "Dagster", "Snowflake", "SQL", "Analytics Engineering", "uv"],
    githubUrl: "https://github.com/ahmedmohsenfawzy/airbnb_dbt"
  },
  {
    id: "data-warehouse-etl",
    title: "Enterprise Data Warehouse ETL Pipeline",
    subtitle: "Three-layer Medallion architecture uniting siloed CRM and ERP source systems",
    category: "Data Warehousing",
    featured: true,
    badge: "Enterprise Medallion",
    accentColor: "indigo",
    year: "2025",
    problem: "Businesses running separate CRM and ERP systems accumulate siloed data that can't be joined or queried together, blocking any unified view of customers, products, and sales performance.",
    solution: "Architected a production-grade three-layer medallion data warehouse (Bronze → Silver → Gold) ingesting raw CSV data from CRM and ERP source systems.",
    architectureDetails: [
      "Bronze layer: Uses BULK INSERT with truncate-and-load stored procedures to preserve raw data without altering source semantics.",
      "Silver layer: Comprehensive transformations including data cleaning, type normalisation, derived columns (e.g. product end dates via LEAD window functions), and data-quality corrections for sales calculations.",
      "Gold layer: Exposes star-schema via SQL views: dim_customers (merged from three distinct source tables), dim_products, and fact_sales, optimised for BI queries.",
      "Automated quality-check scripts across both Silver and Gold layers to guarantee schema enforcement and metric integrity across the pipeline."
    ],
    metrics: [
      "Unified CRM + ERP enterprise schema",
      "Automated Silver & Gold data quality verification",
      "LEAD window functions for temporal boundaries",
      "Optimized star schema analytical SQL views"
    ],
    tools: ["SQL Server", "T-SQL", "SSMS", "Star Schema Design", "Medallion Architecture", "Draw.io"],
    githubUrl: "https://github.com/ahmedmohsenfawzy/DataWarehouse-ETL-Pipeline"
  },
  {
    id: "bookstore-dwh",
    title: "Bookstore Data Warehouse — SSIS + Power BI",
    subtitle: "Dimensional modeling, Slowly Changing Dimensions (SCD), and executive revenue dashboards",
    category: "Data Warehousing",
    featured: false,
    badge: "Dimensional DW",
    accentColor: "amber",
    year: "2026",
    problem: "A bookstore managing sales across hundreds of titles had no central view of revenue performance, making it impossible to identify top authors, track trends, or support data-driven purchasing decisions.",
    solution: "Designed and implemented a full data warehouse for a bookstore domain, modelling the source schema and building the dimensional model (fact and dimension tables) to support analytical reporting.",
    architectureDetails: [
      "Modeled relational source systems into an optimized star schema with dimensional and fact tables.",
      "Developed SSIS packages to extract, transform, and load data into the warehouse.",
      "Applied incremental loading strategies and Slowly Changing Dimension (SCD) handling for historical record accuracy.",
      "Delivered an interactive Power BI dashboard exposing key business metrics including sales trends, top-performing titles, author performance, and revenue KPIs."
    ],
    metrics: [
      "Historical accuracy via SCD handling",
      "Automated incremental ETL load cycles",
      "Multi-dimensional star schema",
      "Interactive Power BI executive dashboards"
    ],
    tools: ["SQL Server", "SSIS", "Power BI", "Dimensional Modelling", "SCD", "Draw.io"],
    githubUrl: "https://github.com/ahmedmohsenfawzy/book_store_model-SSIS-"
  },
  {
    id: "brazilian-ecommerce",
    title: "Brazilian E-commerce — dbt Analytics Project",
    subtitle: "Olist marketplace transformations, tests, and consumption-ready marts",
    category: "Analytics Engineering",
    featured: false,
    badge: "dbt Analytics",
    accentColor: "rose",
    year: "2026",
    problem: "Olist Brazilian e-commerce data sits across orders, customers, products, payments, and reviews with no trusted transformation layer for sales, delivery, and seller performance reporting.",
    solution: "Built a dbt project on the Brazilian e-commerce dataset with staging models, tested business logic, and marts that expose order, customer, and marketplace metrics for analytics.",
    architectureDetails: [
      "Modeled source tables into staging models with consistent naming, types, and grain.",
      "Applied dbt tests to protect uniqueness, not-null, and relationship integrity across orders and customers.",
      "Built marts for sales, delivery SLAs, seller performance, and payment mix.",
      "Documented models so analysts can query a single trusted layer instead of raw marketplace extracts."
    ],
    metrics: [
      "Staging → marts dbt layers",
      "Schema tests on core entities",
      "Marketplace order and seller metrics",
      "Analyst-ready consumption models"
    ],
    tools: ["dbt", "SQL", "Python", "Analytics Engineering", "Olist Dataset"],
    githubUrl: "https://github.com/ahmedmohsenfawzy/brazilian_ecommerce"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Cloud Platforms & Warehousing",
    description: "Modern cloud analytical warehouses, object storage, and lakehouse platforms.",
    icon: "cloud",
    skills: [
      { name: "Snowflake", level: "Core" },
      { name: "ClickHouse", level: "Core" },
      { name: "AWS (S3)", level: "Core" },
      { name: "Databricks", level: "Proficient" },
      { name: "Microsoft Fabric", level: "Proficient" },
      { name: "Microsoft Azure", level: "Proficient" }
    ]
  },
  {
    category: "Streaming & Data Pipelines",
    description: "Distributed streaming, queue ingestion, and high-volume data movement.",
    icon: "pipeline",
    skills: [
      { name: "Apache Kafka", level: "Core" },
      { name: "MinIO Object Storage", level: "Core" },
      { name: "OpenSky Streaming API", level: "Core" },
      { name: "ETL / ELT Pipelines", level: "Core" },
      { name: "SSIS", level: "Proficient" },
      { name: "Talend", level: "Familiar" }
    ]
  },
  {
    category: "Orchestration & Transformation",
    description: "Modern analytics engineering, software-defined assets, and DAG orchestration.",
    icon: "workflow",
    skills: [
      { name: "dbt (Data Build Tool)", level: "Core" },
      { name: "Apache Airflow (Airflow 3)", level: "Core" },
      { name: "Dagster", level: "Core" },
      { name: "uv / pyproject.toml", level: "Core" },
      { name: "SSAS", level: "Proficient" },
      { name: "CI / CD for Pipelines", level: "Proficient" }
    ]
  },
  {
    category: "Languages & Querying",
    description: "Core programming languages, procedural SQL dialect, and scripting.",
    icon: "code",
    skills: [
      { name: "Python", level: "Core" },
      { name: "SQL", level: "Core" },
      { name: "T-SQL", level: "Core" },
      { name: "Bash", level: "Proficient" },
      { name: "NoSQL (MongoDB)", level: "Proficient" },
      { name: "C++", level: "Familiar" },
      { name: "Java", level: "Familiar" },
      { name: "JavaScript", level: "Familiar" },
      { name: "C#", level: "Familiar" }
    ]
  },
  {
    category: "Architecture & Data Modeling",
    description: "Industry architectural patterns, dimensional design, and data governance.",
    icon: "database",
    skills: [
      { name: "Medallion Architecture (Bronze/Silver/Gold)", level: "Core" },
      { name: "Star & Snowflake Schema", level: "Core" },
      { name: "Slowly Changing Dimensions (SCD)", level: "Core" },
      { name: "Dimensional Modeling", level: "Core" },
      { name: "Data Quality Verification", level: "Core" },
      { name: "Data Warehousing", level: "Core" }
    ]
  },
  {
    category: "Analytics, BI & ML Frameworks",
    description: "Interactive reporting, distributed computation, and analytical libraries.",
    icon: "chart",
    skills: [
      { name: "Power BI", level: "Core" },
      { name: "Grafana", level: "Core" },
      { name: "Apache Spark", level: "Proficient" },
      { name: "Pandas & NumPy", level: "Core" },
      { name: "Scikit-Learn", level: "Proficient" },
      { name: "TensorFlow", level: "Proficient" },
      { name: "Matplotlib & Seaborn", level: "Core" },
      { name: "Excel", level: "Core" }
    ]
  },
  {
    category: "DevOps & Developer Tools",
    description: "Containerization, environment isolation, and version control.",
    icon: "terminal",
    skills: [
      { name: "Docker", level: "Proficient" },
      { name: "Linux", level: "Proficient" },
      { name: "Git & GitHub", level: "Core" },
      { name: "SQL Server Management Studio (SSMS)", level: "Core" },
      { name: "VS Code", level: "Core" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "SnowPro Associate: Platform Certification",
    issuer: "Snowflake",
    date: "Feb 2026",
    status: "Active",
    type: "Industry Certification",
    icon: "snowflake"
  },
  {
    name: "Astronomer Certification for Apache Airflow 3 Fundamentals",
    issuer: "Astronomer",
    date: "Feb 2026",
    status: "Active",
    type: "Industry Certification",
    icon: "airflow"
  },
  {
    name: "AWS Academy Graduate — Data Engineering Training Badge",
    issuer: "Amazon Web Services (AWS)",
    date: "May 2026",
    status: "Active",
    type: "Training Badge",
    icon: "aws"
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations Training Badge",
    issuer: "Amazon Web Services (AWS)",
    date: "May 2026",
    status: "Active",
    type: "Training Badge",
    icon: "aws"
  }
];

export const TIMELINE: ExperienceItem[] = [
  {
    role: "Data Engineering Intensive Training Program (ITP)",
    organization: "Information Technology Institute (ITI) — Zagazig Branch",
    period: "Jan 2026 – Jun 2026",
    location: "Egypt",
    type: "Training & Specialization",
    highlights: [
      "Completed an intensive, project-driven program covering data warehousing, ETL/ELT development, database design, and big data technologies.",
      "Delivered hands-on projects simulating real-world data workflows, including pipeline orchestration, data modelling, and analytics engineering."
    ],
    technologies: ["Snowflake", "dbt", "Apache Airflow", "Apache Kafka", "ClickHouse", "SQL Server", "Python"]
  },
  {
    role: "Bachelor of Computer & Information Science — Information Systems (IS)",
    organization: "Ain Shams University",
    period: "Sep 2020 – May 2024",
    location: "Cairo, Egypt",
    type: "Degree",
    highlights: [
      "Graduation Project — Skin Disease Analyzer (Grade: A+): Developed and trained a multi-class skin cancer classification model using EfficientNetB3 and ResNet transfer learning on the HAM10000 dataset.",
      "Exported the model to TFLite format for integration into a Flutter mobile application, enabling on-device edge inference."
    ],
    technologies: ["Python", "TensorFlow", "ResNet", "EfficientNet", "TFLite", "Flutter", "Database Systems"]
  },
  {
    role: "FWD: Data Analysis Initiative",
    organization: "Udacity / MCIT Egypt",
    period: "Jul 2021 – Oct 2022",
    location: "Egypt",
    type: "Upskilling Initiative",
    highlights: [
      "Completed Egypt's Forward digital upskilling initiative, gaining hands-on experience in SQL, Python, Excel, Power BI, and real-world analytical projects."
    ],
    technologies: ["SQL", "Python", "Power BI", "Excel", "Data Analysis"]
  }
];

export const CLOUD_SKILLS = [
  'Python',
  'SQL',
  'T-SQL',
  'Snowflake',
  'ClickHouse',
  'Kafka',
  'dbt',
  'Airflow',
  'Dagster',
  'SSIS',
  'SSAS',
  'Spark',
  'Power BI',
  'Grafana',
  'AWS',
  'Azure',
  'Databricks',
  'Fabric',
  'MinIO',
  'Talend',
  'Docker',
  'Linux',
  'Git',
  'GitHub',
  'Pandas',
  'NumPy',
  'Scikit-Learn',
  'TensorFlow',
  'Matplotlib',
  'Seaborn',
  'Excel',
  'MongoDB',
  'Bash',
  'C++',
  'Java',
  'JavaScript',
  'C#',
  'ETL',
  'ELT',
  'Medallion',
  'Star Schema',
  'SCD',
  'SQL Server',
  'VS Code',
  'OpenSky',
  'CI/CD',
  'Data Warehouse',
  'Dimensional Modeling',
  'uv'
];

export const LANGUAGES_AND_SOFT_SKILLS = {
  languages: [
    { language: "Arabic", proficiency: "Native" },
    { language: "English", proficiency: "B2 — Upper Intermediate" }
  ],
  softSkills: [
    "Task prioritisation",
    "Time management",
    "Team collaboration",
    "Project ownership & accountability"
  ]
};
