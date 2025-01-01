import Hero from '../components/pages/index/Hero'
import FeaturedPosts from '../components/pages/index/FeaturedPosts'
import AuthorSpotlight from '../components/pages/index/AuthorSpotlight'
import Newsletter from '../components/pages/index/Newsletter'
import BlogPost from '../components/pages/index/BlogPost'
import { useEffect, useState } from 'react'
import { url } from '@/states'
import AboutPage from '@/components/pages/index/aboutus'
import ServicesPage from '@/components/pages/index/serves'
export interface IBlog {
  _id?:string,
  title: string,
  description: string,
  content: string,
  created_at: Date,
  updated_at: Date
  author: string,
  tags: Array<string>
  comments: Array<{
      author: string,
      content: string,
      created_at: Date
  }>,
  thunmail: string,
  views: number,
  likes: number
  isPublished: boolean
}

export default function Index() {
  const [mostblog,setMostblog]=useState<IBlog[]>()
  const [leastblog,setLeastblog]=useState<IBlog[]>()
  useEffect(()=>{
    fetch(`${url}/api/blog?limit=6`).then((response) => response.json()).then((data: IBlog[]) => {
      setLeastblog(data)
    })
    fetch(`${url}/api/blog?limit=3&sort=trend`).then((response) => response.json()).then((data: IBlog[]) => {
      setMostblog(data)
    })
  },[])
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      { mostblog && <FeaturedPosts posts={mostblog} />  }
      <ServicesPage/>
      <AboutPage/>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leastblog && leastblog.map((post) => (
              <BlogPost key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </div>
  )
}

