import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePastEvents, type SponsoredEventResponse } from "@/hooks/useEvents";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, Music, Sparkles, Phone, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { LAYOUT } from "@/lib/layout";

const EVENT_TYPE_LABELS: Record<string, string> = {
  concert: "Concert",
  expo: "Music, Comedy & Fashion Expo",
  comedy: "Comedy",
  awards: "Awards",
  event: "Event",
};

function PastEventCard({ event }: { event: SponsoredEventResponse }) {
  const typeLabel = EVENT_TYPE_LABELS[event.event_type] || event.event_type;
  const ticketInfo = event.ticket_info as Record<string, unknown> | undefined;
  const hasTicketInfo = ticketInfo && (ticketInfo.regular || ticketInfo.vip);

  return (
    <Card className="card-hover scroll-reveal border-0 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        <div className="lg:col-span-2 relative aspect-[3/4] min-h-[280px] bg-muted">
          {event.image_url ? (
            <img src={event.image_url} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"><Music className="h-16 w-16 text-muted-foreground/50" /></div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <Badge className="bg-primary">Sponsored by MrDGN</Badge>
          </div>
        </div>
        <div className="lg:col-span-3 p-6 md:p-8 flex flex-col">
          <Badge variant="secondary" className="mb-2 w-fit">{typeLabel}</Badge>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{event.title}</h3>
          {event.presenter && <p className="text-sm text-primary font-medium mb-3">Presented by {event.presenter}</p>}
          <p className="text-muted-foreground text-sm mb-4 flex-1">{event.description}</p>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            {event.event_date && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" />
                {event.event_date}{event.event_time ? ` · ${event.event_time}` : ""}
              </span>
            )}
            {(event.venue || event.location) && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {[event.venue, event.venue_address, event.location].filter(Boolean).join(", ")}
              </span>
            )}
            {event.contact_phones.length > 0 && (
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" />{event.contact_phones.join(", ")}</span>
            )}
          </div>
          {event.featured_artists.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Featuring</p>
              <p className="text-sm">{event.featured_artists.slice(0, 8).join(", ")}{event.featured_artists.length > 8 ? " & more" : ""}</p>
            </div>
          )}
          {hasTicketInfo && (
            <div className="text-xs text-muted-foreground mb-3">
              {ticketInfo.regular && <span>Regular: {String(ticketInfo.regular)}</span>}
              {ticketInfo.vip && <span className="ml-3">VIP: {String(ticketInfo.vip)}</span>}
            </div>
          )}
          {event.extra_note && <p className="text-xs text-muted-foreground italic mb-3">{event.extra_note}</p>}
          <div className="flex flex-wrap gap-2">
            {event.highlights.slice(0, 5).map((h) => (
              <Badge key={h} variant="outline" className="text-xs">{h}</Badge>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Badge variant="secondary" className="text-sm px-3 py-1">Completed</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

const Events = () => {
  useScrollReveal();
  const { data: pastEvents = [], isLoading: pastLoading } = usePastEvents();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-32 md:pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className={`${LAYOUT.containerNarrow} text-center scroll-reveal`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Event Sponsorship</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Events We&apos;ve <span className="gradient-text">Sponsored</span>
            </h1>
            <p className="text-muted-foreground">
              Concerts, comedy shows, and cultural expos we&apos;re proud to have supported.
            </p>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className={LAYOUT.section}>
        <div className="container mx-auto px-4">
          <div className={LAYOUT.containerNarrow}>
            <div className="text-center mb-10 scroll-reveal">
              <h2 className={LAYOUT.sectionTitle}>
                Past <span className="gradient-text">Events</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Events we&apos;ve proudly sponsored
              </p>
            </div>

            <div className="space-y-8">
              {pastLoading ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-[3/4] bg-muted animate-pulse" />
                      <CardContent className="p-4 space-y-2">
                        <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-muted rounded animate-pulse w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : pastEvents.length > 0 ? (
                pastEvents.map((event) => <PastEventCard key={event.id} event={event} />)
              ) : (
                <p className="text-center text-muted-foreground py-12">No past events to display. Check back soon.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events — Coming Soon */}
      <section className={LAYOUT.section}>
        <div className="container mx-auto px-4">
          <div className={LAYOUT.containerNarrow}>
            <div className="text-center mb-8 scroll-reveal">
              <h2 className={LAYOUT.sectionTitle}>
                Upcoming <span className="gradient-text">Events</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Our next sponsorship will be announced here
              </p>
            </div>

            <Card className="border-2 border-dashed border-primary/30 bg-primary/5 overflow-hidden scroll-reveal">
              <CardContent className="p-10 md:p-14 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  We&apos;re in talks for our next event partnership. Follow us or check back later for updates.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm">
                    Have an event? Get in touch
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${LAYOUT.sectionSm} bg-muted/30`}>
        <div className="container mx-auto px-4">
          <div className={`${LAYOUT.containerNarrow} text-center scroll-reveal`}>
            <h2 className="text-xl font-bold mb-4">Interested in <span className="gradient-text">Partnership?</span></h2>
            <p className="text-muted-foreground text-sm mb-6">
              We&apos;re open to supporting events that elevate Nigerian entertainment.
            </p>
            <Link to="/contact">
              <Button size="lg" className="hero-glow">
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
