import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { url } from "@/states";

export function CommentForm({ id }: { id: any }) {
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [ok, setOk] = useState(true);
  // const [error,setError]=useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/blog/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content }),
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setOk(false);
      setAnswer(json.error);
      return;
    }
    // setAnswer(json);
    window.location.reload();
    // setOk(response.ok);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full min-h-[100px]"
      />
      {answer && (
        <p className={ok ? " text-green-500" : "text-red-600"}> {answer}</p>
      )}
      <Button type="submit" className="w-full">
        Submit Comment
      </Button>
    </form>
  );
}
