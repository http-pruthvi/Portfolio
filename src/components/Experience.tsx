import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

import { experience } from "@/data/experience";

const Experience = () => {
    return (
        <section id="experience" className="py-20 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    Experience & Education
                </h2>

                <div className="relative space-y-12">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500 opacity-20 md:-translate-x-1/2" />

                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Icon */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-[17px] md:-translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-cyan-500 flex items-center justify-center z-10">
                                {item.type === "work" ? (
                                    <Briefcase size={16} className="text-cyan-400" />
                                ) : (
                                    <GraduationCap size={16} className="text-purple-400" />
                                )}
                            </div>

                            {/* Content Card */}
                            <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                                <div className="bg-neutral-900/50 p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors">
                                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/5 text-neutral-400 mb-2">
                                        {item.period}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                                    <p className="text-cyan-400 text-sm mb-3">{item.company}</p>
                                    <p className="text-neutral-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
