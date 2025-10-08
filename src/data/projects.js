// Projects data with complete information for all 12 specified projects
export const projectsData = [
  {
    id: "ai-plant-disease",
    title: "AI Plant Disease Detection & Solution",
    description: "Advanced machine learning system that identifies plant diseases from images and provides comprehensive treatment recommendations. Uses computer vision and deep learning to help farmers and gardeners maintain healthy crops.",
    techStack: ["Python", "TensorFlow", "OpenCV", "Flask"],
    category: "AI/ML",
    featured: true,
    type: "personal",
    status: "completed",
    image: "/images/projects/plant-disease.jpg",
    githubUrl: "https://github.com/http-pruthvi/ai-plant-disease",
    liveUrl: null
  },
  {
    id: "astra-ai-assistant",
    title: "Astra – Smart AI Assistant",
    description: "Intelligent virtual assistant powered by natural language processing and OpenAI API. Capable of understanding context, providing personalized responses, and learning from user interactions.",
    techStack: ["Python", "NLP", "OpenAI API"],
    category: "AI/ML",
    featured: true,
    type: "personal",
    status: "completed",
    image: "/images/projects/astra-assistant.jpg",
    githubUrl: "https://github.com/http-pruthvi/astra-ai-assistant",
    liveUrl: null
  },
  {
    id: "blockchain-trading-platform",
    title: "Blockchain Decentralized Trading Platform",
    description: "Decentralized trading platform built on Ethereum blockchain with smart contracts for secure, transparent trading. Features automated market making and liquidity pools.",
    techStack: ["Solidity", "Ethereum", "Web3.js", "React"],
    category: "Blockchain",
    featured: true,
    type: "personal",
    status: "completed",
    image: "/images/projects/blockchain-trading.jpg",
    githubUrl: "https://github.com/http-pruthvi/blockchain-trading-platform",
    liveUrl: null
  },
  {
    id: "quantum-chess",
    title: "Quantum Chess Game",
    description: "Revolutionary chess variant that incorporates quantum mechanics principles. Pieces can exist in superposition states and exhibit quantum entanglement, creating unique strategic possibilities.",
    techStack: ["Python", "Qiskit", "Pygame"],
    category: "Game Development",
    featured: false,
    type: "personal",
    status: "completed",
    image: "/images/projects/quantum-chess.jpg",
    githubUrl: "https://github.com/http-pruthvi/quantum-chess",
    liveUrl: null
  },
  {
    id: "guru-virtual-assistant",
    title: "Guru – Virtual Assistant",
    description: "Comprehensive virtual assistant with AI/ML capabilities for task automation, scheduling, and intelligent conversation. Integrates with multiple APIs for enhanced functionality.",
    techStack: ["Python", "AI/ML", "OpenAI API"],
    category: "AI/ML",
    featured: false,
    type: "personal",
    status: "completed",
    image: "/images/projects/guru-assistant.jpg",
    githubUrl: "https://github.com/http-pruthvi/guru-virtual-assistant",
    liveUrl: null
  },
  {
    id: "itobound-dating-app",
    title: "Itobound – Dating App",
    description: "Modern dating application built with Flutter for cross-platform compatibility. Features real-time messaging, advanced matching algorithms, and secure user authentication.",
    techStack: ["Flutter", "Dart", "Firebase"],
    category: "Mobile Development",
    featured: false,
    type: "personal",
    status: "completed",
    image: "/images/projects/itobound-app.jpg",
    githubUrl: "https://github.com/http-pruthvi/itobound-dating-app",
    liveUrl: null
  },
  {
    id: "custom-os-ai",
    title: "Custom OS with AI Capabilities",
    description: "Custom operating system built from scratch with integrated AI capabilities. Features kernel-level AI processing, intelligent resource management, and adaptive user interfaces.",
    techStack: ["C/C++", "Python", "Linux Kernel", "AI APIs"],
    category: "Systems Programming",
    featured: true,
    type: "personal",
    status: "in-progress",
    image: "/images/projects/custom-os.jpg",
    githubUrl: "https://github.com/http-pruthvi/custom-os-ai",
    liveUrl: null
  },
  {
    id: "carbon-credits-management",
    title: "Carbon Credits Management Project",
    description: "Comprehensive system for tracking, managing, and trading carbon credits. Features data visualization, analytics dashboard, and automated reporting for environmental compliance.",
    techStack: ["Python", "SQL", "Data Visualization"],
    category: "Environmental Tech",
    featured: false,
    type: "academic",
    status: "completed",
    image: "/images/projects/carbon-credits.jpg",
    githubUrl: "https://github.com/http-pruthvi/carbon-credits-management",
    liveUrl: null
  },
  {
    id: "ocean-fisheries-management",
    title: "Ocean Fisheries Management System with AI",
    description: "AI-powered system for sustainable fisheries management using IoT sensors and machine learning. Monitors fish populations, predicts migration patterns, and optimizes fishing strategies.",
    techStack: ["Python", "ML", "IoT", "Data Analytics"],
    category: "Environmental Tech",
    featured: false,
    type: "academic",
    status: "completed",
    image: "/images/projects/ocean-fisheries.jpg",
    githubUrl: "https://github.com/http-pruthvi/ocean-fisheries-ai",
    liveUrl: null
  },
  {
    id: "student-career-guidance-bot",
    title: "Student Career Guidance AI Bot",
    description: "Intelligent chatbot that provides personalized career guidance to students. Uses NLP and AI to analyze student profiles, interests, and market trends to suggest optimal career paths.",
    techStack: ["Python", "NLP", "AI"],
    category: "AI/ML",
    featured: false,
    type: "academic",
    status: "completed",
    image: "/images/projects/career-guidance-bot.jpg",
    githubUrl: "https://github.com/http-pruthvi/student-career-guidance-bot",
    liveUrl: null
  },
  {
    id: "disaster-management-system",
    title: "Disaster Management Project",
    description: "Machine learning-based disaster management system for prediction, early warning, and response coordination. Integrates GIS data and real-time monitoring for comprehensive disaster preparedness.",
    techStack: ["Python", "ML", "GIS"],
    category: "Emergency Systems",
    featured: false,
    type: "academic",
    status: "completed",
    image: "/images/projects/disaster-management.jpg",
    githubUrl: "https://github.com/http-pruthvi/disaster-management-ml",
    liveUrl: null
  }
];

// Helper functions for project data manipulation
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => project.category === category);
};

export const getProjectsByTech = (tech) => {
  return projectsData.filter(project => 
    project.techStack.some(stack => 
      stack.toLowerCase().includes(tech.toLowerCase())
    )
  );
};

export const getProjectsByType = (type) => {
  return projectsData.filter(project => project.type === type);
};

export const getProjectCategories = () => {
  return [...new Set(projectsData.map(project => project.category))];
};

export const getAllTechStack = () => {
  const allTech = projectsData.flatMap(project => project.techStack);
  return [...new Set(allTech)];
};