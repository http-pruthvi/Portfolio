import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import TechStack from "@/components/TechStack";
import SkillRadar from "@/components/SkillRadar";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GitHubStats from "@/components/GitHubStats";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import ScrollIndicator from "@/components/ScrollIndicator";
import PlayerStats from "@/components/ui/PlayerStats";
import ParticleBackground from "@/components/ui/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { GameProvider } from "@/context/GameContext";

import Certifications from "@/components/Certifications"; // Restored import

// Spine Components
import { SpineProvider } from "@/components/spine/SpineContext";
import SpineLayout from "@/components/spine/SpineLayout";
import SectionWrapper from "@/components/spine/SectionWrapper";
import CyberOverlay from "@/components/ui/CyberOverlay";

import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useGame } from "@/context/GameContext";
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';



const ImmersiveContent = () => {
    const konamiSuccess = useKonamiCode();
    const { gameActive } = useGame();
    useSoundEffects();

    useEffect(() => {
        if (konamiSuccess) {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                const particleCount = 50 * (timeLeft / duration);

                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }, [konamiSuccess]);


    const [warp, setWarp] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") setWarp(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === "Space") setWarp(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    if (gameActive) {
        return (
            <>
                <Navbar />
                <PlayerStats />
            </>
        );
    }

    return (
        <div className={`relative text-white selection:bg-cyan-500/30 cursor-none transition-all duration-300 ${warp ? 'tracking-[2em]' : ''}`}>
            <ParticleBackground warp={warp} />
            <CustomCursor />
            <ScrollProgress />

            <SpineProvider totalSections={7}>
                <SpineLayout>
                    <CyberOverlay />
                    <Navbar />
                    <PlayerStats />

                    <SectionWrapper index={0} id="home" fullWidth>
                        <Hero />
                    </SectionWrapper>

                    <SectionWrapper index={1} id="about">
                        <About />
                    </SectionWrapper>

                    <SectionWrapper index={2} id="skills">
                        <div className="space-y-12">
                            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                                <div className="w-full lg:w-1/2">
                                    <Skills />
                                </div>
                                <div className="w-full lg:w-1/2 flex justify-center">
                                    <SkillRadar />
                                </div>
                            </div>
                            <TechStack />
                            <Certifications />
                        </div>
                    </SectionWrapper>

                    <SectionWrapper index={3} id="projects">
                        <Projects />
                    </SectionWrapper>

                    <SectionWrapper index={4}>
                        <GitHubStats />
                    </SectionWrapper>

                    <SectionWrapper index={5} id="resume">
                        <div className="space-y-12">
                            <ResumeSection />
                            <Experience />
                        </div>
                    </SectionWrapper>

                    <SectionWrapper index={6} id="contact">
                        <Contact />
                    </SectionWrapper>

                    <ScrollIndicator />
                </SpineLayout>
            </SpineProvider>
        </div>
    );
};

const ImmersiveHome = () => {
    return (
        <GameProvider>
            <ImmersiveContent />
        </GameProvider>
    );
};

export default ImmersiveHome;
