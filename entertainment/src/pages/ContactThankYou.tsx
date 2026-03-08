import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactThankYou = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 md:pt-36 md:pb-24 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Message Sent!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for reaching out. We have received your message and will get back to you within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-glow">
                <Link to="/" className="inline-flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactThankYou;
