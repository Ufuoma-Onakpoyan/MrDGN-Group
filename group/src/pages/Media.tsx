import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Calendar, Video, ExternalLink, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useNavigate } from 'react-router-dom';
// Video: place your file at group/public/assets/MrDGN Group.mp4
const COMPANY_VIDEO_SRC = '/assets/MrDGN Group.mp4';

const Media = () => {
  const navigate = useNavigate();
  const { data: blogPosts, isLoading, error } = useBlogPosts();

  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Media Center
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Stay updated with the latest news, announcements, and insights from MrDGN Group and our portfolio companies.
          </p>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Latest News
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Recent updates and announcements from across our organization.
              </p>
            </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading blog posts...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Error loading blog posts. Please try again later.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts?.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="tile-glassy cursor-pointer animate-fade-in-up hover-slide"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <div className="relative overflow-hidden rounded-t-lg bg-muted flex items-center justify-center min-h-[192px]">
                    <img 
                      src={post.featured_image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'} 
                      alt={post.title}
                      className="w-full h-auto max-h-64 object-contain image-hover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Blog Post
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        Read More
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        By {post.author}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8 py-3 transition-all duration-300 hover:scale-[1.02]">
              View All News & Updates
            </Button>
          </div>
        </div>
        </section>

      {/* Company Overview Video Section */}
      <section className="py-20 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                <Video className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Company Overview Video
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A visual introduction to MrDGN Group and our portfolio of businesses.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card tile-glassy">
              <video
                className="w-full aspect-video object-cover"
                controls
                playsInline
                poster=""
                preload="metadata"
              >
                <source src={COMPANY_VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4 md:p-6 border-t border-border/50 bg-card/80">
                <p className="text-sm text-muted-foreground text-center">
                  MrDGN Group — Building tomorrow&apos;s industries through strategic investments and innovative leadership.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* Press Contact Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Press Inquiries
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            For media inquiries, interview requests, or additional information, please contact our press team.
          </p>
          
          <Card className="shadow-xl animate-slide-up tile-glassy">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Media Relations
                  </h3>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> press@mrdgngroup.com
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Phone:</strong> <a href="tel:+2348135324467">+234 813 532 4467</a>
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Hours:</strong> Monday - Friday, 9AM - 6PM EST
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Quick Response
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We aim to respond to all media inquiries within 24 hours during business days.
                  </p>
                  <Button>
                    Send Press Inquiry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Media;
