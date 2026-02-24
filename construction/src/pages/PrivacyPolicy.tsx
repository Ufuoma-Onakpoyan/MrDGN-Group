import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - MR DGN Constructions';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <article className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2025</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-secondary-foreground/90">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p>
                MR DGN Constructions and Developers Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. By using our website, you consent to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
              <p>
                We may collect information you provide directly (e.g., name, email, phone number, address, project details) when you contact us, request a quote, subscribe to our newsletter, or apply for a job. We may also collect information automatically when you visit our site, such as IP address, browser type, and pages visited, to improve our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p>
                We use your information to respond to inquiries, provide quotes, send newsletters and updates (where you have opted in), process job applications, improve our website and services, and comply with legal obligations. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Sharing of Information</h2>
              <p>
                We may share your information with service providers who assist us in operating our website and business (e.g., hosting, email delivery), and when required by law or to protect our rights. We require such parties to keep your information confidential and use it only for the purposes we specify.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the Internet is fully secure; we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
              <p>
                Depending on applicable law, you may have the right to access, correct, or delete your personal information, or to withdraw consent for marketing communications. To exercise these rights or ask questions about our data practices, contact us at construction@mrdgngroup.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Cookies and Tracking</h2>
              <p>
                Our website may use cookies and similar technologies to enhance your experience and analyze usage. You can adjust your browser settings to refuse cookies; some features may not function properly if you do.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will be revised, and we encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
              <p>
                For questions about this Privacy Policy or our data practices, contact us at: construction@mrdgngroup.com, +234 813 532 4467, or Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state.
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
