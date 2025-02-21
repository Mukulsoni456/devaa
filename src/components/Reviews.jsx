import { useState, useEffect } from "react";

export default function TestimonialSection() {
  const testimonials = [
    {
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      author: "John Doe"
    },
    {
      text: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs"
    },
    {
      text: "Good design is obvious. Great design is transparent.",
      author: "Joe Sparano"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 md:py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Side Static Image */}
        <div className="md:w-1/2 flex justify-center">
          <img 
            src={require("../assets/gallery1.jpg")} 
            alt="Organisation" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side Testimonial Content */}
        <div className="md:w-1/2 text-center md:pl-12 md:text-left mt-8 md:mt-0">
          <h2 className="text-5xl font-bold text-gray-800">What Devotee Say</h2>
          <h3 className="text-xl font-semibold text-gray-700 mt-2">Reviews</h3>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"{testimonials[currentIndex].text}"</p>
            <p className="mt-4 text-gray-800 font-semibold">- {testimonials[currentIndex].author}</p>
          </div>
        </div>
      </div>
    </section>
  );
}