import { IBlog } from "@/pages";
import { Clock, Eye, Heart, Tag } from "lucide-react";
import { Link } from "react-router";

export default function BlogPost({ post }: { post: IBlog }) {
  const postUrl = `/blog/${post._id}`;
  const formattedDate = new Date(post.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  console.log(post);
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="relative aspect-video">
        <img
          src={post.thunmail}
          alt=""
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          <Link
            to={postUrl}
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <time
            dateTime={new Date(post.created_at).toISOString()}
            className="flex items-center"
          >
            <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
            {formattedDate}
          </time>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{post.views.toLocaleString()} views</span>
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{post.likes.toLocaleString()} likes</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags &&
            post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs flex items-center"
              >
                <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                {tag}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                post.author
              )}&background=random`}
              alt={`${post.author}'s avatar`}
              width={24}
              height={24}
              className="rounded-full mr-2"
              loading="lazy"
            />
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <Link
            to={postUrl}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm group"
          >
            Read more{" "}
            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
