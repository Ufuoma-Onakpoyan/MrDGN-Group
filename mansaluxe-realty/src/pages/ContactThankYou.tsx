import { Link } from "react-router-dom";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const ContactThankYou = () => {
  return (
    <Layout>
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 py-16">
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Contact Received
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your inquiry! We have received your message and will get back to you within 24 hours.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg" className="btn-luxury">
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="w-5 h-5" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="btn-outline-luxury">
            <Link to="/contact" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Contact
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ContactThankYou;
