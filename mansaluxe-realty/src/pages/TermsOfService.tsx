import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Terms of <span className="text-gold-gradient">Service</span>
        </h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">1. Agreement to Terms</h2>
            <p>By accessing or using the website and services of Mansa Luxe Realty Limited, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">2. Use of Website</h2>
            <p>You may use our website for lawful purposes only. You must not use it to transmit harmful, offensive, or illegal content, or to attempt to gain unauthorised access to our systems or data. Property listings and information are for general information only and do not constitute an offer or contract.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">3. Property Listings and Services</h2>
            <p>We endeavour to ensure that property information is accurate but do not guarantee completeness or suitability for any particular purpose. Viewing or enquiring about a property does not create a contractual relationship until formal agreements are signed. Our estate agency and related services are subject to separate terms and conditions provided at the time of engagement.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">4. Intellectual Property</h2>
            <p>All content on this website (including text, images, logos, and design) is owned by Mansa Luxe Realty Limited or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use our content for commercial purposes without our prior written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">5. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Mansa Luxe Realty Limited shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our liability for direct losses shall be limited to the extent permitted by applicable law.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">6. Links to Third-Party Sites</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the content or practices of those sites. Your use of third-party links is at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">7. Governing Law</h2>
            <p>These terms are governed by the laws of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts of Nigeria.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">8. Changes</h2>
            <p>We may update these Terms of Service from time to time. Continued use of our website after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">9. Contact</h2>
            <p>For questions about these terms: MansaLuxeRealty@mrdgngroup.com or +234 813 532 4467. Mansa Luxe Realty Limited, Head Office, Asaba, Delta State, Nigeria.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
