import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Download, Printer, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Resume = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("/resume.md")
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const element = document.querySelector('article');
        if (!element) return;

        const opt = {
            margin: [0.5, 0.5] as [number, number],
            filename: 'Pruthviraj_Phuse_Resume.pdf',
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
        };
        // @ts-ignore
        import('html2pdf.js').then(html2pdf => {
            html2pdf.default().set(opt).from(element).save();
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-neutral-200 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0">
            {/* Navigation & Actions */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Portfolio</span>
                </Link>
                <div className="flex gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all text-white border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                        <Printer size={18} />
                        <span className="font-medium">Print</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                    >
                        <Download size={18} />
                        <span className="font-medium">Download PDF</span>
                    </button>
                </div>
            </div>

            {/* Resume Content */}
            <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl print:shadow-none print:rounded-none overflow-hidden">
                {/* Header Section with Gradient */}
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 print:bg-gradient-to-r print:from-cyan-600 print:to-blue-600">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">PRUTHVIRAJ PHUSE</h1>
                    <p className="text-cyan-50 text-lg mb-4">Full-Stack Developer | AI/ML Engineer | Mobile Developer</p>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>phusepruthvi@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+91 8805765930</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>India</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Linkedin size={16} />
                            <span>linkedin.com/in/pruthviraj-phuse</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Github size={16} />
                            <span>github.com/http-pruthvi</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 md:p-12">
                    <div className="prose prose-neutral max-w-none
            prose-headings:text-neutral-900 prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-cyan-600
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-cyan-700
            prose-p:text-neutral-700 prose-p:leading-relaxed
            prose-li:text-neutral-700 prose-li:leading-relaxed
            prose-strong:text-neutral-900 prose-strong:font-semibold
            prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline
            prose-ul:my-3 prose-ul:space-y-1
            print:prose-h2:text-xl print:prose-h3:text-lg print:prose-p:text-sm print:prose-li:text-sm">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Custom rendering for better styling
                                h1: () => null, // Skip h1 as we have custom header
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4 pb-2 border-b-2 border-cyan-600 print:text-xl print:mt-6 print:mb-3">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-semibold text-cyan-700 mt-6 mb-3 print:text-lg print:mt-4 print:mb-2">
                                        {children}
                                    </h3>
                                ),
                                ul: ({ children }) => (
                                    <ul className="space-y-2 my-4 list-disc list-inside marker:text-cyan-600">
                                        {children}
                                    </ul>
                                ),
                                li: ({ children }) => (
                                    <li className="text-neutral-700 leading-relaxed pl-2">
                                        {children}
                                    </li>
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-semibold text-neutral-900">
                                        {children}
                                    </strong>
                                ),
                                p: ({ children }) => {
                                    // Check if this is a contact info paragraph (skip it as we have custom header)
                                    const text = String(children);
                                    if (text.includes('Email:') || text.includes('Phone:') || text.includes('LinkedIn:')) {
                                        return null;
                                    }
                                    return <p className="text-neutral-700 leading-relaxed my-3">{children}</p>;
                                },
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-neutral-100 px-8 py-4 text-center text-neutral-600 text-sm print:bg-white print:border-t print:border-neutral-300">
                    <p>This resume was generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </article>

            {/* Print Styles */}
            <style>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .prose {
            font-size: 11pt;
            line-height: 1.4;
          }
          
          .prose h2 {
            page-break-after: avoid;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          .prose h3 {
            page-break-after: avoid;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .prose ul {
            margin: 0.5rem 0;
          }
          
          .prose li {
            page-break-inside: avoid;
            margin: 0.25rem 0;
          }
        }
      `}</style>
        </div>
    );
};

export default Resume;
