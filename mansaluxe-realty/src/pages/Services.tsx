import { 
  Home, 
  Key, 
  TrendingUp, 
  Shield, 
  Calculator, 
  Users,
  Building,
  FileText,
  Briefcase,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description: "Expert guidance through every step of buying or selling luxury properties in Nigeria's premium markets.",
      features: [
        "Market analysis and valuation",
        "Property marketing and promotion",
        "Negotiation and closing support",
        "Legal documentation assistance"
      ]
    },
    {
      icon: Key,
      title: "Luxury Rentals",
      description: "Comprehensive rental services for both tenants seeking premium accommodations and landlords maximizing returns.",
      features: [
        "Tenant screening and verification",
        "Rental pricing optimization",
        "Property showcasing and tours",
        "Lease agreement management"
      ]
    },
    {
      icon: Building,
      title: "Property Management",
      description: "Full-service property management ensuring your investments are maintained to the highest standards.",
      features: [
        "24/7 property maintenance",
        "Tenant relations management",
        "Financial reporting and analytics",
        "Property improvement consulting"
      ]
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Strategic investment guidance to help you build and optimize your luxury real estate portfolio.",
      features: [
        "Market trend analysis",
        "Investment opportunity identification",
        "Portfolio diversification strategies",
        "ROI optimization consulting"
      ]
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description: "Professional property appraisals using advanced methodologies and comprehensive market data.",
      features: [
        "Comprehensive market analysis",
        "Detailed valuation reports",
        "Investment potential assessment",
        "Comparative market studies"
      ]
    },
    {
      icon: Shield,
      title: "Legal & Documentation",
      description: "Complete legal support ensuring all transactions are secure and compliant with Nigerian property law.",
      features: [
        "Title verification and due diligence",
        "Contract preparation and review",
        "Regulatory compliance assistance",
        "Dispute resolution support"
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "Initial meeting to understand your specific requirements and preferences."
    },
    {
      step: "02",
      title: "Property Search",
      description: "Curated selection of properties matching your criteria and budget."
    },
    {
      step: "03",
      title: "Viewing & Analysis",
      description: "Guided property tours with detailed market analysis and recommendations."
    },
    {
      step: "04",
      title: "Negotiation",
      description: "Expert negotiation to secure the best terms and conditions for your transaction."
    },
    {
      step: "05",
      title: "Documentation",
      description: "Complete legal documentation and compliance verification process."
    },
    {
      step: "06",
      title: "Completion",
      description: "Seamless transaction completion with ongoing support and aftercare."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Our <span className="text-gold-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive luxury real estate services tailored to your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="luxury-card p-8 h-full">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Our <span className="text-gold-gradient">Process</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A streamlined approach ensuring exceptional results at every stage of your property journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Specialized <span className="text-gold-gradient">Solutions</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tailored services for unique client requirements and complex property transactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="luxury-card p-8">
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Corporate Services</h3>
              <p className="text-muted-foreground mb-4">
                Specialized real estate solutions for businesses, including office spaces, corporate housing, 
                and investment property acquisition for institutional clients.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Executive housing programs</li>
                <li>• Commercial property acquisition</li>
                <li>• Corporate relocation services</li>
                <li>• Bulk property transactions</li>
              </ul>
              {/* TODO: Add contact form for corporate inquiries */}
            </div>
            
            <div className="luxury-card p-8">
              <Briefcase className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">VIP Concierge</h3>
              <p className="text-muted-foreground mb-4">
                Exclusive concierge services for high-net-worth individuals requiring discrete, 
                personalized attention for their luxury property needs.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Private property viewings</li>
                <li>• Off-market property access</li>
                <li>• International client services</li>
                <li>• 24/7 dedicated support</li>
              </ul>
              {/* TODO: Add VIP contact form */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="luxury-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Contact our expert team today to discuss your luxury real estate needs and discover 
              how we can help you achieve your property goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-luxury inline-flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Schedule Consultation</span>
              </Link>
              <Link to="/contact" className="btn-outline-luxury inline-flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Download Service Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;