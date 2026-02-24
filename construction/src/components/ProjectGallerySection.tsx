import React from 'react';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useConstructionProjects } from '@/hooks/useConstructionProjects';

const ProjectGallerySection = () => {
  const { data: projects = [] } = useConstructionProjects();
  const displayProjects = projects.slice(0, 6);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Project <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of completed projects across Nigeria showcasing our expertise and commitment to excellence.
          </p>
        </div>

        {displayProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayProjects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-white/90 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-8">
            <p className="text-muted-foreground">Featured projects are managed from the admin panel.</p>
          </div>
        )}

        <div className="text-center">
          <Button size="lg" variant="outline" className="mr-4 group" asChild>
            <Link to="/projects">
              View All Projects
            </Link>
          </Button>
          <Button
            size="lg"
            className="btn-construction group"
            asChild
          >
            <a
              href="https://www.instagram.com/mrdgn_constructions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow Us on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallerySection;
