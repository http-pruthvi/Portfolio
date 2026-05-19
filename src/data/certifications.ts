export interface Certification {
    name: string;
    issuer: string;
    category: "AI/ML" | "Cloud" | "Software" | "Other";
    year: string;
    url?: string;
}

const LINKEDIN_CERTS = "https://www.linkedin.com/in/pruthviraj-phuse-aa0513324/details/certifications/";

export const certifications: Certification[] = [
    // April 2026
    { name: "Create Your First Gemini Enterprise Application", issuer: "Google", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Claude in Amazon Bedrock", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Claude with Google Cloud's Vertex AI", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: AI Fluency for nonprofits", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: AI Capabilities and Limitations", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: Teaching the AI Fluency Framework", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: Introduction to agent skills", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: Introduction to subagents", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: AI Fluency for educators", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: AI Fluency for students", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Introduction to Model Context Protocol", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", category: "AI/ML", year: "Apr 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of Participation in Round 1: Executive Summary Submission of EY Techathon 6.0", issuer: "Unstop", category: "Other", year: "Apr 2026", url: "https://unstop.com/certificate-preview/3bcb43fb-e922-44cd-a05e-d3e1c271f0e2" },

    // March 2026
    { name: "AWS AI & ML Scholars - 2026 Challenge Completion", issuer: "Udacity", category: "AI/ML", year: "Mar 2026", url: LINKEDIN_CERTS },
    { name: "AWS AI Practitioner Challenge", issuer: "Udacity", category: "AI/ML", year: "Mar 2026", url: LINKEDIN_CERTS },
    { name: "Building with the Claude API", issuer: "Anthropic", category: "AI/ML", year: "Mar 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: Introduction to Claude Cowork", issuer: "Anthropic", category: "AI/ML", year: "Mar 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of Completion: Al Fluency Framework & Foundations", issuer: "Anthropic", category: "AI/ML", year: "Mar 2026", url: LINKEDIN_CERTS },
    { name: "Certificate of completion: Claude 101", issuer: "Anthropic", category: "AI/ML", year: "Mar 2026", url: LINKEDIN_CERTS },
    { name: "Claude Code in Action", issuer: "Anthropic", category: "AI/ML", year: "Mar 2026", url: LINKEDIN_CERTS },

    // 2026
    { name: "Kestra Fundamentals", issuer: "Kestra", category: "Software", year: "2026", url: "https://academy.kestra.io/certificates/KB6CMEwR" },
    { name: "Machine Learning I", issuer: "Columbia+", category: "AI/ML", year: "2026", url: LINKEDIN_CERTS },
    { name: "Prompt Engineering & Programming with OpenAI", issuer: "Columbia+", category: "AI/ML", year: "2026", url: LINKEDIN_CERTS },
    { name: "India AI Impact Summit Buildathon", issuer: "HCL GUVI", category: "AI/ML", year: "2026", url: LINKEDIN_CERTS },

    // December 2025
    { name: "5-Day AI Agents Intensive Course with Google", issuer: "United Latino Students Association", category: "AI/ML", year: "Dec 2025", url: LINKEDIN_CERTS },
    { name: "Certificate of Participation in Decode To Conquer 6.0 : A Product Management Case Competition of 7 Lakes Fest 2025", issuer: "Unstop", category: "Other", year: "Dec 2025", url: "https://unstop.com/certificate-preview/e0e190a8-8406-40d2-bb89-9399330cc436" },

    // November 2025
    { name: "Generative AI with Vertex AI: Build a customer chatbot", issuer: "Coursera", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/TSSG7MKJ1HRF" },
    { name: "Intro to AI Engineering", issuer: "Scrimba", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/A796E43Z1MQQ" },
    { name: "Introduction to Networking", issuer: "NVIDIA", category: "Other", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/YEJOONRRQP1Z" },
    { name: "Introduction to Retrieval Augmented Generation (RAG)", issuer: "Duke University", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/YLEVZ5LMQKKB" },
    { name: "Open-source AI Models", issuer: "Scrimba", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/P3CN0D7JDEO0" },
    { name: "The Rise of Generative AI", issuer: "Board Infinity", category: "AI/ML", year: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/9OART5ISOC5E" },

    // October 2025
    { name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle", category: "AI/ML", year: "Oct 2025", url: LINKEDIN_CERTS },
    { name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional", issuer: "Oracle", category: "AI/ML", year: "Oct 2025", url: LINKEDIN_CERTS },

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
