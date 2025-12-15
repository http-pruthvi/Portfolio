import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Replace these with your actual EmailJS service ID, template ID, and public key
        // Sign up at https://www.emailjs.com/
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current!,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setLoading(false);
                    toast.success("Message sent successfully!");
                    formRef.current?.reset();
                },
                (error) => {
                    setLoading(false);
                    toast.error("Failed to send message. Please try again.");
                    console.error("EmailJS Error:", error);
                }
            );
    };

    return (
        <section id="contact" className="py-20 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    Get In Touch
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Let's Collaborate</h3>
                        <p className="text-neutral-400 mb-8">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-neutral-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-cyan-400">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-500">Email</p>
                                    <a href="mailto:phusepruthvi@gmail.com" className="hover:text-cyan-400 transition-colors">
                                        phusepruthvi@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-neutral-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-purple-400">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-500">Phone</p>
                                    <p>+91 8805765930</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-neutral-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-green-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-500">Location</p>
                                    <p>India</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="user_name"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="user_email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="Your message..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>Sending... <Loader2 className="animate-spin" size={18} /></>
                                ) : (
                                    <>Send Message <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 text-center text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} Pruthviraj Phuse. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
