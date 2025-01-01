import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

const trendingTopics = [
  { name: 'Artificial Intelligence', slug: 'ai', color: 'bg-blue-500' },
  { name: 'Sustainable Tech', slug: 'sustainable-tech', color: 'bg-green-500' },
  { name: 'Blockchain', slug: 'blockchain', color: 'bg-purple-500' },
  { name: 'UX Design', slug: 'ux-design', color: 'bg-pink-500' },
  { name: 'Cloud Computing', slug: 'cloud-computing', color: 'bg-indigo-500' },
]

export default function TrendingTopics() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-4xl font-bold text-center">Trending Topics</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {trendingTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/topic/${topic.slug}`}
              className={`${topic.color} text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

