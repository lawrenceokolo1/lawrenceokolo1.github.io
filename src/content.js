export const LINKS = {
  github: "https://github.com/lawrenceokolo1",
  linkedin: "https://www.linkedin.com/in/lawrence-okolo",
  huggingface: "https://huggingface.co/Lawrence-okolo",
  email: "okololawrence48@yahoo.com",
};

export const NAV = [
  { label: "Mission", href: "#mission" },
  { label: "Work", href: "#work" },
  { label: "Partner", href: "#partner" },
  { label: "Notes", href: "#notes" },
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
      "Live demo opening Vancouver AI Meetup #27 (BC + AI) at the H.R. MacMillan Space Centre",
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
    id: "microbot",
    line: "Small autonomous robot designed, wired, and programmed in the VASI lab.",
    kicker: "Robotics · Hardware",
    title: "VASI Microbot",
    summary:
      "A small-scale robot that represents what VASI is building: designed, wired, and programmed in our Vancouver lab as part of our work in autonomous robotics and spatial intelligence.",
    points: [
      "Built end to end in-house: hardware, wiring, and software",
      "Demoed at the Vancouver Physical AI Workshop hosted by Voxel51",
      "A testbed for the autonomy behind VASI's hospital logistics robots",
    ],
    stack: ["Robotics", "Embedded", "Autonomy"],
    links: [
      { label: "vasi.ca", href: "https://vasi.ca" },
    ],
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
    org: "VASI Systems",
    role: "Health Robotics R&D",
    body: "Building the robots, the spatial platform, and the AI stack behind VASI: hospital mapping, route planning, and natural-language interaction with staff. Leading the move from a classical navigation stack to reinforcement learning, working across Unitree and AgiBot quadrupeds and our own custom robots, including the VASI Microbot built in our Vancouver lab.",
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
  { cat: "Robots & platforms", items: ["Unitree quadrupeds", "AgiBot quadrupeds", "Custom robots (VASI Microbot)", "AMD Ryzen", "ROS 2"] },
  { cat: "NVIDIA", items: ["Jetson platform", "Isaac ROS", "Isaac Sim", "Cosmos", "TensorRT", "CUDA"] },
  { cat: "Robotics software", items: ["SLAM & localization", "Multi-sensor fusion", "Path planning & obstacle avoidance", "Reinforcement learning", "Model predictive control", "Fleet management & task dispatch", "Zenoh"] },
  { cat: "Deployment & field ops", items: ["Robot commissioning", "Sensor calibration (LiDAR, RGB-D, IMU)", "Site mapping", "Routes & safety zones", "Elevator & door integration", "Charging docks", "Runbooks"] },
  { cat: "Hardware", items: ["Embedded firmware (C++)", "PCB design", "Hardware controllers", "Electromechanical systems", "Hardware-software integration"] },
  { cat: "AI & agents", items: ["PyTorch", "Hugging Face", "ViT & CLIP", "VLMs", "RAG", "MCP", "FAISS", "On-device inference"] },
  { cat: "Software & infra", items: ["Python", "C++", "FastAPI", "Docker", "GitHub Actions", "PyTest", "Linux & networking", "Kafka", "Redis", "Prometheus & Grafana", "MLflow"] },
  { cat: "Data & geo", items: ["SQL", "Pandas", "Spark", "Earth Engine", "GeoPandas"] },
];

export const PORTRAIT = {
  src: "/img/portrait.webp",
  alt: "Lawrence Okolo speaking at BC + AI in Vancouver",
  caption: "BC + AI, Vancouver · Mar 2026",
  credit: "Photo: Michelle Diamond",
};

/** Dated field notes, newest first, drawn from LinkedIn posts. */
export const NOTES = [
  {
    date: "Oct 2026",
    title: "Took the VASI Microbot to the Vancouver Physical AI Workshop",
    body: "Demoed our in-house robot at the workshop hosted by Voxel51: a small machine standing in for a much bigger system.",
  },
  {
    date: "May 2026",
    title: "Moved VASI's autonomy from classical navigation to reinforcement learning",
    body: "Stepping back from the navigation stack that got us here, and investing in RL training, policy evaluation, and production integration.",
  },
  {
    date: "Apr 2026",
    title: "Ran NVIDIA Cosmos Reason 2B on an 8 GB Jetson Orin Nano Super",
    body: "Got a vision-language reasoning model launching cleanly on a memory-constrained edge device by stopping the desktop, disabling swap, and flushing the OS cache first.",
  },
  {
    date: "Mar 2026",
    title: "Opened Vancouver AI Meetup #27 with a live robot demo",
    body: "On stage at the H.R. MacMillan Space Centre for BC + AI, showing OpenClaw agents controlling a real autonomous robot through AgenticROS.",
  },
];

export const MISSION = {
  statement: "Making indoor spaces understandable to AI.",
  body: "Hospitals are some of the hardest buildings on earth for a machine to work in. I'm building the spatial intelligence that lets autonomous systems understand them, navigate them, and work alongside the people inside, starting with hospital logistics at VASI.",
  stages: [
    {
      num: "01",
      title: "Map",
      body: "Turn a building's floor plans into a live, routable model: every room, corridor, lift, door, and access rule.",
      proof: { label: "VASI spatial platform", href: "#vasi" },
    },
    {
      num: "02",
      title: "Understand",
      body: "Give machines reasoning about the space: vision-language models on edge hardware and policies learned through reinforcement learning.",
      proof: { label: "Field notes", href: "#notes" },
    },
    {
      num: "03",
      title: "Act",
      body: "Robots and agents that move through the building, take requests in plain language, and report what they see.",
      proof: { label: "AgenticROS & Microbot", href: "#agenticros" },
    },
  ],
};

const mail = (subject) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`;

/** Who I want to work with; each opens an email with the subject filled in. */
export const PARTNERS = [
  {
    who: "Hospitals & health authorities",
    body: "Autonomous logistics and indoor wayfinding for your facility, built on a live map of your building.",
    cta: "Talk about your facility",
    href: mail("Hospital partnership"),
  },
  {
    who: "Robotics & hardware companies",
    body: "Bring your robots onto VASI's spatial platform, or connect ROS 2 fleets to AI agents through AgenticROS.",
    cta: "Explore an integration",
    href: mail("Robotics integration"),
  },
  {
    who: "Research & academia",
    body: "Collaborate on reinforcement learning, spatial AI, and vision-language models running on edge hardware.",
    cta: "Propose a collaboration",
    href: mail("Research collaboration"),
  },
  {
    who: "Investors & programs",
    body: "VASI is part of the Google for Startups Cloud Program and NVIDIA Inception. Happy to share where we're headed.",
    cta: "Start a conversation",
    href: mail("VASI investment conversation"),
  },
  {
    who: "Events & communities",
    body: "Talks and live robot demos on agentic AI, ROS 2, and physical AI, like the BC + AI meetup opener.",
    cta: "Invite me to speak",
    href: mail("Speaking invitation"),
  },
];

export const BACKERS = [
  { name: "Google for Startups Cloud Program", src: "/img/backer-google.webp" },
  { name: "NVIDIA Inception Program", src: "/img/backer-nvidia.webp" },
];
