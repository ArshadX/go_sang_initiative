import Breadcrumb from "../common/Breadcrumb";

export default function AboutHero() {
  return (
    <section className="py-14 px-4 lg:px-24 bg-cyan-300">
    <div className="max-w-7xl isolate mx-auto  flex flex-col lg:flex-row gap-12 justify-between items-center ">
        <div className=" flex-1 space-y-6 p-6 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              We are changing the way people connect to Share ride.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              In recent decades, little progress has been made in improving commuting. There are two options: public transport and the car. Public transport lacks flexibility and is often saturated or unreliable. They serve predetermined axes, mainly in a starry network. The car offers flexibility and comfort, but at high cost. 70% of French people use their cars to work, with an annual budget of 6,049 euros for maintenance. Congestion, pollution, and self-isolation are common problems. Alternatives such as cycling, walking, or scooting are mostly suitable for urban areas for short distances. For peri-urban or rural areas, Tristan Croiset and Olivier Binet founded Karos, convinced that the French are ready to share their vehicles.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-sky-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
              <Breadcrumb pageName="about" description="This is demo you are seeing" />
            </div>
          </div>
          <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
        </div>   
      
      <div className="flex-1 space-y-6">
          <div className="mx-auto flex">     
            <img 
              src="/images/about/aboutbus.webp" 
              alt="image not found" 
              className="w-fit h-auto "  // Add this line to increase top margin
            />
          </div>
      </div>

    </div>
    </section>
  );
}
