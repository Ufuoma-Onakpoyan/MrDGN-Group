import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Film, Youtube, Zap, Camera, Edit, Trophy, ArrowRight, Play, Sparkles } from "lucide-react";

const Services = () => {
  useScrollReveal();

  const services = [
    {
      icon: Film,
      title: "Movie Production",
      description: "Full-scale movie production from script development to post-production, showcasing the rich storytelling tradition of Nigeria.",
      features: ["Script Development", "Cinematography", "Direction", "Post-Production"],
      highlight: "Nollywood Excellence"
    },
    {
      icon: Youtube,
      title: "YouTube Long-Form Content",
      description: "Educational and entertaining long-form content that engages audiences and builds lasting connections with viewers.",
      features: ["Documentary Style", "Educational Series", "Cultural Showcases", "Behind-the-Scenes"],
      highlight: "Deep Storytelling"
    },
    {
      icon: Zap,
      title: "Short-Form Content",
      description: "Engaging short-form content optimized for social media platforms, capturing attention in the digital age.",
      features: ["Social Media Clips", "Quick Entertainment", "Viral Content", "Brand Stories"],
      highlight: "Viral Ready"
    },
    {
      icon: Sparkles,
      title: "Event Sponsorship",
      description: "Sponsoring premier entertainment events—film festivals, award ceremonies, concerts, and cultural showcases across Nigeria.",
      features: ["Film Festivals", "Awards Ceremonies", "Live Concerts", "Industry Networking"],
      highlight: "Industry Impact"
    }
  ];

  const portfolio = [
    {
      title: "Lagos Chronicles",
      type: "Feature Film",
      description: "A dramatic portrayal of modern Nigerian urban life",
      status: "In Production"
    },
    {
      title: "Nigerian Culture Series",
      type: "YouTube Series",
      description: "Educational content showcasing traditional Nigerian customs",
      status: "Released"
    },
    {
      title: "Daily Lagos Life",
      type: "Short-Form Series",
      description: "Quick glimpses into the vibrant life of Lagos",
      status: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              From Nollywood blockbusters to viral social media content, we bring Nigerian stories to life across all platforms.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="secondary" className="text-sm px-4 py-2">Nigerian Entertainment</Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">Global Reach</Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">Cultural Storytelling</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {services.map((service, index) => (
                <Card key={index} className="card-hover scroll-reveal border-0 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-3xl"></div>
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs font-medium">
                        {service.highlight}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A showcase of our latest work across movies, YouTube content, and short-form entertainment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {portfolio.map((project, index) => (
                <Card key={index} className="card-hover scroll-reveal border-0 shadow-lg">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                    <Play className="h-16 w-16 text-primary/40" />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {project.type}
                      </Badge>
                      <Badge 
                        variant={project.status === 'Released' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center scroll-reveal">
              <Button size="lg" className="hero-glow" asChild>
                <Link to="/portfolio">
                  View All Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Create Something <span className="gradient-text">Amazing?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life. Whether it's a feature film, 
                YouTube series, or viral short content, we have the expertise to make it happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="hero-glow" asChild>
                  <Link to="/contact">
                    Start a Project
                    <Camera className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/portfolio">
                    View Portfolio
                    <Trophy className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;