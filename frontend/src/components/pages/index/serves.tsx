import { Newspaper, MessageSquare, BookOpen, Users } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className=" bg-white" >
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">Comprehensive content solutions for our readers</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-lg">
            <Newspaper className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Expert Articles</h2>
            <p className="text-gray-600">In-depth articles and analysis from industry experts covering the latest trends and insights.</p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Community Discussions</h2>
            <p className="text-gray-600">Engage with our community through comments, forums, and interactive discussions.</p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Tutorial Series</h2>
            <p className="text-gray-600">Step-by-step guides and tutorials to help you master new skills and concepts.</p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Expert Network</h2>
            <p className="text-gray-600">Connect with industry professionals and expand your professional network.</p>
          </div>
        </div>

        <div className="mt-16 bg-blue-100 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-700 mb-6">Join our community and gain access to all our premium content and services.</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Join Now
          </button>
        </div>
      </div>
    </div>
  )
}