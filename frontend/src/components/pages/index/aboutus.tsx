import { User, Book, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className=" bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">About Our Blog</h1>
          <p className="text-xl text-gray-600">Sharing insights and knowledge with our community</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Our Team</h2>
            <p className="text-gray-600">Expert writers and industry professionals dedicated to quality content</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <Book className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Our Mission</h2>
            <p className="text-gray-600">Empowering readers with valuable insights and practical knowledge</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Our Values</h2>
            <p className="text-gray-600">Committed to authenticity, quality, and continuous learning</p>
          </div>
        </div>

        <div className="bg-blue-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">Founded in 2024, our blog has become a trusted source of information for readers worldwide. We believe in the power of knowledge sharing and community building.</p>
          <p className="text-gray-700">Our team of expert writers and industry professionals work tirelessly to bring you the highest quality content, keeping you informed and inspired.</p>
        </div>
      </div>
    </div>
  )
}