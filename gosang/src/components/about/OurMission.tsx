// components/OurMission.js
export default function OurMission() {
    return (
      <section className="py-16 px-4 lg:px-24 bg-white ">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Mission Text Section */}
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
            At GoSang, our mission is to revolutionize the way people travel by offering a convenient, cost-effective, and eco-friendly carpooling service. We are committed to reducing traffic congestion, lowering 
            carbon emissions, and building stronger communities by connecting people who share similar routes. By prioritizing safety, reliability, and sustainability, we strive to make every journey a positive experience for both our passengers
             and the planet. Together, we are driving towards a greener future and a more connected world.
            </p>
            <p className="text-gray-600">
            Our mission is to transform daily commutes into shared journeys that benefit both people and the planet. By offering a seamless and reliable carpooling
             service, we aim to reduce the environmental impact of transportation, cut down commuting costs, and foster a sense of community among travelers. At [Your Carpool Company Name],
             we believe in creating a future where transportation is more sustainable, affordable, and enjoyable for everyone."
            </p>
            <p className="text-gray-600">
            Our mission is to empower commuters to make smarter, greener, and more economical travel choices through carpooling. By leveraging technology and innovation, [Your Carpool Company Name] aims to reduce the number of vehicles on the road, decrease transportation costs, and build a network of like-minded individuals who share a commitment to sustainability. Together, we are paving the way for a cleaner, less congested future
            </p>
          </div>
  
          {/* Stats Section */}
          <div className="flex-1 flex flex-col justify-start space-y-8">
            <div>
              <h3 className="text-4xl font-bold text-gray-900">44 million</h3>
              <p className="text-gray-500">Transactions every 24 hours</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">$119 trillion</h3>
              <p className="text-gray-500">Assets under holding</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">46,000</h3>
              <p className="text-gray-500">New users annually</p>
            </div>
          </div>
        </div>
      </section>
    );
}
