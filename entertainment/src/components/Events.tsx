import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { usePastEvents } from "@/hooks/useEvents";
import { LAYOUT } from "@/lib/layout";

const EVENT_TYPE_LABELS: Record<string, string> = {
  concert: "Concert",
  expo: "Music, Comedy & Fashion Expo",
  comedy: "Comedy",
  awards: "Awards",
  event: "Event",
};

const Events = () => {
  const { data: pastEvents = [], isLoading } = usePastEvents();

  return (
    <section id="events" className={`${LAYOUT.section} bg-muted/30`}>
      <div className="container mx-auto px-4">
        <div className={LAYOUT.containerWide}>
          <div className="text-center mb-10 scroll-reveal">
            <Badge variant="secondary" className="mb-3">Event Sponsorship</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powering <span className="gradient-text">Entertainment Events</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              We sponsor concerts, comedy shows, and cultural expos across Nigeria.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-0 shadow-xl overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-muted rounded animate-pulse w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {pastEvents.map((event) => (
                <Card key={event.id} className="card-hover scroll-reveal border-0 shadow-xl overflow-hidden transition-all duration-300">
                  <div className="aspect-video bg-muted overflow-hidden">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {EVENT_TYPE_LABELS[event.event_type] || event.event_type}
                    </Badge>
                    <h3 className="font-bold mb-1 line-clamp-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {event.event_date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          <span>{event.event_date}</span>
                        </div>
                      )}
                      {(event.venue || event.location) && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="line-clamp-1">{event.venue || event.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm mb-10 scroll-reveal">
              No events to display. Check back soon.
            </div>
          )}

          <div className="text-center scroll-reveal">
            <Link to="/events">
              <Button size="lg" className="hero-glow group transition-all duration-300">
                View all events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
