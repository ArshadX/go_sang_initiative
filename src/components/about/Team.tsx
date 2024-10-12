import Image from "next/image"

const people = [
  {
    name: 'Vimal Sharma',
    role: 'Founder',
    imageUrl:
      'vimal.jpg',
},
    {
        name: 'Mo Arshad',
        role: 'Founder',
        imageUrl:
          'arshad.jpg',
    }
    
    
  ]

export default function TeamSection(){
    return (
        <div className="py-16 px-4 lg:px-24 bg-white">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                Our leadership team is dedicated to driving innovation, safety, and community at <b> Gosang</b> With a focus on empowering users and enhancing our service through cutting-edge technology, they bring a wealth of experience and passion for making a positive impact. Together, they are committed to creating a safe, reliable, and affordable carpooling experience for everyone.
                </p>
              </div>
              <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                {people.map((person) => (
                  <li key={person.name}>
                    <div className="items-center gap-x-6">
                      <Image alt="" src={`/images/about/${person.imageUrl}`} width={500} height={500} className="rounded-lg" />
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </div>
    )     
}