import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactThankYou = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <section className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Message Sent!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for reaching out. We have received your message and will get back to you within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="button-hover hover-scale">
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
      </section>
      <Footer />
    </div>
  );
};

export default ContactThankYou;
