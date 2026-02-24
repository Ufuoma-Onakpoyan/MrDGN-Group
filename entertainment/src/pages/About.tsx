import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Target, Calendar, ArrowRight, Mail } from "lucide-react";
import ceoPortrait from "@/assets/mrdgn-ceo-portrait.png";
import { LAYOUT } from "@/lib/layout";

const About = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Header />

      <main className={LAYOUT.pageTop}>
        <div className="container mx-auto px-4">
          <div className={LAYOUT.containerNarrow}>

            {/* Intro */}
            <section className="mb-16 md:mb-20 scroll-reveal">
              <div className="flex items-center gap-2 text-primary font-medium mb-4">
                <Award className="h-6 w-6" />
                Event Sponsorship
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">MrDGN Entertainment</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                MrDGN Entertainment is the event-sponsorship arm of MrDGN Group. We support concerts, comedy shows, music and fashion expos, and cultural events across Nigeria—helping bring world-class entertainment to local audiences and elevating Nigerian talent on stage.
              </p>
            </section>

            {/* What we do */}
            <section className="mb-16 md:mb-20 scroll-reveal">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Do</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  We partner with event organisers and promoters to sponsor live entertainment that matters—from headline concerts and award shows to comedy nights and multi-genre expos. Our support helps cover production costs, venue hire, marketing, and talent fees so events can deliver memorable experiences for fans.
                </p>
                <p>
                  We focus on events that celebrate Nigerian culture, showcase homegrown artists and comedians, and create safe, inclusive spaces for audiences. Whether it’s a stadium concert, a fashion and music expo, or a comedy show, we look for initiatives that align with our mission to strengthen the local entertainment industry.
                </p>
              </div>
            </section>

            {/* Why event sponsorship */}
            <section className="mb-16 md:mb-20 scroll-reveal">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Event Sponsorship</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <Target className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Supporting Talent</h3>
                  <p className="text-sm text-muted-foreground">
                    Events give artists, comedians, and creatives a platform to reach audiences. Our sponsorship helps make these opportunities possible.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <Calendar className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Building Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Live events bring people together and create lasting memories. We want to help more Nigerians experience great entertainment close to home.
                  </p>
                </div>
              </div>
            </section>

            {/* Past highlights */}
            <section className="mb-16 md:mb-20 scroll-reveal">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Events We&apos;ve Sponsored</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                We’ve been proud to support events such as the Goya Menor Homecoming Concert in Benin City, the Delta Music Comedy & Fashion Expo (Akwocha Edition) in Asaba, and M.O.P Next of Kin comedy show in Lagos. Each partnership reflects our commitment to Nigerian entertainment.
              </p>
              <Link to="/events">
                <Button size="lg" className="hero-glow group">
                  View all events
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </section>

            {/* Leadership */}
            <section className="mb-16 md:mb-20 scroll-reveal">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Leadership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-sm">
                  <img
                    src={ceoPortrait}
                    alt="Onakpoyan Success (MrDGN), CEO of MrDGN Group"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Onakpoyan Success</h3>
                  <p className="text-primary font-medium mb-4">MrDGN — CEO, MrDGN Group</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Onakpoyan Success (MrDGN) leads MrDGN Group with a focus on elevating Nigerian businesses and culture. Under his direction, MrDGN Entertainment invests in event sponsorship as a way to support the creative industry and give back to communities that have supported the Group’s growth.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 md:p-12 scroll-reveal">
              <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Are you organising an event and looking for sponsorship? We’re open to discussing partnerships that align with our values and reach.
              </p>
              <Link to="/contact">
                <Button size="lg" className="group">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
