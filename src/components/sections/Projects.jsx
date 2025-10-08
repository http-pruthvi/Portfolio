import { useState, useMemo, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter, FiX, FiEye } from 'react-icons/fi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import {
  staggerContainer,
  fadeInUp,
  scaleIn,
  cardHoverStrong,
  createResponsiveVariants,
  getStaggerDelay
} from '../../utils/animations';
import { projectsData, getProjectCategories, getAllTechStack } from '../../data/projects';

// Lazy load 3D showcase
const ProjectShowcase3D = lazy(() => import('../3d/ProjectShowcase3D'));

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [show3D, setShow3D] = useState(false);

  const { elementRef, isVisible, prefersReducedMotion } = useScrollAnimation(0.1, '-50px');

  const categories = getProjectCategories();
  const techStack = getAllTechStack();

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      const techMatch = selectedTech === 'all' || project.techStack.includes(selectedTech);
      return categoryMatch && techMatch;
    });
  }, [selectedCategory, selectedTech]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTech('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTech !== 'all';

  // Create responsive animation variants
  const containerVariants = createResponsiveVariants(staggerContainer)(prefersReducedMotion);
  const cardVariants = createResponsiveVariants({
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: getStaggerDelay(index, 0.1)
      }
    })
  })(prefersReducedMotion);

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={cardHoverStrong}
      custom={index}
      initial="rest"
      whileHover={!prefersReducedMotion ? "hover" : "rest"}
      className="h-full"
    >
      <Card
        variant="default"
        hover={true}
        className="h-full flex flex-col group cursor-pointer"
        onClick={() => setSelectedProject(project)}
      >
        {/* Project Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-lg font-mono opacity-80">
              {project.category}
            </div>
          </div>
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${project.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
              }`}>
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTech(tech);
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex space-x-3">
              {project.githubUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FiGithub className="w-4 h-4" />
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank');
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FiExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
            <span className="text-xs text-gray-500 capitalize">
              {project.type}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={elementRef}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A collection of projects showcasing my expertise in AI/ML, web development,
              blockchain, and system programming. Each project represents a unique challenge
              and learning experience.
            </p>
          </motion.div>

          {/* Filter Controls */}
          <motion.div variants={cardVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant={showFilters ? "primary" : "secondary"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <FiFilter className="w-4 h-4" />
                  <span>Filters</span>
                </Button>

                <Button
                  variant={show3D ? "primary" : "secondary"}
                  onClick={() => setShow3D(!show3D)}
                  className="flex items-center space-x-2"
                >
                  <FiEye className="w-4 h-4" />
                  <span>3D View</span>
                </Button>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </Button>
                )}
              </div>

              <div className="text-sm text-gray-600">
                Showing {filteredProjects.length} of {projectsData.length} projects
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === 'all'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        All Categories
                      </button>
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === category
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technology Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Technology
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedTech('all')}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTech === 'all'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        All Technologies
                      </button>
                      {techStack.slice(0, 10).map(tech => (
                        <button
                          key={tech}
                          onClick={() => setSelectedTech(tech)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTech === tech
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Projects Display */}
          {show3D ? (
            <motion.div
              variants={cardVariants}
              className="mb-8"
            >
              <Suspense fallback={
                <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-gray-500">Loading 3D showcase...</div>
                </div>
              }>
                <ProjectShowcase3D
                  projects={filteredProjects}
                  onProjectSelect={setSelectedProject}
                  className="h-96 rounded-lg overflow-hidden"
                />
              </Suspense>
            </motion.div>
          ) : (
            /* Projects Grid */
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              variants={cardVariants}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more projects.
              </p>
              <Button variant="primary" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-white/80">{project.category}</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 capitalize font-medium">{project.type}</span>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <span className={`ml-2 capitalize font-medium ${project.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {project.githubUrl && (
              <Button
                variant="primary"
                onClick={() => window.open(project.githubUrl, '_blank')}
                className="flex items-center space-x-2"
              >
                <FiGithub className="w-4 h-4" />
                <span>View Code</span>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="secondary"
                onClick={() => window.open(project.liveUrl, '_blank')}
                className="flex items-center space-x-2"
              >
                <FiExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;