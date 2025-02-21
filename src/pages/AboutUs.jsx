import React from "react";
import hero from '../assets/hero.png'
import image1 from '../assets/gallery2.jpg'
const AboutUs = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center text-white flex items-center justify-center" 
           style={{ backgroundImage: `url(${hero})` }}>
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase">Our Achievements</h2>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h3 className="text-yellow-600 uppercase text-sm">Welcome to our temple</h3>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          We are a Hindu that Believes in Lord Rama and Vishnu Deva
        </h1>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      {/* Images Section */}
      <div className="md:flex md:justify-center px-16 md:px-20 md:space-x-4 md:relative">
  {/* Left Image (Hidden on Mobile) */}
  <div className="hidden md:block rounded-lg overflow-hidden">
    <img src={image1} alt="Temple 1" className="w-56 h-96 object-cover" />
  </div>

  {/* Center Image (Always Visible) */}
  <div className="rounded-lg overflow-hidden relative -top-6">
    <img src={image1} alt="Temple 2" className="w-56 h-full object-cover" />
  </div>

  {/* Right Image (Hidden on Mobile) */}
  <div className="hidden md:block rounded-lg overflow-hidden">
    <img src={image1} alt="Temple 3" className="w-56 h-full object-cover" />
  </div>
</div>


      {/* Benefits Section */}
      <div className="text-center py-16">
        <h3 className="text-yellow-600 uppercase text-sm">Benefit</h3>
        <h1 className="text-3xl md:text-4xl font-bold">The Benefits of Joining Our Temple</h1>
      </div>

      {/* Donate Events Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20 pb-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold">Donate Events</h2>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
          <img src={image1} alt="Donate Events" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* All Are Welcome Section */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20 pb-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold">All Are Welcome</h2>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
          <img src={image1} alt="All are welcome" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;