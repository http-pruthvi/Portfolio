import { motion } from "framer-motion";
import { useState } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiAngular,
    SiVuedotjs,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiExpress,
    SiSpringboot,
    SiPython,
    SiDjango,
    SiFastapi,
    SiGo,
    SiDotnet,
    SiRust,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiGit,
    SiDocker,
    SiKubernetes,
    SiAmazon,
    SiGooglecloud,
    SiAndroid,
    SiKotlin,
    SiFirebase,
    SiSwift,
    SiFlutter,
    SiDart,
    SiNumpy,
    SiPandas,
    SiScikitlearn,
    SiTensorflow,
    SiPytorch,
    SiApacheairflow,
    SiLinux,
    SiJenkins,
    SiTerraform,
    SiAnsible,
    SiUnity,
    SiUnrealengine,
    SiBlender,
    SiWireshark,
    SiKalilinux,
    SiSplunk,
} from "react-icons/si";

interface TechItem {
    name: string;
    icon: any;
    color: string;
    proficiency: number;
    category: string;
}

// Full Tech Stack with HTML5, CSS3, Game Dev, etc.
const techStack: TechItem[] = [
    // Frontend
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", proficiency: 95, category: "Frontend" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6", proficiency: 95, category: "Frontend" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", proficiency: 90, category: "Frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", proficiency: 85, category: "Frontend" },
    { name: "React", icon: SiReact, color: "#61DAFB", proficiency: 90, category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", proficiency: 85, category: "Frontend" },
    { name: "Angular", icon: SiAngular, color: "#DD0031", proficiency: 75, category: "Frontend" },
    { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", proficiency: 70, category: "Frontend" },

    // Backend
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", proficiency: 85, category: "Backend" },
    { name: "Express", icon: SiExpress, color: "#000000", proficiency: 85, category: "Backend" },
    { name: "Java", icon: SiSpringboot, color: "#6DB33F", proficiency: 80, category: "Backend" },
    { name: "Python", icon: SiPython, color: "#3776AB", proficiency: 92, category: "Backend" },
    { name: "Django", icon: SiDjango, color: "#092E20", proficiency: 85, category: "Backend" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688", proficiency: 80, category: "Backend" },
    { name: "Go", icon: SiGo, color: "#00ADD8", proficiency: 75, category: "Backend" },
    { name: ".NET Core", icon: SiDotnet, color: "#512BD4", proficiency: 70, category: "Backend" },
    { name: "Rust", icon: SiRust, color: "#000000", proficiency: 60, category: "Backend" },

    // Mobile
    { name: "Android", icon: SiAndroid, color: "#3DDC84", proficiency: 85, category: "Mobile" },
    { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", proficiency: 80, category: "Mobile" },
    { name: "Swift", icon: SiSwift, color: "#F05138", proficiency: 70, category: "Mobile" },
    { name: "Flutter", icon: SiFlutter, color: "#02569B", proficiency: 90, category: "Mobile" },
    { name: "Dart", icon: SiDart, color: "#0175C2", proficiency: 90, category: "Mobile" },

    // Database
    { name: "MySQL", icon: SiMysql, color: "#4479A1", proficiency: 85, category: "Database" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", proficiency: 80, category: "Database" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", proficiency: 85, category: "Database" },
    { name: "Redis", icon: SiRedis, color: "#DC382D", proficiency: 75, category: "Database" },

    // AI/ML & Data
    { name: "NumPy", icon: SiNumpy, color: "#013243", proficiency: 90, category: "Data Science" },
    { name: "Pandas", icon: SiPandas, color: "#150458", proficiency: 90, category: "Data Science" },
    { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E", proficiency: 85, category: "Data Science" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", proficiency: 82, category: "Data Science" },
    { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", proficiency: 80, category: "Data Science" },
    { name: "PowerBI", icon: SiApacheairflow, color: "#F2C811", proficiency: 75, category: "Data Science" },
    { name: "Airflow", icon: SiApacheairflow, color: "#017CEE", proficiency: 70, category: "Data Science" },

    // DevOps & Cloud
    { name: "Linux", icon: SiLinux, color: "#FCC624", proficiency: 85, category: "DevOps" },
    { name: "Git", icon: SiGit, color: "#F05032", proficiency: 90, category: "DevOps" },
    { name: "Docker", icon: SiDocker, color: "#2496ED", proficiency: 80, category: "DevOps" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", proficiency: 70, category: "DevOps" },
    { name: "Jenkins", icon: SiJenkins, color: "#D24939", proficiency: 70, category: "DevOps" },
    { name: "Terraform", icon: SiTerraform, color: "#7B42BC", proficiency: 65, category: "DevOps" },
    { name: "Ansible", icon: SiAnsible, color: "#EE0000", proficiency: 65, category: "DevOps" },
    { name: "AWS", icon: SiAmazon, color: "#FF9900", proficiency: 75, category: "Cloud" },
    { name: "Azure", icon: SiLinux, color: "#007FFF", proficiency: 70, category: "Cloud" },
    { name: "GCP", icon: SiGooglecloud, color: "#4285F4", proficiency: 70, category: "Cloud" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", proficiency: 85, category: "Cloud" },

    // Cybersecurity
    { name: "Kali Linux", icon: SiKalilinux, color: "#557C94", proficiency: 80, category: "Cybersecurity" },
    { name: "Wireshark", icon: SiWireshark, color: "#1679A7", proficiency: 75, category: "Cybersecurity" },
    { name: "Splunk", icon: SiSplunk, color: "#000000", proficiency: 65, category: "Cybersecurity" },

    // Game Dev
    { name: "Unity", icon: SiUnity, color: "#000000", proficiency: 75, category: "Game Dev" },
    { name: "Unreal", icon: SiUnrealengine, color: "#0E1128", proficiency: 70, category: "Game Dev" },
    { name: "Blender", icon: SiBlender, color: "#E87D0D", proficiency: 60, category: "Game Dev" },
];

const categories = ["All", "Frontend", "Backend", "Mobile", "Data Science", "Database", "DevOps", "Cloud", "Cybersecurity", "Game Dev"];

const TechStack = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const filteredTech = selectedCategory === "All"
        ? techStack
        : techStack.filter(tech => tech.category === selectedCategory);

    return (
        <section id="tech-stack" className="py-[89px] bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-[55px]"
                >
                    <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-[21px]">
                        Tech Stack
                    </h2>
                    <p className="text-neutral-400 text-[16px] max-w-2xl mx-auto">
                        Technologies I work with to build innovative solutions
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-[13px] mb-[55px]"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-[21px] py-[13px] rounded-full text-[14px] font-semibold transition-all duration-300 ${selectedCategory === category
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50"
                                : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[21px]">
                    {filteredTech.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => setHoveredTech(tech.name)}
                                onMouseLeave={() => setHoveredTech(null)}
                                className="relative group"
                            >
                                {/* 3D Card Effect */}
                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                        rotateY: 5,
                                        rotateX: 5,
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-[21px] border border-neutral-700 hover:border-neutral-600 transition-all duration-300 cursor-pointer"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        perspective: "1000px",
                                    }}
                                >
                                    {/* Glow Effect */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                                        style={{
                                            background: `radial-gradient(circle at center, ${tech.color}40, transparent 70%)`,
                                        }}
                                    />

                                    {/* Icon */}
                                    <div className="relative flex flex-col items-center gap-[13px]">
                                        <Icon
                                            className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
                                            style={{ color: tech.color }}
                                        />
                                        <span className="text-white text-[14px] font-semibold text-center">
                                            {tech.name}
                                        </span>

                                        {/* Proficiency Bar */}
                                        {hoveredTech === tech.name && (
                                            <motion.div
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "100%" }}
                                                className="w-full"
                                            >
                                                <div className="text-[12px] text-neutral-400 mb-1 text-center">
                                                    {tech.proficiency}%
                                                </div>
                                                <div className="w-full h-1 bg-neutral-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${tech.proficiency}%` }}
                                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                                        className="h-full rounded-full"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${tech.color}, ${tech.color}dd)`,
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
