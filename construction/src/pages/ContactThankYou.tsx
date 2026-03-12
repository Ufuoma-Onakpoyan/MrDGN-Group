import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactThankYou = () => {
  useEffect(() => {
    const gtag = (window as unknown as { gtag?: (a: string, b: string, c?: object) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'quote_request_received', { page_title: 'Contact Thank You' });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Quote request received
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for requesting a quote. We've received your details and will get back to you within 24 hours. If your inquiry was about a specific project type, our team will tailor the response accordingly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-construction">
              <Link to="/" className="inline-flex items-center gap-2">
                <Home className="w-5 h-5" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact-us" className="inline-flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Contact
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactThankYou;
