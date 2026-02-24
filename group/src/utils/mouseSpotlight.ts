export const initMouseSpotlight = () => {
  let animationFrame: number;
  
  const updateMousePosition = (e: MouseEvent) => {
    // Cancel previous animation frame for smoother performance
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    animationFrame = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });
  };

  document.addEventListener('mousemove', updateMousePosition);
  
  return () => {
    document.removeEventListener('mousemove', updateMousePosition);
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  };
};