import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineAcademicCap } from 'react-icons/hi2';
import { HiOutlineExternalLink } from 'react-icons/hi';
import Card from '../ui/Card';
import { certificationsData, getSortedCertifications } from '../../data/certifications';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { 
  staggerContainer, 
  staggerContainerFast,
  scaleIn,
  cardHover,
  createResponsiveVariants,
  getStaggerDelay
} from '../../utils/animations';

const Certifications = () => {
  const { elementRef, isVisible, prefersReducedMotion } = useScrollAnimation();
  const sortedCertifications = getSortedCertifications();

  // Create responsive animation variants
  const containerVariants = createResponsiveVariants(staggerContainer)(prefersReducedMotion);
  const gridContainerVariants = createResponsiveVariants(staggerContainerFast)(prefersReducedMotion);
  const itemVariants = createResponsiveVariants({
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: getStaggerDelay(index, 0.05)
      }
    })
  })(prefersReducedMotion);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const handleCertificateClick = (credentialUrl) => {
    if (credentialUrl) {
      window.open(credentialUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={elementRef}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <HiOutlineAcademicCap className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">
                Certifications
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional certifications and achievements that validate my expertise 
              across various technologies and domains.
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <motion.div 
            variants={gridContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sortedCertifications.map((certification, index) => (
              <motion.div
                key={certification.id}
                variants={itemVariants}
                custom={index}
                whileHover={!prefersReducedMotion ? { 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
              >
                <Card
                  variant="default"
                  hover={true}
                  className="h-full cursor-pointer group relative overflow-hidden"
                  onClick={() => handleCertificateClick(certification.credentialUrl)}
                >
                  {/* Certificate Badge/Image Placeholder */}
                  <div className="relative h-32 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-4 rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
                    <HiOutlineAcademicCap className="h-12 w-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                    
                    {/* External Link Icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HiOutlineExternalLink className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Certificate Name */}
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {certification.name}
                    </h3>

                    {/* Issuer */}
                    <p className="text-blue-600 font-medium text-sm mb-3">
                      {certification.issuer}
                    </p>

                    {/* Issue Date */}
                    <div className="flex items-center text-gray-500 text-xs mb-3">
                      <HiOutlineCalendar className="h-4 w-4 mr-1" />
                      <span>Issued {formatDate(certification.issueDate)}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {certification.category}
                      </span>
                    </div>

                    {/* Skills */}
                    {certification.skills && certification.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {certification.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {certification.skills.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                            +{certification.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Credential ID (Hidden, shown on hover) */}
                    {certification.credentialId && (
                      <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs text-gray-500">
                          ID: {certification.credentialId}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {certificationsData.length}
                </div>
                <div className="text-gray-600">Total Certifications</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {new Set(certificationsData.map(cert => cert.category)).size}
                </div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {new Set(certificationsData.flatMap(cert => cert.skills || [])).size}
                </div>
                <div className="text-gray-600">Skills Validated</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;