import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Download, Printer } from "lucide-react";
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
        const element = document.getElementById('resume-content');
        if (!element) return;

        // Simple window print is best for "Jake Ryan" style to get selectable text PDF.
        // But if clear image is needed:
        const opt = {
            margin: [0, 0] as [number, number],
            filename: 'Pruthviraj_Phuse_Resume.pdf',
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' as const }
        };

        import('html2pdf.js').then(html2pdf => {
            html2pdf.default().set(opt).from(element).save();
        });
    };

    return (
        <div className="min-h-screen bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0">
            {/* Navigation & Actions */}
            <div className="max-w-[210mm] mx-auto mb-8 flex justify-between items-center print:hidden">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Portfolio</span>
                </Link>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all shadow-lg"
                            title="Best for Job Applications"
                        >
                            <Printer size={18} />
                            <span className="font-medium">Save as PDF (ATS Optimized)</span>
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-black hover:bg-neutral-100 transition-all text-neutral-600"
                            title="Best for sharing on social media"
                        >
                            <Download size={18} />
                            <span className="font-medium">Download Image (Not ATS)</span>
                        </button>
                    </div>
                    <p className="text-[10px] text-neutral-500 font-medium print:hidden">
                        *Use "Save as PDF" for Job Applications (ATS Friendly)
                    </p>
                </div>
            </div>

            {/* Resume Content - "Jake Ryan" Template */}
            <article id="resume-content" className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none p-[0.3in] print:p-0 text-black">
                <div className="font-sans text-[9pt] leading-tight text-black">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Header: Name
                            h1: ({ children }) => (
                                <div className="text-center border-b border-black pb-1 mb-1">
                                    <h1 className="text-2xl font-serif font-bold uppercase tracking-wide text-black mb-0.5">
                                        {children}
                                    </h1>
                                </div>
                            ),
                            // Section Headers
                            h2: ({ children }) => (
                                <h2 className="text-sm font-serif font-bold uppercase tracking-wider border-b border-black mt-3 mb-1 pb-0.5 text-black">
                                    {children}
                                </h2>
                            ),
                            // Role / Title
                            h3: ({ children }) => (
                                <h3 className="text-[10pt] font-bold text-black mt-2 mb-0 font-serif">
                                    {children}
                                </h3>
                            ),

                            // Wrapper for lists
                            ul: ({ children }) => (
                                <ul className="list-disc list-outside ml-4 space-y-0.5 mb-1 text-black">
                                    {children}
                                </ul>
                            ),
                            li: ({ children }) => (
                                <li className="pl-0 text-black">
                                    {children}
                                </li>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-bold text-black font-semibold">
                                    {children}
                                </strong>
                            ),
                            // For contact info specifically
                            p: ({ children }) => {
                                const text = String(children);
                                if (text.includes('Email:') || text.includes('LinkedIn:')) {
                                    return <p className="text-center text-[9pt] mb-2 text-black">{children}</p>;
                                }
                                return <p className="mb-0.5 text-black">{children}</p>;
                            },
                            a: ({ href, children }) => (
                                <a href={href} className="text-black underline decoration-1 underline-offset-2 hover:text-neutral-700">
                                    {children}
                                </a>
                            ),
                            hr: () => <hr className="border-black my-1" />
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                {/* Footer - Hidden in Print */}
                <div className="mt-4 pt-2 border-t border-neutral-200 text-center text-neutral-400 text-[10px] print:hidden">
                    <p>Generated on {new Date().toLocaleDateString()}</p>
                </div>
            </article>

            {/* Jake Ryan Print Styles */}
            <style>{`
        @media print {
          @page {
            margin: 0.3in;
            size: a4;
          }
          
          body {
            background: white;
            color: black;
            -webkit-print-color-adjust: exact;
          }
          
          /* Hide everything outside article */
          body > *:not(#root) { display: none; }
          
          article {
            box-shadow: none;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }

          /* Tighten up for one-pager */
          p, li {
             font-size: 9pt !important;
             line-height: 1.2 !important;
          }
           h1 { font-size: 22pt !important; margin-bottom: 4px !important; }
           h2 { font-size: 11pt !important; margin-top: 8px !important; margin-bottom: 4px !important; }
           h3 { font-size: 10pt !important; margin-top: 6px !important; margin-bottom: 0px !important; }
           ul { margin-bottom: 4px !important; }
        }
        
        /* Font Imports for screen if needed */
        .font-serif { font-family: 'Times New Roman', serif; }
        .font-sans { font-family: 'Arial', sans-serif; }
      `}</style>
        </div>
    );
};

export default Resume;
