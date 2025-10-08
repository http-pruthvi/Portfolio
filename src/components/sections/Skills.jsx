import { useState } from 'react';
import { skillsData } from '../../data/skills';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import TechIcon from '../ui/TechIcon';

const Skills = () => {
  const { elementRef } = useScrollAnimation(0.2);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Color mapping for different categories
  const categoryColors = {
    "Programming Languages": "blue",
    "Frontend/UI": "purple", 
    "Backend/Databases": "green",
    "AI/ML/Data": "orange",
    "Tools/DevOps": "red"
  };

  return (
    <section 
      id="skills"
      ref={elementRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid gap-8 lg:gap-12">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
            >
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {category}
                </h3>
                <div className={`w-20 h-1 bg-gradient-to-r ${getCategoryGradient(categoryColors[category])} rounded-full`}></div>
              </div>

              {/* Skills Grid */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative group"
                    onMouseEnter={() => setHoveredSkill(`${category}-${skill.name}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Card - Icon and Name */}
                    <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm group-hover:scale-105 flex flex-col items-center justify-center min-h-[120px]">
                      {/* Icon */}
                      <div className="flex justify-center items-center mb-3">
                        <TechIcon 
                          iconName={skill.icon} 
                          size={48} 
                          showColor={true}
                        />
                      </div>
                      
                      {/* Skill Name */}
                      <div className="text-center">
                        <h4 className="text-sm font-medium text-white group-hover:text-gray-200 transition-colors">
                          {skill.name}
                        </h4>
                      </div>

                      {/* Enhanced Hover Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Always exploring new technologies and expanding my skill set. 
              These proficiency levels reflect my current expertise and ongoing commitment to growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get category gradients
const getCategoryGradient = (color) => {
  const gradientMap = {
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-purple-600',
    green: 'from-green-400 to-green-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600'
  };
  return gradientMap[color] || 'from-gray-400 to-gray-600';
};

export default Skills;