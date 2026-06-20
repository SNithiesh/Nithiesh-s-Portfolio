export const heroMeta = [
  { k: "Location", v: "Hosur, Tamil Nadu" },
  { k: "Education", v: "M.Sc Data Science" },
  { k: "Focus", v: "Gen AI · ML · Deep Learning" },
];

export const metrics = [
  { n: 10, suffix: "+", label: "Years of NIFTY 50 data modelled" },
  { n: 50, suffix: "",  label: "Equities risk-ranked" },
  { n: 9,  suffix: "",  label: "Public GitHub repositories" },
  { n: 4,  suffix: "",  label: "Quant & ML projects shipped" },
];

export const about = {
  title: "Generative AI & Machine Learning",
  company: "M.Sc Data Science & Analytics · MSRUAS",
  bio: "AI & Machine Learning Engineer skilled in Python, Machine Learning, Deep Learning, NLP, and Generative AI. I build end-to-end AI solutions — Retrieval-Augmented Generation (RAG) systems, LLM-powered applications, and predictive ML models — with hands-on data-pipeline and deployment experience, focused on production-ready systems that solve real-world business problems through automation and applied machine learning.",
};

export const education = [
  { degree: "M.Sc Data Science & Analytics", school: "MS Ramaiah University of Applied Sciences, Bangalore", detail: "8.2 / 10 CGPA (Sem I) · 2025 – Present" },
  { degree: "B.Sc Mathematics", school: "Loyola College, Chennai", detail: "7.4 / 10 CGPA · Leading Cadet, Loyola NCC Navy · 2022 – 2025" },
];

export const skills = [
    { title: "Generative AI & LLM", items: ["LangChain", "OpenAI API", "RAG Pipelines", "Prompt Engineering", "Vector DBs (FAISS / Chroma / Pinecone)", "Embeddings & Semantic Search"] },
    { title: "Machine Learning", items: ["Scikit-learn", "XGBoost", "Gradient Boosting", "Random Forest", "Feature Engineering", "Model Evaluation & CV"] },
    { title: "Deep Learning & NLP", items: ["PyTorch", "TensorFlow", "Keras", "Transformers", "Hugging Face", "Tokenization & Text Classification"] },
    { title: "Data Science & Quant", items: ["Pandas / NumPy", "SciPy / Statsmodels", "Exploratory Data Analysis", "QuantLib / YFinance", "ARCH-GARCH / Black-Scholes", "Streamlit"] },
    { title: "Web & Development", items: ["React / Next.js", "Node.js / Express", "Vite", "Git / GitHub", "Matplotlib / Seaborn", "Power BI"] },
    { title: "Languages & Databases", items: ["Python", "SQL", "R", "MySQL", "PostgreSQL", "MongoDB"] },
  ];

export const stack = [
    { title: "Languages", tags: ["Python", "SQL", "R", "JavaScript", "TypeScript", "HTML/CSS"] },
    { title: "Generative AI", tags: ["LangChain", "OpenAI", "RAG", "Prompt Eng.", "FAISS", "Pinecone", "ChromaDB"] },
    { title: "ML & Deep Learning", tags: ["Scikit-learn", "XGBoost", "PyTorch", "TensorFlow", "Keras", "Random Forest"] },
    { title: "NLP & Data", tags: ["Transformers", "Hugging Face", "Pandas", "NumPy", "SciPy", "Statsmodels"] },
    { title: "Quant & Web", tags: ["QuantLib", "YFinance", "Streamlit", "React", "Next.js", "Node.js"] },
    { title: "Tools & DBs", tags: ["Git", "GitHub", "MySQL", "PostgreSQL", "Jupyter", "Google Colab"] },
  ];

export const experience = [
  { date: "Dec 2024 — Feb 2025", role: "Finance Intern", org: "Tinkas Industries · Chennai", desc: "Prepared detailed financial statements and reports with a focus on accuracy and compliance, ran variance analysis to surface discrepancies for budgetary planning, and collaborated across departments to assess the financial impact of operational decisions." },
  { date: "Dec 2023 — Feb 2024", role: "Data Science Intern", org: "Codsoft", desc: "Built end-to-end Python data pipelines covering collection, cleaning, and analysis, developed predictive models that informed business decisions, and used advanced visualization libraries to communicate findings to stakeholders." },
];

export const projects = [
  { cat: "Generative AI · NLP", name: "AI Hallucination Detection", desc: "Uncertainty-aware conversational QA framework that flags hallucinated LLM responses using Monte Carlo Dropout Bayesian inference and Mahalanobis-distance OOD detection, with a selective-generation mechanism that abstains on low-confidence answers to improve reliability.", tags: ["PyTorch", "Monte Carlo Dropout", "NLP", "UQ"], achieve: "Hallucination-aware QA", repo: "github.com/SNithiesh", url: "https://github.com/SNithiesh" },
  { cat: "Applied Machine Learning", name: "NapSafe", desc: "AI-powered driver-fatigue prediction and smart rest-pod recommendation system — a risk-scoring ML pipeline over behavioural, sleep-quality, and workload signals, paired with a GIS dashboard mapping accident hotspots to optimise rest-pod placement.", tags: ["Python", "Scikit-learn", "Streamlit", "GIS"], achieve: "Real-time fatigue scoring", repo: "github.com/SNithiesh", url: "https://github.com/SNithiesh" },
  { cat: "Quantitative Finance", name: "Quant Risk Dashboard", desc: "Automated risk-analysis pipeline processing 10+ years of NIFTY 50 data — daily/annualized returns, volatility, and Sharpe ratios across 50 equities, with KDE plots and sector benchmarking via Matplotlib GridSpec.", tags: ["Python", "Pandas", "SciPy", "Matplotlib"], achieve: "50-equity risk ranking", repo: "github.com/SNithiesh/Stock-Price-Prediction", url: "https://github.com/SNithiesh/Stock-Price-Prediction", caseSlug: "quant-risk-dashboard" },
  { cat: "Asset Pricing", name: "Portfolio Optimizer", desc: "Modern Portfolio Theory engine using SciPy SLSQP to maximize Sharpe ratio, with ARCH/GARCH volatility forecasting, Statsmodels OLS regression, and QuantLib Black-Scholes option pricing on live YFinance data.", tags: ["SciPy", "QuantLib", "YFinance", "Statsmodels"], achieve: "MPT + GARCH engine", repo: "github.com/SNithiesh/Portfolio-Optimization-Tool", url: "https://github.com/SNithiesh/Portfolio-Optimization-Tool", caseSlug: "portfolio-optimizer" },
];

export const contact = [
  { label: "Email", val: "mksnithiesh2004@gmail.com", href: "mailto:mksnithiesh2004@gmail.com" },
  { label: "LinkedIn", val: "nithiesh-s", href: "https://www.linkedin.com/in/nithiesh-s-0482b924a/" },
  { label: "GitHub", val: "SNithiesh", href: "https://github.com/SNithiesh" },
  { label: "Phone", val: "+91 94867 27231", href: "tel:+919486727231" },
];
