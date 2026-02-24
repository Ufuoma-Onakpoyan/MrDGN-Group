import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
          Privacy <span className="text-gold-gradient">Policy</span>
        </h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-GB")}</p>
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">1. Introduction</h2>
            <p>Mansa Luxe Realty Limited (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">2. Information We Collect</h2>
            <p>We may collect: contact information (name, email, phone, address) when you enquire or use our contact form; information you provide when registering interest in a property; usage data to improve our website; and cookies as described in our Cookie notice.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">3. How We Use Your Information</h2>
            <p>We use your information to respond to enquiries, provide services, send relevant property information if requested, improve our website and services, and comply with legal obligations.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">4. Sharing and Security</h2>
            <p>We do not sell your personal data. We may share information with trusted service providers or when required by law. We implement appropriate measures to protect your data and retain it only as long as necessary.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">5. Cookies and Tracking</h2>
            <p>We may use cookies and similar technologies to enhance your experience, analyse site traffic, and personalise content. You can control cookies through your browser settings. Essential cookies are required for the site to function.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">6. Data Retention</h2>
            <p>We retain your information only for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Enquiry data is typically retained for up to three years unless a longer period is required by law.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif font-semibold text-foreground mb-2">7. Your Rights and Contact</h2>
            <p>You may have the right to access, correct, delete, or restrict processing of your data. For privacy-related questions or to exercise your rights, contact MansaLuxeRealty@mrdgngroup.com or +234 813 532 4467. Mansa Luxe Realty Limited, Head Office, Asaba, Delta State, Nigeria.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
