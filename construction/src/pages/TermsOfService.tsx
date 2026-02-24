import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  useEffect(() => {
    document.title = 'Terms of Service - MR DGN Constructions';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <article className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2025</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-secondary-foreground/90">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website and services of MR DGN Constructions and Developers Limited (&quot;Company,&quot; &quot;we,&quot; &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use of Website</h2>
              <p>
                You may use our website for lawful purposes only. You must not use it in any way that violates applicable laws, infringes the rights of others, or disrupts the operation or security of the site. You are responsible for the accuracy of any information you submit to us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Services and Quotes</h2>
              <p>
                Information on this website about our construction services, products, and projects is for general information only. Quotes and proposals are subject to separate written agreements. We reserve the right to modify or discontinue services without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
              <p>
                All content on this website, including text, images, logos, and design, is the property of MR DGN Constructions or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use such content without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of viruses. Your use of the site is at your sole risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, MR DGN Constructions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or any content thereon. Our total liability shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Links to Third-Party Sites</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the content or practices of those sites. Inclusion of a link does not imply endorsement. Use of third-party sites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Privacy</h2>
              <p>
                Your use of the website is also governed by our Privacy Policy. By using the site, you consent to the collection and use of information as described in that policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Modifications</h2>
              <p>
                We may modify these Terms of Service at any time. Changes will be effective upon posting to the website with an updated &quot;Last updated&quot; date. Your continued use of the site after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any disputes arising in connection with these terms or the website shall be subject to the exclusive jurisdiction of the courts of Nigeria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Contact</h2>
              <p>
                For questions about these Terms of Service, contact us at: construction@mrdgngroup.com, +234 813 532 4467, or Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state.
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default TermsOfService;
