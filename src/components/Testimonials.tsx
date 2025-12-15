import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
    name: string;
    role: string;
    company: string;
    image: string;
    text: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: "John Doe",
        role: "Senior Developer",
        company: "Tech Corp",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        text: "Pruthviraj is an exceptional developer with a keen eye for detail. His work on our AI project exceeded all expectations.",
        rating: 5
    },
    {
        name: "Jane Smith",
        role: "Product Manager",
        company: "Innovation Labs",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        text: "Working with Pruthviraj was a pleasure. He delivered high-quality code and was always proactive in solving problems.",
        rating: 5
    },
    {
        name: "Mike Johnson",
        role: "CTO",
        company: "StartupXYZ",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        text: "Pruthviraj's expertise in full-stack development and AI/ML is impressive. He's a valuable asset to any team.",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-[89px] bg-neutral-50 dark:bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-[55px]"
                >
                    <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 dark:from-neutral-50 to-neutral-600 dark:to-neutral-400 mb-[21px]">
                        Testimonials
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-[16px] max-w-2xl mx-auto">
                        What people say about working with me
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px]">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-900/50 rounded-2xl p-[21px] border border-neutral-200 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full">
                                {/* Quote Icon */}
                                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Quote className="w-8 h-8 text-cyan-500" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-lg">★</span>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-neutral-700 dark:text-neutral-300 text-[14px] leading-relaxed mb-6">
                                    "{testimonial.text}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-3 mt-auto">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full border-2 border-cyan-500/30"
                                    />
                                    <div>
                                        <h4 className="text-black dark:text-white font-semibold text-[14px]">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-[12px]">
                                            {testimonial.role} at {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
