import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  ThumbsUp,
  Eye,
  Share2,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { url } from "@/states";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  views: number;
  likes: number;
  readingTime: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

// Mock data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    url: "/blog/react-hooks",
    date: "2023-06-15",
    excerpt:
      "Learn how to use React Hooks to manage state and side effects in your functional components.",
    thumbnail: "https://example.com/images/react-hooks.jpg",
    tags: ["React", "Hooks", "JavaScript"],
    views: 1500,
    likes: 230,
    readingTime: 8,
    author: {
      name: "Jane Doe",
      role: "Senior React Developer",
      avatar: "https://example.com/avatars/jane-doe.jpg",
    },
  },
  {
    id: "2",
    title: "Advanced TypeScript Techniques",
    url: "/blog/advanced-typescript",
    date: "2023-06-10",
    excerpt:
      "Dive deep into advanced TypeScript features to write more robust and type-safe code.",
    thumbnail: "https://example.com/images/typescript.jpg",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    views: 1200,
    likes: 180,
    readingTime: 12,
    author: {
      name: "John Smith",
      role: "TypeScript Enthusiast",
      avatar: "https://example.com/avatars/john-smith.jpg",
    },
  },
  // Add more mock blog posts here...
];

function BlogSearchResults() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [results, setResults] = useState<BlogPost[]  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        setIsLoading(true);
        setError(null);

        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);
        
            try {
              const response = await fetch(`${url}/api/blog/search?search=${searchTerm}`);
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
        
              const data = await response.json();
              console.log(data)
            //   setResults(data);
            } catch (err) {
              setError((err as Error).message || "Something went wrong");
            } finally {
              setIsLoading(false);
            }
          };
          fetchResults();
    },[searchTerm])


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 tracking-tight">
            Developer Blog
          </h1>

          <div className="relative max-w-2xl mx-auto">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-12 pr-4 py-6 sm:py-7 text-base sm:text-lg border-blue-100 focus:border-blue-400 focus:ring-blue-400 rounded-2xl shadow-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search articles"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={24}
              aria-hidden="true"
            />
          </div>
        </header>

        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <p
            className="text-blue-600 text-base lg:text-lg font-medium"
            aria-live="polite"
          >
            {isLoading
              ? "Searching..."
              : `${results.length} results for "${searchTerm}"`}
          </p>
        </div>

        {error && (
          <div className="text-red-500 mb-6" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-6 lg:space-y-8">
          {results.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
          <div className="relative w-full sm:w-48 lg:w-64 h-48 sm:h-48 lg:h-64 flex-shrink-0 overflow-hidden rounded-xl bg-blue-50">
            <img
              src={post.thumbnail}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-blue-500 font-medium">
                {post.date}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock size={16} className="mr-1" />
                {post.readingTime} min read
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
              <a
                href={post.url}
                className="flex items-center gap-2 focus:outline-none focus:underline"
              >
                {post.title}
                <ArrowUpRight
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  size={20}
                  aria-hidden="true"
                />
              </a>
            </h2>

            <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-blue-50/80 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg font-medium text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 sm:pt-6 border-t border-blue-50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar>{post.author.name.charAt(0)}</Avatar>
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full ring-2 ring-white"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {post.author.name}
                  </div>
                  <div className="text-sm text-blue-500">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Button className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Eye size={20} className="stroke-2 mr-2" />
                  <span className="text-sm font-semibold">
                    {post.views.toLocaleString()}
                  </span>
                  <span className="sr-only">views</span>
                </Button>
                <Button className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <ThumbsUp size={20} className="stroke-2 mr-2" />
                  <span className="text-sm font-semibold">
                    {post.likes.toLocaleString()}
                  </span>
                  <span className="sr-only">likes</span>
                </Button>
                <Button className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Share2 size={20} className="stroke-2" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogSearchResults;
