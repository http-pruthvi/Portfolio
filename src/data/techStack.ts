import type { IconType } from "react-icons";
import {
    SiReact, SiNextdotjs, SiAngular, SiVuedotjs, SiHtml5, SiCss3, SiJavascript, SiTypescript,
    SiNodedotjs, SiExpress, SiSpringboot, SiPython, SiDjango, SiFastapi, SiGo, SiRust,
    SiMysql, SiPostgresql, SiMongodb, SiRedis, SiGit, SiDocker, SiKubernetes, SiAmazon,
    SiGooglecloud, SiAndroid, SiKotlin, SiFirebase, SiSwift, SiFlutter, SiDart, SiNumpy,
    SiPandas, SiScikitlearn, SiTensorflow, SiPytorch, SiApacheairflow, SiLinux, SiTerraform,
    SiUnity, SiUnrealengine, SiBlender, SiKalilinux, SiSplunk
} from "react-icons/si";

export interface TechItem {
    name: string;
    icon: IconType;
    color: string;
    proficiency: number;
    category: string;
}

export const techStack: TechItem[] = [
    // Frontend
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", proficiency: 95, category: "Frontend" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6", proficiency: 95, category: "Frontend" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", proficiency: 90, category: "Frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", proficiency: 85, category: "Frontend" },
    { name: "React", icon: SiReact, color: "#61DAFB", proficiency: 90, category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", proficiency: 85, category: "Frontend" },
    { name: "Angular", icon: SiAngular, color: "#DD0031", proficiency: 75, category: "Frontend" },
    { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", proficiency: 70, category: "Frontend" },

    // Backend
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", proficiency: 85, category: "Backend" },
    { name: "Express", icon: SiExpress, color: "#000000", proficiency: 85, category: "Backend" },
    { name: "Java", icon: SiSpringboot, color: "#6DB33F", proficiency: 80, category: "Backend" },
    { name: "Python", icon: SiPython, color: "#3776AB", proficiency: 92, category: "Backend" },
    { name: "Django", icon: SiDjango, color: "#092E20", proficiency: 85, category: "Backend" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688", proficiency: 80, category: "Backend" },
    { name: "Go", icon: SiGo, color: "#00ADD8", proficiency: 75, category: "Backend" },
    { name: "Rust", icon: SiRust, color: "#000000", proficiency: 60, category: "Backend" },

    // Mobile
    { name: "Android", icon: SiAndroid, color: "#3DDC84", proficiency: 85, category: "Mobile" },
    { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", proficiency: 80, category: "Mobile" },
    { name: "Swift", icon: SiSwift, color: "#F05138", proficiency: 70, category: "Mobile" },
    { name: "Flutter", icon: SiFlutter, color: "#02569B", proficiency: 90, category: "Mobile" },
    { name: "Dart", icon: SiDart, color: "#0175C2", proficiency: 90, category: "Mobile" },

    // Database
    { name: "MySQL", icon: SiMysql, color: "#4479A1", proficiency: 85, category: "Database" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", proficiency: 80, category: "Database" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", proficiency: 85, category: "Database" },
    { name: "Redis", icon: SiRedis, color: "#DC382D", proficiency: 75, category: "Database" },

    // AI/ML & Data
    { name: "NumPy", icon: SiNumpy, color: "#013243", proficiency: 90, category: "Data Science" },
    { name: "Pandas", icon: SiPandas, color: "#150458", proficiency: 90, category: "Data Science" },
    { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E", proficiency: 85, category: "Data Science" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", proficiency: 82, category: "Data Science" },
    { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", proficiency: 80, category: "Data Science" },
    { name: "PowerBI", icon: SiApacheairflow, color: "#F2C811", proficiency: 75, category: "Data Science" },

    // DevOps & Cloud
    { name: "Linux", icon: SiLinux, color: "#FCC624", proficiency: 85, category: "DevOps" },
    { name: "Git", icon: SiGit, color: "#F05032", proficiency: 90, category: "DevOps" },
    { name: "Docker", icon: SiDocker, color: "#2496ED", proficiency: 80, category: "DevOps" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", proficiency: 70, category: "DevOps" },
    { name: "Terraform", icon: SiTerraform, color: "#7B42BC", proficiency: 65, category: "DevOps" },
    { name: "AWS", icon: SiAmazon, color: "#FF9900", proficiency: 75, category: "Cloud" },
    { name: "Azure", icon: SiLinux, color: "#007FFF", proficiency: 70, category: "Cloud" },
    { name: "GCP", icon: SiGooglecloud, color: "#4285F4", proficiency: 70, category: "Cloud" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", proficiency: 85, category: "Cloud" },

    // Cybersecurity
    { name: "Kali Linux", icon: SiKalilinux, color: "#557C94", proficiency: 80, category: "Cybersecurity" },
    { name: "Splunk", icon: SiSplunk, color: "#000000", proficiency: 65, category: "Cybersecurity" },

    // Game Dev
    { name: "Unity", icon: SiUnity, color: "#000000", proficiency: 75, category: "Game Dev" },
    { name: "Unreal", icon: SiUnrealengine, color: "#0E1128", proficiency: 70, category: "Game Dev" },
    { name: "Blender", icon: SiBlender, color: "#E87D0D", proficiency: 60, category: "Game Dev" },
];
