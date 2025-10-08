import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiBriefcase, FiAward, FiExternalLink } from 'react-icons/fi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { 
  staggerContainer, 
  fadeInLeft, 
  fadeInRight,
  scaleIn,
  createResponsiveVariants,
  getStaggerDelay
} from '../../utils/animations';
import { experienceData, getSortedExperience } from '../../data/experience';

const Experience = () => {
  const [selectedType, setSelectedType] = useState('all');
  const { elementRef, isVisible, prefersReducedMotion } = useScrollAnimation(0.1, '-50px');
  
  // Filter experiences based on selected type
  const filteredExperiences = selectedType === 'all' 
    ? getSortedExperience() 
    : experienceData.filter(exp => exp.type === selectedType).sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
      });
  
  // Create responsive animation variants
  const containerVariants = createResponsiveVariants(staggerContainer)(prefersReducedMotion);
  const itemVariants = createResponsiveVariants({
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.95
    },
    visible: (index) => ({ 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: getStaggerDelay(index, 0.15)
      }
    })
  })(prefersReducedMotion);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };
  
  // Calculate duration
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return `${years} year${years !== 1 ? 's' : ''}${months > 0 ? ` ${months} month${months !== 1 ? 's' : ''}` : ''}`;
    }
  };
  
  const ExperienceCard = ({ experience, index }) => (
    <motion.div
      variants={itemVariants}
      custom={index}
      className="relative"
      whileHover={!prefersReducedMotion ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />
      
      {/* Timeline dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 hidden md:block" />
      
      <Card 
        variant="default" 
        hover={true}
        className="ml-0 md:ml-12 mb-8 group"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {experience.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <FiBriefcase className="w-4 h-4 mr-2" />
                <span className="font-medium">{experience.role}</span>
                {experience.company && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{experience.company}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Type badge */}
            <div className="mt-2 sm:mt-0">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                experience.type === 'professional' 
                  ? 'bg-green-100 text-green-800'
                  : experience.type === 'personal'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
              </span>
            </div>
          </div>
          
          {/* Date and duration */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FiCalendar className="w-4 h-4 mr-2" />
            <span>
              {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
            </span>
            <span className="mx-2">•</span>
            <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
            {!experience.endDate && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                Current
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed">
            {experience.description}
          </p>
          
          {/* Tech Stack */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FiAward className="w-4 h-4 mr-1" />
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {experience.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
  
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={elementRef}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A timeline of my professional experiences, personal projects, and academic work. 
              Each experience has shaped my skills and passion for technology.
            </p>
          </motion.div>
          
          {/* Filter Controls */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === 'all' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedType('all')}
                  size="sm"
                >
                  All Experience
                </Button>
                <Button
                  variant={selectedType === 'professional' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedType('professional')}
                  size="sm"
                >
                  Professional
                </Button>
                <Button
                  variant={selectedType === 'personal' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedType('personal')}
                  size="sm"
                >
                  Personal Projects
                </Button>
                <Button
                  variant={selectedType === 'academic' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedType('academic')}
                  size="sm"
                >
                  Academic
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredExperiences.length} experience{filteredExperiences.length !== 1 ? 's' : ''}
              </div>
            </div>
          </motion.div>
          
          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            className="relative"
          >
            {filteredExperiences.map((experience, index) => (
              <ExperienceCard 
                key={experience.id} 
                experience={experience} 
                index={index} 
              />
            ))}
          </motion.div>
          
          {/* No Results Message */}
          {filteredExperiences.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No experiences found
              </h3>
              <p className="text-gray-600 mb-4">
                Try selecting a different filter to see more experiences.
              </p>
              <Button variant="primary" onClick={() => setSelectedType('all')}>
                Show All Experiences
              </Button>
            </motion.div>
          )}
          
          {/* Summary Stats */}
          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {experienceData.length}
                </div>
                <div className="text-gray-600">Total Experiences</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {experienceData.filter(exp => exp.type === 'professional').length}
                </div>
                <div className="text-gray-600">Professional Roles</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {experienceData.filter(exp => exp.endDate === null).length}
                </div>
                <div className="text-gray-600">Ongoing Projects</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;