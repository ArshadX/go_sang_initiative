import Image from "next/image";

const values = [
    {
      title: "Focused on women safety",
      image:"safewomen.svg",
      description: "At Gosang, we prioritize women's safety with secure, reliable, and community-driven carpooling solutions. Our platform empowers women to travel confidently, offering verified drivers, real-time tracking, and 24/7 support to ensure peace of mind on every ride.",
    },
    {
      title: "Low cost and safety",
      image:"cost.svg",
      description: "we provide safe and affordable carpooling solutions, especially focused on women's safety. With verified drivers, real-time tracking, and budget-friendly rides, we ensure a secure and cost-effective way to travel with confidence.",
    },
    {
      title: "Leveraging technologies",
      image:"tech.svg",
      description: "we combine cutting-edge technology with safety and affordability to offer women a secure carpooling experience. Our platform ensures low-cost rides, verified drivers, real-time tracking, and safety features, all powered by advanced tech to make your commute safe and reliable.",
    },
];

export default function Objectives (){
    return (
        <section className="py-16 px-4 lg:px-24 bg-white">
            <div className="container">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Objective</h2>
              <p className="text-lg text-gray-500 mb-12 text-center">
                Our core objective is to provide safe and low cost ride for both riders and drivers using cutting edge technologies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className=" flex flex-col items-center">
                    <div className="rounded-full bg-red-700 overflow-clip">
                        <Image src={`/images/about/${value.image}`} alt={"objective"} width={200} height={200} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
        </section>
    )
}