"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Heart, Eye, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentForm } from "@/components/pages/blog/CommentForm";
import { useParams } from "react-router";
import { IBlog } from "..";
import { url } from "@/states";

export default function BlogPage() {
  const [blogData, setblogData] = useState<IBlog>();
  const [comments, setComments] = useState(blogData?.comments);
  const [likes, setLikes] = useState<number>(blogData?.likes || 0);
  const [answer, setAnswer] = useState("");
  const { id } = useParams();
  useEffect(() => {
    console.log(`${url}/api/blog/${id}`);
    fetch(`${url}/api/blog/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setComments(data.comments);
        setLikes(data.likes);
        setblogData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, [id, url]);

  const handleLike = async () => {
    const respond = await fetch(`${url}/api/blog/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    const json = await respond.json();
    if (!respond.ok) {
      setAnswer(json.error);
      return;
    }
  };
  if (!blogData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={blogData?.thunmail}
            alt={blogData?.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              {blogData?.title}
            </h1>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage
                  src="/placeholder-user.jpg"
                  alt={blogData?.author}
                />
                <AvatarFallback>{blogData?.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{blogData?.author}</p>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    Published on {format(blogData?.created_at, "MMMM d, yyyy")}
                  </span>
                </div>
                {blogData?.updated_at > blogData?.created_at && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      Updated on {format(blogData?.updated_at, "MMMM d, yyyy")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="flex items-center mr-4">
                <Eye className="w-4 h-4 mr-1" /> {blogData?.views}
              </span>
              <span className="flex items-center mr-4">
                <Heart className="w-4 h-4 mr-1" /> {likes}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" /> {comments?.length}
              </span>
            </div>

            <div className="mb-6">
              {blogData?.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="mr-2 bg-blue-100 text-blue-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-xl text-gray-700 mb-6">
              {blogData?.description}
            </p>

            <div className="prose max-w-none mb-12">{blogData?.content}</div>

            <Button
              onClick={handleLike}
              className="bg-blue-600 hover:bg-blue-700 text-white mb-8"
            >
              Like this article
            </Button>
            {answer && <div className={"text-red-600"}>{answer}</div>}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">
                Comments ({comments?.length})
              </h2>
              {comments?.map((comment, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-gray-600">
                        {format(comment.created_at, "MMMM d, yyyy")}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Add a Comment
              </h3>
              <CommentForm id={id} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
