// components/OurMission.js
export default function OurMission() {
    return (
      <section className="py-16 px-4 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto  flex flex-col lg:flex-row gap-12 lg:justify-start ">
          {/* Mission Text Section */}
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Our mission</h2>
            <p className="text-gray-600">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget
              aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend
              egestas fringilla sapien.
            </p>
            <p className="text-gray-600">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
            <p className="text-gray-600">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
              fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
              adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
            </p>
          </div>
  
          {/* Stats Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
          <div className=" justify-items-start items-start space-y-8">
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
        </div>
      </section>
    );
}