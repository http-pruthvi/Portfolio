import { createContext, useContext, useState, type ReactNode } from "react";

interface SpineState {
    progress: number;
    activeSection: number;
    rotation: number;
}

interface SpineContextType extends SpineState {
    setScrollProgress: (progress: number) => void;
    setActiveSection: (index: number) => void;
    totalSections: number;
}

const SpineContext = createContext<SpineContextType | undefined>(undefined);

export const SpineProvider = ({ children, totalSections = 5 }: { children: ReactNode; totalSections?: number }) => {
    const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState(0);

    // Calculate rotation based on progress (e.g., 360 degrees * number of sections)
    const rotation = progress * Math.PI * 2 * (totalSections / 2);

    return (
        <SpineContext.Provider
            value={{
                progress,
                activeSection,
                rotation,
                setScrollProgress: setProgress,
                setActiveSection,
                totalSections,
            }}
        >
            {children}
        </SpineContext.Provider>
    );
};

export const useSpine = () => {
    const context = useContext(SpineContext);
    if (context === undefined) {
        throw new Error("useSpine must be used within a SpineProvider");
    }
    return context;
};
