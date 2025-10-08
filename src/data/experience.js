// Experience data with timeline information
export const experienceData = [
    {
        id: "flutter-developer-intern",
        title: "Flutter Developer Intern",
        role: "Flutter Developer Intern",
        company: "Unikodex",
        type: "professional",
        description: "Worked on building cross-platform mobile applications using Flutter and Dart. Implemented responsive UI, integrated Firebase backend services, and collaborated in agile development sprints.",
        techStack: ["Flutter", "Dart", "Firebase", "Git"],
        startDate: "2025-06",
        endDate: "2025-08",
        achievements: [
            "Built cross-platform mobile applications using Flutter",
            "Integrated Firebase backend services for real-time data",
            "Collaborated effectively in agile development sprints"
        ]
    },
    {
        id: "ai-plant-disease-exp",
        title: "AI Plant Disease Detection & Solution",
        role: "Lead Developer",
        type: "personal",
        description: "Developed a comprehensive machine learning system for plant disease detection using computer vision and deep learning techniques. Implemented image preprocessing, model training, and web interface for farmers.",
        techStack: ["Python", "TensorFlow", "OpenCV", "Flask", "Machine Learning"],
        startDate: "2024-01",
        endDate: "2024-04",
        achievements: [
            "Achieved 94% accuracy in disease detection across 15 plant species",
            "Built user-friendly web interface for farmers",
            "Integrated treatment recommendation system"
        ]
    },
    {
        id: "blockchain-trading-exp",
        title: "Blockchain Decentralized Trading Platform",
        role: "Blockchain Developer",
        type: "personal",
        description: "Architected and developed a decentralized trading platform on Ethereum blockchain with smart contracts for secure and transparent trading operations.",
        techStack: ["Solidity", "Ethereum", "Web3.js", "React", "Smart Contracts"],
        startDate: "2023-09",
        endDate: "2024-01",
        achievements: [
            "Deployed smart contracts with zero security vulnerabilities",
            "Implemented automated market making algorithms",
            "Built responsive React frontend for trading interface"
        ]
    },
    {
        id: "custom-os-exp",
        title: "Custom OS with AI Capabilities",
        role: "Systems Developer",
        type: "personal",
        description: "Currently developing a custom operating system from scratch with integrated AI capabilities for intelligent resource management and adaptive user interfaces.",
        techStack: ["C/C++", "Python", "Linux Kernel", "AI APIs", "Assembly"],
        startDate: "2024-05",
        endDate: null,
        achievements: [
            "Implemented basic kernel with memory management",
            "Integrated AI-powered process scheduling",
            "Developing adaptive UI system"
        ]
    },
    {
        id: "astra-assistant-exp",
        title: "Astra – Smart AI Assistant",
        role: "AI Developer",
        type: "personal",
        description: "Created an intelligent virtual assistant using natural language processing and OpenAI API with context understanding and personalized response capabilities.",
        techStack: ["Python", "NLP", "OpenAI API", "Machine Learning"],
        startDate: "2023-06",
        endDate: "2023-09",
        achievements: [
            "Implemented context-aware conversation system",
            "Achieved 89% user satisfaction in beta testing",
            "Built modular architecture for easy feature expansion"
        ]
    },
    {
        id: "ocean-fisheries-exp",
        title: "Ocean Fisheries Management System",
        role: "Data Scientist",
        type: "academic",
        description: "Developed AI-powered system for sustainable fisheries management using IoT sensors and machine learning for fish population monitoring and migration prediction.",
        techStack: ["Python", "Machine Learning", "IoT", "Data Analytics", "GIS"],
        startDate: "2023-02",
        endDate: "2023-06",
        achievements: [
            "Improved fish population prediction accuracy by 78%",
            "Integrated real-time IoT sensor data processing",
            "Created comprehensive analytics dashboard"
        ]
    },
    {
        id: "disaster-management-exp",
        title: "Disaster Management System",
        role: "ML Engineer",
        type: "academic",
        description: "Built machine learning-based disaster management system for prediction, early warning, and response coordination using GIS data and real-time monitoring.",
        techStack: ["Python", "Machine Learning", "GIS", "Data Visualization"],
        startDate: "2022-10",
        endDate: "2023-02",
        achievements: [
            "Developed early warning system with 85% accuracy",
            "Integrated multiple data sources for comprehensive analysis",
            "Created real-time monitoring dashboard"
        ]
    }
];

// Helper functions for experience data
export const getExperienceByType = (type) => {
    return experienceData.filter(exp => exp.type === type);
};

export const getCurrentExperience = () => {
    return experienceData.filter(exp => exp.endDate === null);
};

export const getExperienceByTech = (tech) => {
    return experienceData.filter(exp =>
        exp.techStack.some(stack =>
            stack.toLowerCase().includes(tech.toLowerCase())
        )
    );
};

export const getSortedExperience = () => {
    return experienceData.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA; // Most recent first
    });
};