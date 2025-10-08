// Contact information data
export const contactData = {
  personal: {
    name: "Pruthviraj Phuse",
    title: "Computer Engineering Student",
    tagline: "Blending Code, Creativity & Curiosity",
    location: "India",
    timezone: "IST (UTC+5:30)"
  },
  email: {
    primary: "phusepruthvi@gmail.com",
    display: "phusepruthvi@gmail.com"
  },
  social: {
    github: {
      url: "https://github.com/http-pruthvi",
      username: "http-pruthvi",
      display: "github.com/http-pruthvi"
    },
    linkedin: {
      url: "https://linkedin.com/in/pruthviraj-phuse-aa0513324",
      username: "pruthviraj-phuse-aa0513324",
      display: "linkedin.com/in/pruthviraj-phuse-aa0513324"
    },
    instagram: {
      url: "https://www.instagram.com/http_pruthvi/",
      username: "http_pruthvi",
      display: "instagram.com/http_pruthvi"
    }
  },
  availability: {
    status: "Open to opportunities",
    types: ["Full-time", "Internships", "Freelance", "Collaborations"],
    interests: [
      "Software Development",
      "AI/ML Projects",
      "Blockchain Development",
      "System Programming",
      "Open Source Contributions"
    ]
  },
  preferences: {
    contactMethod: "email",
    responseTime: "24-48 hours",
    languages: ["English", "Hindi", "Marathi"]
  }
};

// Helper functions for contact data
export const getPrimaryEmail = () => {
  return contactData.email.primary;
};

export const getSocialLinks = () => {
  return Object.entries(contactData.social).map(([platform, data]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    url: data.url,
    username: data.username,
    display: data.display
  }));
};

export const getAvailabilityStatus = () => {
  return contactData.availability.status;
};

export const getOpportunityTypes = () => {
  return contactData.availability.types;
};

export const getInterestAreas = () => {
  return contactData.availability.interests;
};