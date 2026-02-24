import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
const Projects = () => {
  useEffect(() => {
    document.title = 'Projects - MR DGN Constructions';
  }, []);
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      

      <ProjectsSection />
      <Footer />
    </div>;
};
export default Projects;