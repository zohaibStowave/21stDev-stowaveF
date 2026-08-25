import Link from 'next/link';

export default function Collections() {
  return (
    <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
          Explore Our Collections
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Discover the latest trends in premium apparel and exclusive footwear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Stowave Collection Card */}
        <Link 
          href="/collections/stowave" 
          className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block h-[400px] cursor-pointer"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
          
          {/* Background Image (Clothing placeholder) */}
          <img
            src="/stowaveCollection.jpeg"
            alt="Stowave Apparel"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
              Stowave
            </h3>
            <p className="text-gray-200 mb-6 font-medium">
              Premium Apparel Collection
            </p>
            <span className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-gray-100 transition-colors">
              Shop Stowave
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Ezzywalk Collection Card */}
        <Link 
          href="/collections/ezzywalk" 
          className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block h-[400px] cursor-pointer"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
          
          {/* Background Image (Footwear placeholder) */}
          <img
            src="/ezzywalkCollection.jpeg"
            alt="Ezzywalk Footwear"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
              Ezzywalk
            </h3>
            <p className="text-gray-200 mb-6 font-medium">
              Exclusive Footwear Collection
            </p>
            <span className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-gray-100 transition-colors">
              Shop Ezzywalk
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}