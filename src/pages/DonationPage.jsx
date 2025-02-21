import React from "react";
import donation1 from "../assets/gallery1.jpg";

const DonationPage = () => {
    const donationPrograms = [
        {
          id: 1,
          image: donation1,
          title: "Gau Seva",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
          raised: 500,  // ✅ Updated to 500 rupees
        },
        {
          id: 2,
          image: donation1,
          title: "Anna daan",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
          raised: 2,  // ✅ Updated to 1000 rupees
        },
        {
          id: 3,
          image: donation1,
          title: "Sadhu Seva",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
          raised: 3,  // ✅ Updated to 2000 rupees
        },
      ];
      

  const handleDonate = (amount) => {
    const options = {
      key: "rzp_test_EXro1qHgovalTw",
      amount: amount * 100,
      currency: "INR",
      name: "Donation Platform",
      description: "Support our cause",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#f59e0b",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Donations Programme</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {donationPrograms.map((program) => (
          <div key={program.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={program.image} // ✅ Fixed: Directly using the image
              alt={program.title}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-orange-500 h-2.5 rounded-full"
                  style={{ width: `${(program.raised / program.goal) * 100}%` }}
                ></div>
              </div>
              <h2 className="font-bold text-lg">{program.title}</h2>
              <p className="text-sm text-gray-600">{program.description}</p>
              <p className="mt-2 font-semibold">Rs.{program.raised} Raised</p>
  
              <button
                onClick={() => handleDonate(program.raised)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Donate Now ➜
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationPage;
