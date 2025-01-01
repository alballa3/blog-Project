import { Search } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            Explore the World of Ideas
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            Dive into a universe of knowledge, innovation, and inspiration. 
            Discover stories that ignite your curiosity and fuel your passion.
          </p>
          <div className="flex justify-center items-center space-x-4 bg-white/20 backdrop-blur-md rounded-full p-2 animate-fade-in-up animation-delay-400">
            <Search className="w-6 h-6 text-white/70" />
            <input
              type="text"
              placeholder="Search for articles, topics, or authors..."
              className="bg-transparent placeholder-white/70 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-full max-w-lg"
            />
            <button className="bg-white hover:bg-blue-50 text-blue-600 font-bold py-2 px-6 rounded-full transition duration-300">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

