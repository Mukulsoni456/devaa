import gallery1 from '../assets/gallery1.jpg'

export default function ImageGrid() {
    const images = [
      "gallery3.jpg",
      "gallery4.jpg",
      "gallery1.jpg",



    ];
  
    return (
        <section className="py-12 ">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-10">
            {/* Left Side Content */}
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <p className="mt-4 text-sm text-gray-600">
                Our Gallery
              </p>
              <h2 className="mt-2 text-3xl md:w-72 font-bold text-gray-800 uppercase ">Dharma leads to righteousness</h2>

              <p className="mt-4 text-gray-600">
                Discover stunning visuals and artistic expressions that capture the beauty of the world.
              </p>
              <button className="mt-6 bg-[#eca427] text-white py-3 px-6  shadow-lg hover:bg-blue-700 transition-all">
                View Gallery
              </button>
            </div>
    
            {/* Right Side Image Grid */}
            <div className="md:w-1/2 grid grid-cols-3 md:grid-cols-3 gap-4 grid-rows-[auto]">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-lg shadow-lg ${
                    index === 0 || index === 3 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                  }`}
                >
                  <img
                    src={require(`../assets/${src}`)}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
