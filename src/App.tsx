import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


// Pages
import Welcome from "@/pages/Welcome";
import ImmersiveHome from "@/pages/ImmersiveHome";
import MinimalHome from "@/pages/MinimalHome";
import BrutalHome from "@/pages/BrutalHome";
import TerminalHome from "@/pages/TerminalHome";
import EditorialHome from "@/pages/EditorialHome";

import Resume from "@/components/Resume";


import StyleSwitcher from "@/components/StyleSwitcher";

function App() {
  return (
    <Router>
      <main className="antialiased font-sans">
        <Toaster position="bottom-right" />
        <StyleSwitcher />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/immersive" element={<ImmersiveHome />} />
          <Route path="/minimal" element={<MinimalHome />} />
          <Route path="/minimal" element={<MinimalHome />} />
          <Route path="/brutal" element={<BrutalHome />} />
          <Route path="/brutal" element={<BrutalHome />} />
          <Route path="/terminal" element={<TerminalHome />} />
          <Route path="/editorial" element={<EditorialHome />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
