# Pruthvi's Portfolio: A Multiverse of Design

![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **"One developer, infinite personas."**

Welcome to a portfolio that refuses to be defined by a single aesthetic. This project is an exploration of UI/UX versatility, showcasing how the same content can feel completely different through the lens of five unique design philosophies.

Beyond a simple resume, this site is a playground of interactive experiments, hidden easter eggs, and cutting-edge web technologies.

---

## 🌌 The Design Multiverse

Every "Home" in this portfolio is a fully realized application with its own rules, physics, and interactions. We've even renamed the source code to match the "Meme Energy" of each page.

### 0. The Entry Point: Choose Your Bios
*   **File**: `ChooseYourBios.tsx`
*   **Philosophy**: A "Select Your Fighter" style menu screen where users choose their preferred interface.
*   **Visuals**: Classic arcade selection screen meets modern web design.

### 1. RTX ON (Immersive Experience)
*   **File**: `RTXOn.tsx` (formerly `ImmersiveHome.tsx`)
*   **Philosophy**: A high-fidelity, deep-dive experience inspired by modern gaming interfaces and sci-fi aesthetics.
*   **Visuals**: 3D particle systems (`Three.js`), cybernetic overlays, and a heads-up display (HUD) tracking "Player Stats".
*   **Interactive Secrets**:
    *   **Warp Speed**: Hold `SPACE` to accelerate the background particles into hyperspace.
    *   **Konami Code**: Enter `↑ ↑ ↓ ↓ ← → ← → B A` to trigger a massive confetti explosion celebration.
    *   **Soundscapes**: UI interactions trigger subtle sci-fi sound effects.

### 2. CSS CRIMES (Neo-Brutalism)
*   **File**: `CssCrimes.tsx` (formerly `BrutalHome.tsx`)
*   **Philosophy**: "Ugly on purpose." High contrast, heavy borders, and raw, unpolished interactions that scream for attention.
*   **Visuals**: Stark black-and-white structures with aggressive splashes of cyan, yellow, and magenta.
*   **Interactive Secrets**:
    *   **Chaos Mode**: A "DO NOT PRESS" button that, when tempted, sends the entire UI into a chaotic dance of shakes and color inversions.
    *   **Destructive Clicks**: Clicking anywhere on the screen fractures the page, leaving behind permanent "cracks" in the digital glass.

### 3. BLUE SCREEN OF DEATH (Minimalist)
*   **File**: `BlueScreenOfDeath.tsx` (formerly `MinimalHome.tsx`)
*   **Philosophy**: "Less is more." ...Until it crashes. A focus on negative space and perfect typography.
*   **Visuals**: Monochromatic palette, subtle framer motion transitions, and a clean grid layout.
*   **Interactive Secrets**:
    *   **The Crash**: Annoyed by the theme toggler? Click the "Moon" icon 10 times rapidly to crash the site into a realistic Windows BSOD.
    *   **Invisible Ink**: Hidden messages are scattered throughout the whitespace, only revealed when you highlight/select the text.

### 4. SUDO RM -RF (Retro Terminal)
*   **File**: `SudoRmRf.tsx` (formerly `TerminalHome.tsx`)
*   **Philosophy**: A love letter to the command line. No mouse required (mostly).
*   **Visuals**: Iconic green/cyan text on a phosphor-burned dark background. Scanlines and CRT flicker included.
*   **Core Mechanics**:
    *   **Fully Functional Shell**: Navigate the portfolio using commands like `cd`, `ls`, `cat`, and `help`.
    *   **Command History**: Use `Up/Down` arrows to cycle through your previous commands.

### 5. REDACTED (Editorial Edition)
*   **File**: `Redacted.tsx` (formerly `EditorialHome.tsx`)
*   **Philosophy**: Web design meets confidential government files. Large serif typography and parallax scrolling.
*   **Visuals**: Asymmetrical grids, oversized headings, and elegant scrolling physics.
*   **Interactive Secrets**:
    *   **Redaction Mode**: Toggle "Edition 2025" to enter Redaction Mode, allowing you to click and "censor" (black out) any text on the page.
    *   **Coffee Stains**: A "Scroll" button that randomly stamps realistic coffee cup rings onto the page.

---

## 🛠️ Under the Hood

This project is built on a modern, type-safe stack designed for performance and scalability.

### Core Technology

![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/-Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)

*   **Framework**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) for robust, component-based architecture.
*   **Build System**: [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized production builds.
*   **Styling Engine**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling, enabling rapid prototyping of completely different themes.

### The "Magic" (Libraries & Tools)
*   **Animation**:
    *   `Framer Motion`: Powering the complex layout transitions and shared element animations.
    *   `GSAP` & `Canvas Confetti`: For high-performance particle effects.
*   **3D & Graphics**:
    *   `React Three Fiber` (@react-three/fiber): Bringing the Immersive theme's 3D background to life.
    *   `Drei`: Useful helpers for the 3D ecosystem.
*   **State Management**: React Context API (ThemeContext, GameContext) handles the global state across the multiverse.

---

## 📂 Architecture Overview

The codebase is structured to isolate specific logic while sharing core data. The filenames themselves have been updated to reflect the "personality" of the code they contain.

```
src/
├── components/         # 🧱 UI Building Blocks
│   ├── spine/          # Shared layout logic for scrolling/sections
│   ├── ui/             # Theme-specific creative components (GlitchText, CyberOverlay)
│   └── ...
├── context/            # 🧠 Global State (Sound, Theme, Game Status)
├── data/               # 💾 Single Source of Truth (Projects, Experience JSON)
├── hooks/              # 🎣 Custom Hooks (useKonamiCode, useSoundEffects)
└── pages/              # 🌍 The 5 Worlds (Renamed)
    ├── ChooseYourBios.tsx  # SELECT YOUR FIGHTER (Entry Point)
    ├── RTXOn.tsx           # Immersive / 3D
    ├── CssCrimes.tsx       # Neo-Brutalism / Chaos
    ├── BlueScreenOfDeath.tsx # Minimal / BSOD
    ├── SudoRmRf.tsx        # Terminal / CLI
    └── Redacted.tsx        # Editorial / Censored
```

---

## 📄 License

Designed & Developed by **Pruthvi**. Open source under the [MIT License](LICENSE).
