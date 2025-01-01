import { Link } from "react-router";

const featuredAuthors = [
  { name: 'Dr. Jane Smith', role: 'AI Researcher', avatar: '/jane-smith-avatar.jpg', bio: 'Leading expert in machine learning and neural networks.' },
  { name: 'Alex Johnson', role: 'UX Designer', avatar: '/alex-johnson-avatar.jpg', bio: 'Passionate about creating intuitive and beautiful user experiences.' },
  { name: 'Sarah Lee', role: 'Blockchain Developer', avatar: '/sarah-lee-avatar.jpg', bio: 'Pioneering the future of decentralized applications.' },
]

export default function AuthorSpotlight() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">Featured Authors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAuthors.map((author, index) => (
            <div key={author.name} className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="flex items-center mb-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-blue-600">{author.name}</h3>
                  <p className="text-gray-600">{author.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{author.bio}</p>
              <Link to={`/author/${author.name.toLowerCase().replace(/ /g, '-')}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                View Profile →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

