import { Button } from "@/components/ui/button";
import { session } from "@/lib/auth";
import {
  Clock,
  User,
  ArrowRight,
  Bookmark,
  Share2,
  Heart,
  Search,
  TrendingUp,
  Eye,
} from "lucide-react";




const Index = () => {
  const trendingPosts = [
    {
      title: "The Evolution of AI in Modern Web Development",
      excerpt:
        "Explore how artificial intelligence is revolutionizing the way we build and maintain web applications",
      category: "Artificial Intelligence",
      author: "Sarah Johnson",
      date: "Mar 20, 2024",
      readTime: "8 min read",
      image: "https://placehold.co/600x400",
      views: "2.4k",
      likes: 156,
    },
    {
      title: "Mastering TypeScript: Advanced Patterns",
      excerpt:
        "Deep dive into advanced TypeScript patterns and best practices for large-scale applications",
      category: "TypeScript",
      author: "Michael Chen",
      date: "Mar 19, 2024",
      readTime: "10 min read",
      image: "https://placehold.co/600x400",
      views: "1.8k",
      likes: 142,
    },
  ];

  const latestPosts = [
    {
      title: "The Ultimate Guide to Next.js 14",
      excerpt:
        "Everything you need to know about the latest features in Next.js 14 and how to leverage them effectively",
      category: "Next.js",
      author: "David Wilson",
      date: "Mar 18, 2024",
      readTime: "12 min read",
      image: "https://placehold.co/600x400",
      views: "986",
      likes: 89,
    },
    {
      title: "Building Scalable React Applications",
      excerpt:
        "Learn the architecture patterns and best practices for building maintainable React applications",
      category: "React",
      author: "Emma Thompson",
      date: "Mar 17, 2024",
      readTime: "15 min read",
      image: "https://placehold.co/600x400",
      views: "1.2k",
      likes: 94,
    },
    {
      title: "Modern CSS Techniques",
      excerpt:
        "Discover the latest CSS features and techniques that will transform your styling workflow",
      category: "CSS",
      author: "Alex Rodriguez",
      date: "Mar 16, 2024",
      readTime: "9 min read",
      image: "https://placehold.co/600x400",
      views: "756",
      likes: 67,
    },
  ];

  const editorsPicks = [
    {
      title: "The Future of Frontend Development",
      category: "Frontend",
      date: "Mar 15, 2024",
      readTime: "7 min read",
    },
    {
      title: "Understanding Web Performance",
      category: "Performance",
      date: "Mar 14, 2024",
      readTime: "6 min read",
    },
    {
      title: "Getting Started with Web3",
      category: "Blockchain",
      date: "Mar 13, 2024",
      readTime: "8 min read",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              TechBlog
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Where Technology Meets Innovation
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-12 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <Button
              className="bg-blue-600 text-white px-12 py-4 rounded-lg"
              onClick={async () => {
                const auth = await session();
                console.log(auth);
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        {/* Trending Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Trending Now
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {trendingPosts.map((post, index) => (
                <article
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium text-gray-900">
                            {post.author}
                          </span>
                          <div className="text-xs text-gray-500">
                            {post.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center text-gray-500 hover:text-blue-600">
                          <Heart className="w-5 h-5 mr-1" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="text-gray-500 hover:text-blue-600">
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button className="text-gray-500 hover:text-blue-600">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Latest Articles
              </h2>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post, index) => (
                <article
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {post.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Editor's Picks & Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Editor's Picks */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Editor's Picks
                </h2>
                <div className="space-y-6">
                  {editorsPicks.map((post, index) => (
                    <article
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl font-bold text-blue-600">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                            {post.category}
                          </span>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-blue-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
                <p className="text-blue-100 mb-6">
                  Get weekly insights, tutorials, and tech news delivered
                  straight to your inbox.
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
};

export default Index;
