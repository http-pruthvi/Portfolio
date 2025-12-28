import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import Resume from "@/components/Resume";
import Certifications from "@/components/Certifications";
import ScrollIndicator from "@/components/ScrollIndicator";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import ParticleBackground from "@/components/ui/ParticleBackground";
import useSoundEffects from "@/hooks/useSoundEffects";

// Spine Components
import { SpineProvider } from "@/components/spine/SpineContext";
import SpineLayout from "@/components/spine/SpineLayout";
import SectionWrapper from "@/components/spine/SectionWrapper";
import CyberOverlay from "@/components/ui/CyberOverlay";

import PlayerStats from "@/components/ui/PlayerStats";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { GameProvider, useGame } from "@/context/GameContext";
const Home = () => {
  useKonamiCode(); // Activate Easter Egg listener
  const { gameActive } = useGame();

  if (gameActive) {
    return (
      <>
        <Navbar />
        <PlayerStats />
      </>
    );
  }

  return (
    <SpineProvider totalSections={7}>
      <SpineLayout>
        <CyberOverlay />
        <Navbar />
        <PlayerStats /> {/* HUD Added */}

        <SectionWrapper index={0} id="home" fullWidth>
          <Hero />
        </SectionWrapper>

        <SectionWrapper index={1} id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper index={2} id="skills">
          <div className="space-y-12">
            {/* <Skills /> We have enough visual data now, can optionally hide this text list */}
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
      </SpineLayout >
    </SpineProvider >
  );
};

function App() {
  useSoundEffects(); // Initialize global UI sounds
  return (
    <GameProvider>
      <Router>
        <main className="text-white antialiased selection:bg-cyan-500/30">
          <ParticleBackground />
          <CustomCursor />
          <ScrollProgress />
          <Toaster position="bottom-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
      </Router>
    </GameProvider>
  );
}

export default App;
