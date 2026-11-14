export const LINKS = {
  github: "https://github.com/lawrenceokolo1",
  linkedin: "https://www.linkedin.com/in/lawrence-okolo",
  huggingface: "https://huggingface.co/Lawrence-okolo",
  email: "okololawrence48@yahoo.com",
};

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
];

export const STATS = [
  { value: "7+", label: "years shipping production ML" },
  { value: "12%", label: "inventory cost cut with demand forecasting" },
  { value: "148k", label: "products in a ViT + FAISS search index" },
];

/**
 * Featured projects, most interesting first. `visual` picks the card art:
 * an image path, or a named SVG motif drawn in Visual.jsx.
 */
export const PROJECTS = [
  {
    id: "vasi",
    featured: true,
    kicker: "Robotics · Spatial AI",
    title: "VASI spatial platform",
    summary:
      "Turns hospital floor plans into a live model of the building, every room, corridor, lift, and door, so autonomous robots and people can navigate it. The foundation for VASI's hospital robots.",
    points: [
      "Floor plans to a routable building model, no manual scanning",
      "One map shared by robots, wayfinding, and building insight",
      "Running live in the browser today",
    ],
    stack: ["TypeScript", "Spatial graphs", "Routing", "Robotics"],
    links: [
      { label: "Open the live map", href: "https://spatial.vasi.ca/jj" },
      { label: "vasi.ca", href: "https://vasi.ca" },
    ],
    visual: "/img/vasi-map.webp",
  },
  {
    id: "agenticros",
    featured: true,
    kicker: "Robotics · LLM agents",
    title: "AgenticROS",
    summary:
      "An agent-agnostic interface layer that lets you control and query ROS 2 robots in natural language from Claude Code, Claude desktop, Gemini CLI, or OpenClaw.",
    points: [
      "Platform-agnostic core over rosbridge, Zenoh, local, and WebRTC transports",
      "MCP server for Claude, function calling for Gemini, plugin for OpenClaw",
      "ROS 2 workspace with discovery, agent, and follow-me packages",
      "Presented live at BC + AI, Vancouver, March 2026",
    ],
    stack: ["TypeScript", "ROS 2", "MCP", "Zenoh", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/lawrenceokolo1/agenticros" },
      { label: "agenticros.com", href: "https://agenticros.com" },
    ],
    visual: "/img/agenticros-talk.webp",
    photo: true,
    caption: "Presenting the AgenticROS stack · BC + AI, Mar 2026 · Photo: Michelle Diamond",
  },
  {
    id: "fery",
    line: "Production AI assistant for Canadian ferry schedules, in plain language.",
    kicker: "LLM · Production AI",
    title: "Fery",
    summary:
      "A production AI assistant that answers plain-language questions about Canadian ferry routes and sailings against structured schedule data. No login, no signup wall.",
    points: [
      "Multi-model stack: retrieval, self-evaluation, and response generation",
      "Launched on Quebec, one of Canada's most complex ferry networks",
      "The same language layer powers robot-to-staff communication at VASI",
    ],
    stack: ["TypeScript", "LLMs", "RAG", "Evaluation"],
    links: [
      { label: "fery.ca", href: "https://fery.ca" },
      { label: "How it works", href: "https://vasi.ca/blog/fery-and-the-robot" },
    ],
  },
  {
    id: "vit-faiss",
    line: "Visual product search over ~148k products with ViT + FAISS.",
    kicker: "Computer vision · MLOps",
    title: "Visual product search",
    summary:
      "Multi-category visual product recommendation on the Amazon Berkeley Objects dataset. ViT image embeddings and text embeddings fused at query time, searched with FAISS.",
    points: [
      "Exact search across ~148k products with FAISS IndexFlatIP",
      "Image + text late fusion, alpha tuned with MLflow",
      "Evaluated with Recall@K and mAP; FastAPI service, Docker, unit tests",
    ],
    stack: ["Python", "ViT", "FAISS", "FastAPI", "MLflow", "Docker"],
    links: [
      { label: "Live demo", href: "https://huggingface.co/spaces/Lawrence-okolo/product-recommendation" },
      { label: "GitHub", href: "https://github.com/lawrenceokolo1/vit-faiss-product-recommendation" },
    ],
  },
  {
    id: "vegetation",
    line: "Landsat change detection of vegetation loss, tied to StatCan boundaries.",
    kicker: "Geospatial · Remote sensing",
    title: "Canada vegetation loss",
    summary:
      "A geospatial pipeline that joins Statistics Canada boundaries with Landsat 8 imagery to map vegetation loss across Canada's fire-prone provinces, 2022 to 2025.",
    points: [
      "dNBR change layer from season-matched Landsat composites",
      "Results tied to real jurisdictions: province, division, municipality",
      "Interactive severity maps exported as standalone HTML",
    ],
    stack: ["Python", "Earth Engine", "GeoPandas", "geemap"],
    links: [
      { label: "GitHub", href: "https://github.com/lawrenceokolo1/Canada_Boundary_Vegetation_Loss" },
    ],
  },
  {
    id: "health",
    line: "Deployed home-care scheduler, diabetes risk model, and data profiler.",
    kicker: "Healthcare ML",
    title: "Healthcare ML apps",
    summary:
      "A suite of deployed healthcare tools: a BC home-care appointment scheduler with map views, a diabetes risk predictor, and a 60-second dataset profiler.",
    points: [
      "Patient, provider, and appointment management on SQLite",
      "Probabilistic diabetes risk from glucose, BMI, HbA1c, and symptoms",
      "Deployed on Streamlit Cloud",
    ],
    stack: ["Python", "scikit-learn", "Streamlit", "Folium"],
    links: [
      { label: "Live apps", href: "https://lawrence-project.streamlit.app" },
      { label: "GitHub", href: "https://github.com/lawrenceokolo1/inactive-BC" },
    ],
  },
];

