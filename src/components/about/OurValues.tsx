import React from 'react';

const values = [
  {
    title: "Be world-class",
    description: "At Gosang, we deliver world-class carpooling solutions focused on women's safety and affordability. Leveraging advanced technology, we offer low-cost rides, verified drivers, and real-time tracking, ensuring a safe, secure, and premium travel experience for women everywhere.",
  },
  {
    title: "Share everything you know",
    description: "Make sure all drivers undergo thorough background checks and verifications, including identity verification, driving records, and criminal background checks Women-Only Rides  Provide the option for women to book rides with female drivers or join women-only carpools to increase comfort and trust."
             
  },
  {
    title: "Embrace Continuous Learning",
    description: "We believe in constantly evolving by staying updated with the latest technologies and industry practices. Growth comes from learning, and we encourage our team and users to never stop improving."
  },
  {
    title: "Foster a Supportive Community",
    description: "Building a safe, inclusive environment for our users and employees is our priority. We promote kindness, understanding, and support to ensure that everyone feels valued and heard."
  },
  {
    title: "Take Ownership",
    description: "We encourage accountability at every level. Taking responsibility for our actions drives us to deliver reliable services and create trust within our community of users."
  },
  {
    title: "Balance Work and Relaxation",
    description: "We understand the importance of maintaining a healthy work-life balance. By encouraging downtime and relaxation, we help our team and users stay energized and motivated."
  }
  
];

const OurValues = () => {
  return (
    <section className="py-16 px-4 lg:px-24 bg-white">
      <div className="container">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Objective</h2>
        <p className="text-lg text-gray-500 mb-12">
          Gosang Promise you to provide low cost and safe rides throughout your journey with live tracking safety systems
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
