import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiNodedotjs, 
  SiHtml5, SiCss3, SiSass, SiTailwindcss, SiNextdotjs,
  SiExpress, SiFirebase, SiMongodb, SiMysql,
  SiPytorch, SiTensorflow, SiPandas, SiNumpy,
  SiGit, SiGithub, SiDocker, SiLinux,
  SiFigma, SiCanva, SiFlutter, SiDart, SiOpenai
} from 'react-icons/si';
import { 
  FaJava, FaDatabase, FaChartLine 
} from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

// Comprehensive icon mapping for technologies
const iconMap = {
  // Programming Languages
  python: SiPython,
  java: FaJava,
  cpp: () => <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">C++</div>,
  javascript: SiJavascript,
  typescript: SiTypescript,
  dart: SiDart,
  database: FaDatabase,
  
  // Frontend/UI
  html5: SiHtml5,
  css3: SiCss3,
  sass: SiSass,
  react: SiReact,
  flutter: SiFlutter,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  
  // Backend/Databases
  nodejs: SiNodedotjs,
  express: SiExpress,
  firebase: SiFirebase,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiMysql, // Using MySQL icon as fallback
  
  // AI/ML/Data
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  openai: SiOpenai,
  sklearn: FaChartLine, // Using chart icon as fallback
  pandas: SiPandas,
  numpy: SiNumpy,
  matplotlib: FaChartLine,
  
  // Tools/DevOps
  git: SiGit,
  github: SiGithub,
  vscode: VscCode,
  docker: SiDocker,
  linux: SiLinux,
  figma: SiFigma,
  canva: SiCanva,
};

// Color mapping for different technologies
const colorMap = {
  // Programming Languages
  python: '#3776AB',
  java: '#ED8B00',
  cpp: '#00599C',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  dart: '#0175C2',
  database: '#336791',
  
  // Frontend/UI
  html5: '#E34F26',
  css3: '#1572B6',
  sass: '#CC6699',
  react: '#61DAFB',
  flutter: '#02569B',
  tailwind: '#06B6D4',
  nextjs: '#000000',
  
  // Backend/Databases
  nodejs: '#339933',
  express: '#000000',
  firebase: '#FFCA28',
  mongodb: '#47A248',
  mysql: '#4479A1',
  postgresql: '#336791',
  
  // AI/ML/Data
  pytorch: '#EE4C2C',
  tensorflow: '#FF6F00',
  openai: '#412991',
  sklearn: '#F7931E',
  pandas: '#150458',
  numpy: '#013243',
  matplotlib: '#11557C',
  
  // Tools/DevOps
  git: '#F05032',
  github: '#181717',
  vscode: '#007ACC',
  docker: '#2496ED',
  linux: '#FCC624',
  figma: '#F24E1E',
  canva: '#00C4CC',
};

const TechIcon = ({ 
  iconName, 
  size = 24, 
  className = '', 
  showColor = true,
  fallbackColor = '#6B7280' 
}) => {
  const IconComponent = iconMap[iconName];
  const iconColor = showColor ? (colorMap[iconName] || fallbackColor) : 'currentColor';
  
  if (!IconComponent) {
    // Fallback to a generic icon if not found
    return (
      <div 
        style={{ 
          fontSize: size,
          color: iconColor,
          width: size,
          height: size
        }}
        className={`${className} flex items-center justify-center`}
      >
        ⚙️
      </div>
    );
  }
  
  // Handle both React Icons and Iconify components
  if (typeof IconComponent === 'function' && IconComponent.name) {
    // This is a custom component (like our C++ icon)
    return (
      <div 
        style={{ 
          width: size, 
          height: size,
          color: iconColor
        }}
        className={className}
      >
        <IconComponent />
      </div>
    );
  }
  
  // This is a React Icon component
  return (
    <IconComponent
      size={size}
      color={iconColor}
      className={className}
      style={{ 
        width: size, 
        height: size 
      }}
    />
  );
};

export default TechIcon;