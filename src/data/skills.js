// Skills data organized by categories with proficiency levels and icon references
export const skillsData = {
  "Programming Languages": [
    { name: "Python", level: 90, icon: "python" },
    { name: "Java", level: 85, icon: "java" },
    { name: "C/C++", level: 80, icon: "cpp" },
    { name: "JavaScript", level: 88, icon: "javascript" },
    { name: "TypeScript", level: 82, icon: "typescript" },
    { name: "Dart", level: 75, icon: "dart" },
    { name: "SQL", level: 85, icon: "database" }
  ],
  "Frontend/UI": [
    { name: "HTML5", level: 92, icon: "html5" },
    { name: "CSS3", level: 88, icon: "css3" },
    { name: "SASS", level: 80, icon: "sass" },
    { name: "React.js", level: 90, icon: "react" },
    { name: "Flutter", level: 78, icon: "flutter" },
    { name: "Tailwind CSS", level: 85, icon: "tailwind" },
    { name: "Next.js", level: 82, icon: "nextjs" }
  ],
  "Backend/Databases": [
    { name: "Node.js", level: 85, icon: "nodejs" },
    { name: "Express.js", level: 83, icon: "express" },
    { name: "Firebase", level: 80, icon: "firebase" },
    { name: "MongoDB", level: 78, icon: "mongodb" },
    { name: "MySQL", level: 82, icon: "mysql" }
  ],
  "AI/ML/Data": [
    { name: "PyTorch", level: 85, icon: "pytorch" },
    { name: "TensorFlow", level: 88, icon: "tensorflow" },
    { name: "OpenAI API", level: 90, icon: "openai" },
    { name: "Scikit-learn", level: 82, icon: "sklearn" },
    { name: "Pandas", level: 88, icon: "pandas" },
    { name: "NumPy", level: 85, icon: "numpy" },
    { name: "Matplotlib", level: 80, icon: "matplotlib" }
  ],
  "Tools/DevOps": [
    { name: "Git", level: 90, icon: "git" },
    { name: "GitHub", level: 88, icon: "github" },
    { name: "VS Code", level: 95, icon: "vscode" },
    { name: "Docker basics", level: 70, icon: "docker" },
    { name: "Linux", level: 82, icon: "linux" },
    { name: "Figma", level: 75, icon: "figma" },
    { name: "Canva", level: 80, icon: "canva" }
  ]
};

// Helper function to get all skills as a flat array
export const getAllSkills = () => {
  return Object.values(skillsData).flat();
};

// Helper function to get skills by category
export const getSkillsByCategory = (category) => {
  return skillsData[category] || [];
};

// Helper function to get skill categories
export const getSkillCategories = () => {
  return Object.keys(skillsData);
};