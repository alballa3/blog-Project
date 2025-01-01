import { IBlog } from "@/pages";
import { Clock, Eye, Heart } from "lucide-react";
import { Link } from "react-router";

export default function FeaturedPosts({ posts }: { posts: IBlog[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">
          Featured Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: IBlog, index: any) => (
            <article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="relative aspect-video">
                <img
                  src={post.thunmail}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  <Link
                    to={`/blog/${post?._id}`}
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <time
                    dateTime={new Date(post.created_at).toDateString()}
                    className="flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
                    {new Date(post.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span>{post.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span>{post.likes.toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
