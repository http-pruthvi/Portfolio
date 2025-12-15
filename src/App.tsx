import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GitHubStats from "@/components/GitHubStats";
import Certifications from "@/components/Certifications";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Resume from "@/components/Resume";
import AIChat from "@/components/AIChat";
import ScrollIndicator from "@/components/ScrollIndicator";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <TechStack />
    <GitHubStats />
    <Projects />
    <Certifications />
    <ResumeSection />
    <Experience />
    <Contact />
    <AIChat />
    <ScrollIndicator />
  </>
);

function App() {
  return (
    <Router>
      <main className="bg-black min-h-screen text-white antialiased selection:bg-cyan-500/30">
        <ScrollProgress />
        <BackToTop />
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
