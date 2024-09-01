export default function AboutHero() {
  return (
    <div className="bg-white flex flex-col lg:flex-row justify-center items-start">
      <div className="relative isolate px-6 pt-14 lg:px-8 lg:pt-32 flex-1">
       
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            
          </div>
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
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
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
      <div className="relative isolate px-6 pt-14 lg:px-8 lg:pt-32 flex-1">
  <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 top-18">     
    <img 
      src="/images/about/aboutbus.webp" 
      alt="image not found" 
      className="mt-8 lg:mt-16"  // Add this line to increase top margin
    />
  </div>
</div>

    </div>
  );
}
