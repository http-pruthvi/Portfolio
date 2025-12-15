import { Spotlight } from "@/components/ui/Spotlight";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import Profile3D from "@/components/Profile3D";

const Hero = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Particle Background */}
            <ParticleBackground />

            {/* Spotlight Effect */}
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                {/* Balanced Grid: 1.618 : 1 : 1.618 (text gets golden ratio, image is smaller) */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr_1.618fr] items-center gap-8 lg:gap-[34px]">

                    {/* LEFT TEXT - AI Engineer (Logical/Technical) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-right"
                    >
                        <h2 className="text-[42px] md:text-[52px] lg:text-[68px] font-bold text-white mb-[21px] font-mono leading-tight">
                            &lt;engineer/&gt;
                        </h2>
                        <p className="text-neutral-400 text-[16px] leading-[26px]">
                            Machine learning enthusiast who creates intelligent systems with clean, elegant code
                        </p>
                    </motion.div>

                    {/* CENTER IMAGE with True 3D Model */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex-shrink-0 mx-auto w-full max-w-[400px] h-[400px]"
                    >
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-yellow-500/10 blur-3xl pointer-events-none"></div>

                        {/* React Three Fiber 3D Scene */}
                        <Profile3D />
                    </motion.div>

                    {/* RIGHT TEXT - Designer (Creative) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <h2 className="text-[42px] md:text-[52px] lg:text-[68px] font-bold text-white mb-[21px] leading-tight">
                            designer
                        </h2>
                        <p className="text-neutral-400 text-[16px] leading-[26px]">
                            Creative problem solver who crafts beautiful, intuitive experiences with attention to detail
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Section - Spaced using Fibonacci */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-[89px]"
                >
                    <div className="text-[20px] md:text-[26px] text-neutral-400 mb-[55px] h-[34px]">
                        <TypeAnimation
                            sequence={[
                                "Bridging design and engineering",
                                2000,
                                "Building the future with code",
                                2000,
                                "Creating intelligent solutions",
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-[21px]">
                        <a
                            href="#projects"
                            className="px-[34px] py-[21px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold transition duration-200 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center gap-[13px] text-[16px]"
                        >
                            View Work <ArrowRight size={18} />
                        </a>
                        <Link
                            to="/resume"
                            className="px-[34px] py-[21px] rounded-full border-2 border-neutral-700 text-neutral-300 font-semibold transition duration-200 hover:bg-neutral-800 hover:border-neutral-600 flex items-center gap-[13px] text-[16px]"
                        >
                            Resume <FileText size={18} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