export const EXPERIENCE = [
  {
    period: "2025 – Now",
    org: "VASI",
    role: "Autonomous hospital robots",
    body: "Building the robots, the spatial platform, and the AI stack behind VASI: hospital mapping, route planning, ROS-based simulation, and natural-language interaction with staff.",
  },
  {
    period: "2025 – Now",
    org: "HUGE",
    role: "Lead AI Engineer",
    body: "Leading AI engineering across robotics and applied AI, from model development to deployment infrastructure.",
  },
  {
    period: "2024",
    org: "Canadian Red Cross",
    role: "Database Specialist",
    body: "Data infrastructure and quality standards for humanitarian operations across Canada.",
  },
  {
    period: "2022 – 2024",
    org: "Cognizant",
    role: "Machine Learning Researcher",
    body: "Applied ML research across deep learning, statistical modelling, and ML systems design in 13+ technical domains.",
  },
  {
    period: "2018 – 2021",
    org: "The FMN Group",
    role: "MLOps Engineer",
    body: "Built and ran production ML infrastructure for nearly four years. Demand-forecasting models across multiple regions cut inventory costs by 12%.",
  },
];

export const EDUCATION = {
  school: "Northeastern University",
  degree: "Master's, Applied Machine Intelligence",
};

export const STACK = [
  { cat: "Robotics", items: ["ROS 2", "Simulation", "SLAM", "Sensor fusion", "Zenoh", "Edge AI"] },
  { cat: "Deep learning", items: ["PyTorch", "TensorFlow", "Hugging Face", "ViT", "CLIP", "Transformers"] },
  { cat: "LLMs & agents", items: ["RAG", "MCP", "Function calling", "Evaluation", "FAISS", "Qdrant"] },
  { cat: "MLOps", items: ["MLflow", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Triton"] },
  { cat: "Data & geo", items: ["Python", "SQL", "Pandas", "Spark", "Earth Engine", "GeoPandas"] },
];

export const PORTRAIT = {
  src: "/img/portrait.webp",
  alt: "Lawrence Okolo speaking at BC + AI in Vancouver",
  caption: "BC + AI, Vancouver · Mar 2026",
  credit: "Photo: Michelle Diamond",
};
