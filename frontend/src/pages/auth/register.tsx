"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {  useNavigate } from "react-router";
import z from "zod";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const n =useNavigate()
  const schama = z.object({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
  });
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const [error, setError] = useState<IFormData>({});
  interface IFormData {
    username?: any;
    email?: any;
    password?: any;
  }
  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const vaildition = schama.safeParse(formData);
    if (!vaildition.success) {
      setError(vaildition.error.flatten().fieldErrors);
      return;
    }

    const respond = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await respond.json();
    if (!respond.ok) {
      setError({ password: data.error });
      return;
    }
    n("/")
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 animate-gradient-x">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl transition-all duration-300 ease-in-out hover:shadow-blue-500/50">
        <form onSubmit={handle}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-blue-700">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Join us today and start your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
              />
              {error.username && (
                <span className="text-red-500 text-sm">{error.username}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
              />
              {error.email && (
                <span className="text-red-500 text-sm">{error.email}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {error.password && (
                <span className="text-red-500 text-sm">{error.password}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Register
            </Button>
            <div className="text-center">
              <span className="text-gray-600">Already have an account?</span>
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 ml-1 font-medium transition-colors duration-200"
              >
                Log in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
