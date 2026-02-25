import { Award, Target, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ceoPortrait from "../assets/mrdgn-ceo-portrait.png";

const About = () => {
  const teamMembers = [
    {
      name: "Onakpoyan Success",
      position: "Chief Executive Officer, MrDGN Group",
      image: ceoPortrait,
      bio: "A seasoned businessman and developer from Delta State, Nigeria, MrDGN leads the MrDGN Group with a vision to redefine luxury and excellence. His strategic leadership guides Mansa Luxe Realty Limited and the broader Group in delivering exceptional real estate and lifestyle experiences across Nigeria and beyond."
    },
    {
      name: "Ufuoma Onakpoyan",
      position: "Realtor",
      image: "/assets/ufuoma-onakpoyan.png",
      bio: "Ufuoma has helped in the sale of many of our updated properties, bringing dedicated service and deep market expertise to every client transaction."
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in every aspect of our service, from property selection to client experience."
    },
    {
      icon: Users,
      title: "Integrity",
      description: "Trust and transparency form the foundation of every relationship we build with our clients and partners."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We leverage cutting-edge technology and market insights to deliver superior real estate solutions."
    },
    {
      icon: Eye,
      title: "Vision",
      description: "We envision a Nigeria where luxury living is accessible and every property transaction exceeds expectations."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              About <span className="text-gold-gradient">Mansa Luxe Realty Limited</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A subsidiary of MrDGN Group, pioneering luxury real estate in Nigeria since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-black rounded-lg flex items-center justify-center p-12 min-h-96">
              <img 
                src="/assets/logo-rose-gold.png" 
                alt="Mansa Luxe Realty Limited" 
                className="max-w-full max-h-64 w-auto h-auto object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded as a subsidiary of the prestigious MrDGN Group, Mansa Luxe Realty Limited emerged from a vision to 
                  revolutionize Nigeria's luxury real estate market. Since our inception in 2020, we have been 
                  dedicated to connecting discerning clients with exceptional properties across Nigeria's most 
                  sought-after locations.
                </p>
                <p>
                  Our journey began with a simple yet powerful mission: to redefine luxury living in Nigeria. 
                  Through careful curation of premium properties and unwavering commitment to excellence, we have 
                  established ourselves as the trusted partner for those who seek nothing but the finest in real estate.
                </p>
                <p>
                  Today, Mansa Luxe Realty Limited stands as a testament to Nigerian excellence in the global luxury real 
                  estate market, with a portfolio that spans from Lagos's iconic Victoria Island to Abuja's 
                  prestigious Central Area.
                </p>
                {/* TODO: Replace with actual company history and achievements */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="luxury-card p-8">
              <Target className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide unparalleled luxury real estate services that exceed expectations, connecting our 
                clients with properties that reflect their aspirations and lifestyle while maintaining the 
                highest standards of professionalism and integrity.
              </p>
              {/* TODO: Update with actual mission statement */}
            </div>
            <div className="luxury-card p-8">
              <Eye className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be Africa's premier luxury real estate company, setting new benchmarks for excellence and 
                innovation while contributing to the development of world-class residential and commercial 
                spaces across Nigeria and beyond.
              </p>
              {/* TODO: Update with actual vision statement */}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Our <span className="text-gold-gradient">Values</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Mansa Luxe Realty Limited.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Meet Our <span className="text-gold-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The experienced professionals behind Mansa Luxe Realty Limited's success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="luxury-card overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
            
            {/* TODO: Add more team member cards */}
            <Link to="/careers" className="luxury-card p-8 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2">Join Our Team</h3>
              <p className="text-muted-foreground text-sm mb-4">
                We're always looking for exceptional talent to join our growing team.
              </p>
              <span className="text-primary font-semibold hover:text-primary/80">
                View Careers
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Parent Company */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="luxury-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Part of the <span className="text-gold-gradient">MrDGNGroup</span> Family
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Mansa Luxe Realty Limited is proud to be a subsidiary of MrDGN Group, a diversified conglomerate 
              with interests spanning real estate, technology, and investment. This partnership 
              provides us with the resources, expertise, and network to deliver exceptional value 
              to our clients while maintaining our commitment to luxury and excellence.
            </p>
            {/* TODO: Add more details about MrDGNGroup relationship and benefits */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;