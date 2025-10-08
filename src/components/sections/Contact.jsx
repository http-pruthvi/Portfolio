import { useState } from 'react';
import { contactData, getSocialLinks } from '../../data/contact';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin, 
  FaInstagram,
  FaCopy,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { elementRef } = useScrollAnimation(0.2);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactData.email.primary);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const socialLinks = getSocialLinks();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden min-h-screen py-20" ref={elementRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to collaborate on exciting projects or discuss opportunities?
            I'd love to hear from you!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Email Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 group hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6 group-hover:bg-blue-500/30 transition-all duration-300">
              <FaEnvelope className="text-2xl text-blue-400" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              Email Me
            </h3>

            <p className="text-gray-300 mb-6 text-sm break-all">
              {contactData.email.display}
            </p>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm w-full justify-center"
            >
              {copiedEmail ? (
                <>
                  <FaCheckCircle className="text-sm" />
                  Copied!
                </>
              ) : (
                <>
                  <FaCopy className="text-sm" />
                  Copy Email
                </>
              )}
            </button>
          </div>

          {/* GitHub Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 group hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500/20 rounded-full mb-6 group-hover:bg-gray-500/30 transition-all duration-300">
              <FaGithub className="text-2xl text-gray-300" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              GitHub
            </h3>

            <p className="text-gray-300 mb-6 text-sm break-all">
              {socialLinks.find(link => link.platform === 'Github')?.display}
            </p>

            <a
              href={socialLinks.find(link => link.platform === 'Github')?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 text-sm w-full justify-center"
            >
              <FaExternalLinkAlt className="text-sm" />
              View Profile
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 group hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6 group-hover:bg-blue-500/30 transition-all duration-300">
              <FaLinkedin className="text-2xl text-blue-400" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              LinkedIn
            </h3>

            <p className="text-gray-300 mb-6 text-sm break-all">
              Connect professionally
            </p>

            <a
              href={socialLinks.find(link => link.platform === 'Linkedin')?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm w-full justify-center"
            >
              <FaExternalLinkAlt className="text-sm" />
              Connect
            </a>
          </div>

          {/* Instagram Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 group hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-6 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
              <FaInstagram className="text-2xl text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              Instagram
            </h3>

            <p className="text-gray-300 mb-6 text-sm break-all">
              Follow my journey
            </p>

            <a
              href={socialLinks.find(link => link.platform === 'Instagram')?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 text-sm w-full justify-center"
            >
              <FaExternalLinkAlt className="text-sm" />
              Follow
            </a>
          </div>
        </div>

        {/* Availability Status */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-semibold text-white">
              {contactData.availability.status}
            </span>
          </div>

          <p className="text-gray-300 mb-6 text-center">
            Interested in {contactData.availability.types.join(', ').toLowerCase()}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {contactData.availability.interests.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm font-medium border border-white/10"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Response Time */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <FaClock className="text-2xl text-blue-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Response Time</h4>
            <p className="text-gray-300 text-sm">
              I typically respond within {contactData.preferences.responseTime}
            </p>
          </div>

          {/* Location */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <FaMapMarkerAlt className="text-2xl text-green-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Location</h4>
            <p className="text-gray-300 text-sm">
              {contactData.personal.location} ({contactData.personal.timezone})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;