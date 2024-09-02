import Image from "next/image";

const values = [
    {
      title: "Focused on women safety",
      image:"safewomen.svg",
      description: "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
    },
    {
      title: "Low cost and safety",
      image:"cost.svg",
      description: "Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.",
    },
    {
      title: "Leveraging technologies",
      image:"tech.svg",
      description: "Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.",
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