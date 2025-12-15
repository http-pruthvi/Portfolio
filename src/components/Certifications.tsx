import { motion } from "framer-motion";
import { Award, Filter, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Certification {
    name: string;
    issuer: string;
    category: "AI/ML" | "Cloud" | "Software" | "Other";
    year: string;
    url?: string;
}

const certifications: Certification[] = [
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

const Certifications = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", "AI/ML", "Cloud", "Software", "Other"];

    const filteredCerts = selectedCategory === "All"
        ? certifications
        : certifications.filter(cert => cert.category === selectedCategory);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "AI/ML": return "from-purple-500 to-pink-500";
            case "Cloud": return "from-cyan-500 to-blue-500";
            case "Software": return "from-green-500 to-emerald-500";
            case "Other": return "from-orange-500 to-yellow-500";
            default: return "from-neutral-500 to-neutral-600";
        }
    };

    const CertCard = ({ cert, index }: { cert: Certification; index: number }) => {
        const CardContent = (
            <>
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getCategoryColor(cert.category)} text-white`}>
                        {cert.category}
                    </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="text-cyan-400" size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 pr-20 group-hover:text-cyan-400 transition-colors">
                    {cert.name}
                </h3>
                <p className="text-neutral-400 text-sm mb-3">{cert.issuer}</p>
                <div className="flex items-center justify-between">
                    <p className="text-neutral-500 text-xs">{cert.year}</p>
                    {cert.url && (
                        <ExternalLink className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                    )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </>
        );

        const baseClasses = "group bg-neutral-900/50 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 relative overflow-hidden";

        return (
            <motion.div
                key={`${cert.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
            >
                {cert.url ? (
                    <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${baseClasses} block cursor-pointer`}
                    >
                        {CardContent}
                    </a>
                ) : (
                    <div className={baseClasses}>
                        {CardContent}
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <section id="certifications" className="py-20 bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
                        Certifications & Credentials
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Continuously learning and validating expertise across AI, Cloud, and Software Engineering
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <Filter className="text-cyan-400 mt-2" size={20} />
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCerts.map((cert, index) => (
                        <CertCard key={`${cert.name}-${index}`} cert={cert} index={index} />
                    ))}
                </div>

                {/* Stats Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-500/20">
                        <Award className="text-cyan-400" size={20} />
                        <span className="text-white font-semibold">
                            {certifications.length} Professional Certifications • Click to verify
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
