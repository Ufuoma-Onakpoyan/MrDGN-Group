import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, DollarSign, Users, Wrench, Layers } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useConstructionProject } from '@/hooks/useConstructionProjects';

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError } = useConstructionProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">Loading project...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <div>
              <Link to="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Projects
              </Link>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium text-primary-foreground">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <Card className="card-elevated">
              <CardHeader className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{project.location || '—'}</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Duration</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{project.duration || '—'}</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Project Value</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{project.value || '—'}</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Client</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{project.client || '—'}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {project.planning_details && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Layers className="h-6 w-6 text-primary mr-3" />
                    Planning & Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.planning_details}
                  </p>
                  <div className="space-y-2">
                    {project.architect && (
                      <p><span className="font-semibold">Architect:</span> {project.architect}</p>
                    )}
                    <p><span className="font-semibold">Category:</span> {project.category}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {project.structural_design && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Wrench className="h-6 w-6 text-primary mr-3" />
                    Structural Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.structural_design}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Equipment & Materials */}
          {(project.machines?.length > 0 || project.materials?.length > 0) && (
            <div className="grid lg:grid-cols-2 gap-12 mt-12">
              {project.machines?.length > 0 && (
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-2xl">Machines & Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.machines.map((machine, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span className="text-muted-foreground">{machine}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {project.materials?.length > 0 && (
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-2xl">Materials & Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.materials.map((material, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span className="text-muted-foreground">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Interested in a Similar <span className="text-gradient">Project?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us to discuss your construction needs and discover how we can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-construction" asChild>
              <Link to="/contact-us">Get A Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
