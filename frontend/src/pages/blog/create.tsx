"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { url } from "@/states";

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500),
  content: z.string().min(50, "Content must be at least 50 characters"),
  tags: z.array(z.string()),
  isPublished: z.boolean(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function BlogCreateForm() {
  const [blog, setBlog] = useState<BlogFormData>({
    title: "",
    description: "",
    content: "",
    tags: [],
    isPublished: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof BlogFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateField = (name: keyof BlogFormData, value: any) => {
    try {
      blogSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue =
      name === "tags"
        ? value
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : value;
    setBlog((prev) => ({ ...prev, [name]: newValue }));
    validateField(name as keyof BlogFormData, newValue);
  };

  const handlePublishedChange = (checked: boolean) => {
    setBlog((prev) => ({ ...prev, isPublished: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      blogSchema.parse(blog);
      setIsSubmitting(true);
      // API call would go here
      console.log("Submitted blog:", blog);
      const respond = await fetch(`${url}/api/blog/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(blog),
      });
      const json=await respond.json()
      console.log(json)
        setBlog({ title: '', description: '', content: '', tags: [], isPublished: false })
        setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BlogFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof BlogFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Create New Blog Post
        </h1>

        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={blog.description}
              onChange={handleInputChange}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={blog.content}
              onChange={handleInputChange}
              className={`h-40 ${errors.content ? "border-red-500" : ""}`}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={blog.tags.join(", ")}
              onChange={handleInputChange}
              className={errors.tags ? "border-red-500" : ""}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublished"
              checked={blog.isPublished}
              onCheckedChange={handlePublishedChange}
            />
            <Label htmlFor="isPublished">Publish immediately</Label>
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Blog Post"}
        </Button>
      </form>
    </div>
  );
}
