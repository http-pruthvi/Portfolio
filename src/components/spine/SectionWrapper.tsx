import { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { useSpine } from "./SpineContext";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: React.ReactNode;
    index: number;
    className?: string;
    id?: string;
    fullWidth?: boolean;
}

const SectionWrapper = ({ children, index, className, id, fullWidth = false }: SectionWrapperProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, margin: "-10%" });
    const { setActiveSection } = useSpine();

    useEffect(() => {
        if (isInView) {
            setActiveSection(index);
        }
    }, [isInView, setActiveSection, index]);

    return (
        <section
            id={id}
            ref={ref}
            className={cn("min-h-screen w-full flex flex-col items-center p-6 py-20", className)}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                    "w-full my-auto",
                    fullWidth ? "max-w-none" : "max-w-7xl"
                )}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default SectionWrapper;
