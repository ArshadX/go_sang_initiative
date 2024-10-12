import Image from 'next/image';
import Breadcrumb from "../common/Breadcrumb";

export default function AboutHero() {
  return (
    <section className="py-14 px-4 lg:px-24 bg-gradient-to-r from-pink-500 via-purple-600 to-purple-900 text-white  overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 justify-between items-center">
        <div className="flex-1 space-y-6 p-6">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              We are transforming carpooling in India.
            </h1>
            <p className="mt-6 text-lg leading-8">
              Commuting in India has traditionally relied on either public transport or personal vehicles, both of which come with challenges. Public transport lacks flexibility and can be overcrowded, while personal vehicles offer comfort but at a high cost. At <b>Gosang</b>, we are bridging this gap with a car-sharing solution that is affordable, eco-friendly, and designed for your safety. Join us to reduce your carbon footprint and travel smarter.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <a
                href="#"
                className="rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-pink-700"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white hover:text-pink-300">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Image 
             src="/images/about/aboutbus.webp" 
 
            alt="Carpooling App" 
            width={500} 
            height={300} 
            className="rounded-lg shadow-lg object-contain"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-purple-700 opacity-30"
        />
      </div>
    </section>
  );
}
