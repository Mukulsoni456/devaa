import donationImage from '../assets/gallery3.jpg'
import { Link } from 'react-router-dom';
export default function DonationSection() {
    return (
      <section className="relative w-full h-[500px] flex items-center justify-center text-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${donationImage})` }}
        ></div>
  
        {/* Overlay for Better Readability */}
        <div className="absolute inset-0 bg-orange-500 bg-opacity-50"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
        {/* Content */}
        <div className="relative z-10 text-white px-6 ">
          <h2 className="text-4xl md:text-6xl font-extrabold">
          Offer Your Devotion
          </h2>
  
          {/* Stats Section */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 sm:gap-20">
            <StatCard number="1969+" label="Vast Audience" />
            <StatCard number="999+" label="Qualified Preachers" />
            <StatCard number="389+" label="Celebrate Events" />

          </div>
          <div className='flex justify-center items-center'>
          <Link to='/donation' > <div className='bg-[#eca427] text-black p-4 mt-8 rounded-md w-full sm:w-24 '>Donate</div> </Link>
          </div>
        </div>
      </section>
    );
  }
  
  // Stats Component for Reusability
  function StatCard({ number, label }) {
    return (
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold">{number}</p>
        <p className="text-[#eca427] font-semibold">{label}</p>
      </div>
    );
  }
  