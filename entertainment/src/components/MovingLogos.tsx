const MovingLogos = () => {
  // Sample partner/client logos - these would be replaced with actual partner logos
  const logos = [
    { name: "Netflix", logo: "🎬" },
    { name: "YouTube", logo: "📺" },
    { name: "Prime Video", logo: "🎭" },
    { name: "Nollywood", logo: "🎪" },
    { name: "Africa Magic", logo: "✨" },
    { name: "IrokoTV", logo: "🎯" },
    { name: "ROK Studios", logo: "🎥" },
    { name: "FilmOne", logo: "🎦" },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 md:py-16 bg-secondary/5 overflow-hidden scroll-reveal">
      <div className="container mx-auto px-4 mb-6">
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-2 transition-colors duration-300">
            Trusted Partners & Collaborators
          </h3>
          <p className="text-muted-foreground text-sm">
            Working with industry leaders to create exceptional content
          </p>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex space-x-16 moving-logos">
          {duplicatedLogos.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <div className="text-sm font-medium text-muted-foreground text-center whitespace-nowrap">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fade out gradients on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default MovingLogos;