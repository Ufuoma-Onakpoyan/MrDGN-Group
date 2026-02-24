import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useConstructionProjects } from '@/hooks/useConstructionProjects';

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const { data: projects = [], isLoading } = useConstructionProjects();

  // Auto-advance carousel
  useEffect(() => {
    if (projects.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects to display yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our portfolio of outstanding construction projects that showcase our expertise and commitment to excellence.
          </p>
        </div>

        {/* Featured Project Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="relative h-96 lg:h-[500px]">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-2">{project.title}</h3>
                      <p className="text-lg opacity-90 mb-4 max-w-2xl">{project.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        {project.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {project.location}
                          </div>
                        )}
                        {project.duration && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {project.duration}
                          </div>
                        )}
                        {project.value && <div className="font-semibold">{project.value}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {projects.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                onClick={prevProject}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                onClick={nextProject}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentProject ? 'bg-primary' : 'bg-border'
                }`}
                onClick={() => setCurrentProject(index)}
              />
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="card-elevated hover-lift group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm">
                  {project.description.substring(0, 100)}
                  {project.description.length > 100 ? '...' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span>{project.duration || '—'}</span>
                  {project.value && (
                    <span className="font-semibold text-primary">{project.value}</span>
                  )}
                </div>
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <Link to={`/project/${project.id}`}>
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
