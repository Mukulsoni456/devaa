import { Link } from "react-router-dom";
import { FaPagelines } from "react-icons/fa"; // Temple Icon
import { GiPrayerBeads } from "react-icons/gi"; // Puja Icon
import { FaHandHoldingHeart } from "react-icons/fa"; // Donation Icon
import { GiOpenBook } from "react-icons/gi"; // Education Icon

export default function ServicesSection() {
  const services = [
    {
      title: "TEMPLE",
      description: "There are many variations of available, the majority",
      icon: <FaPagelines size={50} />,
      link: "/gallery",
    },
    {
      title: "PUJA",
      description: "There are many variations of available, the majority",
      icon: <GiPrayerBeads size={50} />,
      link: "/blogs",
    },
    {
      title: "DONATION",
      description: "There are many variations of available, the majority",
      icon: <FaHandHoldingHeart size={50} />,
      link: "/donation",
    },
    {
      title: "EDUCATION",
      description: "There are many variations of available, the majority",
      icon: <GiOpenBook size={50} />,
      link: "/gallery#pdf-section", // Link to gallery page with a specific section
    },
  ];

  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <div className="mb-4 text-orange-500">{service.icon}</div>
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
