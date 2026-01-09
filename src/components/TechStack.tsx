import { motion } from "framer-motion";
import { useState } from "react";
import { techStack } from "@/data/techStack";

// Full Tech Stack with HTML5, CSS3, Game Dev, etc.


const categories = ["All", "Frontend", "Backend", "Mobile", "Data Science", "Database", "DevOps", "Cloud", "Cybersecurity", "Game Dev"];

const TechStack = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const filteredTech = selectedCategory === "All"
        ? techStack
        : techStack.filter(tech => tech.category === selectedCategory);

    return (
        <section id="tech-stack" className="py-[89px] bg-transparent relative overflow-hidden">
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
                                : "bg-black/20 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800 backdrop-blur-sm"
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
                                    className="relative rounded-2xl p-[21px] transition-all duration-300 cursor-pointer"
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
