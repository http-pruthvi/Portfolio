export interface Certification {
    name: string;
    issuer: string;
    category: "AI/ML" | "Cloud" | "Software" | "Other";
    year: string;
    url?: string;
}

export const certifications: Certification[] = [
    // November 2025
    { name: "Generative AI with Vertex AI: Build a customer chatbot", issuer: "Coursera", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/TSSG7MKJ1HRF" },
    { name: "Intro to AI Engineering", issuer: "Scrimba", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/A796E43Z1MQQ" },
    { name: "Introduction to Networking", issuer: "NVIDIA", category: "Other", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/YEJOONRRQP1Z" },
    { name: "Introduction to Retrieval Augmented Generation (RAG)", issuer: "Duke University", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/YLEVZ5LMQKKB" },
    { name: "Open-source AI Models", issuer: "Scrimba", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/P3CN0D7JDEO0" },
    { name: "The Rise of Generative AI", issuer: "Board Infinity", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/9OART5ISOC5E" },

    // October 2025
    { name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle", category: "AI/ML", year: "Oct 2025" },
    { name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional", issuer: "Oracle", category: "AI/ML", year: "Oct 2025" },

    // September 2025
    { name: "Foundations: Data, Data, Everywhere", issuer: "Google", category: "Other", year: "Sep 2025", url: "https://www.coursera.org/account/accomplishments/verify/37LYFSIDNWKO" },
    { name: "Full Stack Developer", issuer: "OneRoadmap", category: "Software", year: "Sep 2025", url: "https://oneroadmap.io/skills/fs/certificate/CERT-20258841" },
    { name: "Gen AI for developers: Web development with Python & Copilot", issuer: "Coursera Project Network", category: "AI/ML", year: "Sep 2025", url: "https://www.coursera.org/account/accomplishments/verify/C5F9RXLACQK5" },
    { name: "Getting Started with Git and GitHub", issuer: "IBM", category: "Software", year: "Sep 2025", url: "https://www.coursera.org/account/accomplishments/verify/DRKXF5YVQ2XE" },
    { name: "Introduction to Cloud Computing", issuer: "IBM", category: "Cloud", year: "Sep 2025", url: "https://www.coursera.org/account/accomplishments/verify/98YI4NOYVBGH" },
    { name: "Introduction to HTML, CSS, & JavaScript", issuer: "IBM", category: "Software", year: "Sep 2025", url: "https://www.coursera.org/account/accomplishments/verify/9TCYGSKB2XHE" },
    { name: "Introduction to Software Engineering", issuer: "IBM", category: "Software", year: "Sep 2025", url: "https://www.coursera.org/account/accomplishments/verify/MT9PEASZWDET" },
    { name: "Machine Learning with Python", issuer: "IBM", category: "AI/ML", year: "Sep 2025", url: "https://www.coursera.org/account/accomplishments/verify/P0G4NYVTZDWY" },

    // August 2025
    { name: "Deloitte Australia - Technology Job Simulation", issuer: "Forage", category: "Other", year: "Aug 2025", url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_icvytw4XyJ8ivT2dX_1755683832396_completion_certificate.pdf" },

    // June 2025
    { name: "Generative AI in HR - Impact and Application of Gen AI", issuer: "Board Infinity", category: "AI/ML", year: "Jun 2025", url: "https://www.coursera.org/account/accomplishments/verify/T2LHF92KHAET" },
    { name: "Introducing Generative AI with AWS", issuer: "Udacity", category: "AI/ML", year: "Jun 2025", url: "https://www.udacity.com/certificate/e/94d3db14-4f89-11f0-ad95-67343d71a7eb" },
    { name: "Leading Security Teams for GenAI Solutions: Generative AI Governance", issuer: "Skillsoft", category: "AI/ML", year: "Jun 2025", url: "https://skillsoft.digitalbadges.skillsoft.com/5892b941-e29f-487d-a85a-5ab4bc162406" },
];
