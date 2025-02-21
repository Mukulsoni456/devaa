import React, { useState } from "react";

const images = [
    "gallery3.jpg",
    "gallery4.jpg",
    "gallery1.jpg",
    "gallery3.jpg",
    "gallery4.jpg",
    "gallery1.jpg",
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image-url.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Our Prayer Gallery</h1>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setSelectedImage(require(`../assets/${src}`))}
          >
            <img 
              src={require(`../assets/${src}`)} 
              className="w-full h-96 object-cover" 
              alt="Gallery Item"
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img src={selectedImage} className="max-w-full max-h-full" alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;