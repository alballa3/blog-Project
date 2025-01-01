import Link from 'next/link'

const categories = [
  { name: 'Technology', slug: 'technology', count: 15 },
  { name: 'Design', slug: 'design', count: 8 },
  { name: 'Development', slug: 'development', count: 12 },
  { name: 'Business', slug: 'business', count: 10 },
  { name: 'Lifestyle', slug: 'lifestyle', count: 5 },
]

export default function Categories() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              {category.name} ({category.count})
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

