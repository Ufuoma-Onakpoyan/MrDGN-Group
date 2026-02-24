import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { Card, CardContent } from "@/components/ui/card";
import { LAYOUT } from "@/lib/layout";

const MAP_EMBED_URL = 'https://www.google.com/maps?q=6.2339308,6.6340773&z=17&output=embed';
const MAP_PLACE_URL = 'https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu';

const OfficeMap = () => (
  <Card className="h-64 md:h-80 scroll-reveal border-0 shadow-lg overflow-hidden">
    <CardContent className="p-0 h-full">
      <div className="w-full h-full relative">
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MrDGN Head Office - Asaba, Delta State"
          className="w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/90 text-center text-sm">
          <p className="font-medium">Head Office, Asaba, Delta State, Nigeria</p>
          <a href={MAP_PLACE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Open in Google Maps
          </a>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ContactPage = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className={`${LAYOUT.section} pt-32 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-background via-background to-primary/5`}>
        <div className="container mx-auto px-4">
          <div className={`${LAYOUT.containerNarrow} text-center scroll-reveal`}>
            <h1 className={`${LAYOUT.title} text-4xl md:text-5xl lg:text-6xl`}>
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Event partnership enquiries, sponsorship discussions, or general questions—we&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={LAYOUT.section}>
        <div className="container mx-auto px-4">
          <div className={LAYOUT.containerWide}>
            <div className="text-center mb-10 scroll-reveal">
              <h2 className={LAYOUT.sectionTitle}>Find Our <span className="gradient-text">Head Office</span></h2>
              <p className={`${LAYOUT.sectionIntro} mx-auto`}>
                Asaba, Delta State, Nigeria. Use the map below or open in Google Maps for directions.
              </p>
            </div>
            <OfficeMap />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Contact />

      <Footer />
    </div>
  );
};

export default ContactPage;