import { motion } from "framer-motion";
import { Download, ExternalLink, Award, Briefcase, GraduationCap, Code } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeSection = () => {
    return (
        <section id="resume" className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
                        Professional Resume
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
                        ATS-optimized resume showcasing my skills, experience, and achievements
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/resume"
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                        >
                            <ExternalLink size={20} />
                            View Full Resume
                        </Link>
                        <a
                            href="/resume.md"
                            download="Pruthviraj_Phuse_Resume.md"
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold border border-white/10 hover:border-cyan-500/50 transition-all"
                        >
                            <Download size={20} />
                            Download Resume
                        </a>
                    </div>
                </motion.div>

                {/* Resume Highlights Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Professional Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                            <Briefcase className="text-cyan-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Experience</h3>
                        <p className="text-neutral-400 text-sm">
                            Flutter Developer Intern at UNIKODEX, building production mobile apps
                        </p>
                    </motion.div>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                            <GraduationCap className="text-purple-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Education</h3>
                        <p className="text-neutral-400 text-sm">
                            B.Tech in Computer Science & Engineering (2023-2027)
                        </p>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                            <Code className="text-green-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Tech Stack</h3>
                        <p className="text-neutral-400 text-sm">
                            React, Flutter, Python, Node.js, AI/ML, Cloud Computing
                        </p>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-6 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                            <Award className="text-orange-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Certifications</h3>
                        <p className="text-neutral-400 text-sm">
                            22+ professional certifications in AI/ML, Cloud, and Development
                        </p>
                    </motion.div>
                </div>

                {/* Key Highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Key Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-cyan-400 font-semibold mb-3">Professional Summary</h4>
                            <p className="text-neutral-300 text-sm leading-relaxed">
                                Results-driven Computer Engineering student with expertise in Full-Stack Development, AI/ML, and Cloud Computing.
                                Proven track record of building scalable applications using React, Flutter, Python, and modern cloud technologies.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-purple-400 font-semibold mb-3">Core Competencies</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Full-Stack Development', 'AI/ML Engineering', 'Cloud Architecture', 'Mobile Development', 'Agile Methodologies'].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Projects Highlight */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="text-green-400 font-semibold mb-3">Featured Projects</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                                <h5 className="text-white font-semibold text-sm mb-1">AI Plant Disease Detection</h5>
                                <p className="text-neutral-400 text-xs">94% accuracy using CNN & TensorFlow</p>
                            </div>
                            <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                                <h5 className="text-white font-semibold text-sm mb-1">ASTRA AI Assistant</h5>
                                <p className="text-neutral-400 text-xs">Voice-activated with 85% intent accuracy</p>
                            </div>
                            <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                                <h5 className="text-white font-semibold text-sm mb-1">ItoBound Dating App</h5>
                                <p className="text-neutral-400 text-xs">AI-powered matching with Flutter</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResumeSection;
