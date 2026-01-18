import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


// Pages
import ChooseYourBios from "@/pages/ChooseYourBios";
import RTXOn from "@/pages/RTXOn";
import BlueScreenOfDeath from "@/pages/BlueScreenOfDeath";
import CssCrimes from "@/pages/CssCrimes";
import SudoRmRf from "@/pages/SudoRmRf";
import Redacted from "@/pages/Redacted";

import Resume from "@/components/Resume";


import StyleSwitcher from "@/components/StyleSwitcher";

function App() {
  return (
    <Router>
      <main className="antialiased font-sans">
        <Toaster position="bottom-right" />
        <StyleSwitcher />
        <Routes>
          {/* Route for the "Choose Your Bios" screen */}
          <Route path="/" element={<ChooseYourBios />} />
          <Route path="/immersive" element={<RTXOn />} />
          <Route path="/minimal" element={<BlueScreenOfDeath />} />
          <Route path="/brutal" element={<CssCrimes />} />
          <Route path="/terminal" element={<SudoRmRf />} />
          <Route path="/editorial" element={<Redacted />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
