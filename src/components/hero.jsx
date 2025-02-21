import hero from '../assets/hero2.png'
export default function Hero() {
    return (
      <section className="relative w-full h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>
  
        {/* Overlay (Optional, for better text visibility) */}

  
        {/* Content Area */}

      </section>
    );
  }
