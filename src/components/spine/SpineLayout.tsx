import { Suspense } from "react";
// import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useSpine } from "./SpineContext";
import Spine3D from "./Spine3D";
import { cn } from "@/lib/utils";

const SpineLayout = ({ children }: { children: React.ReactNode }) => {
    const { setScrollProgress, activeSection } = useSpine();
    const { scrollYProgress } = useScroll();

    // Map scroll progress to context
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollProgress(latest);
    });

    // Background colors based on active section
    // Background colors based on active section
    const bgColors = [
        "bg-transparent",          // Hero
        "bg-black/10",             // About
        "bg-cyan-950/10",          // Skills/Tech
        "bg-purple-950/10",        // Projects
        "bg-black/10"              // Contact
    ];

    return (
        <div className={cn("relative min-h-screen transition-colors duration-1000", bgColors[activeSection % bgColors.length])}>
            {/* Fixed 3D Spine Container */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-full opacity-40">
                    <Canvas camera={{ position: [0, 0, 1.5], fov: 45 }}>
                        <Suspense fallback={null}>
                            <Spine3D />
                        </Suspense>
                    </Canvas>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default SpineLayout;
