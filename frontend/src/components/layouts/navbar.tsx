export const Navbar = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">TechBlog</h3>
            <p className="text-gray-600">
              Empowering developers with knowledge and insights.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-blue-600">
                Write for Us
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">
                Terms of Service
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Connect</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-blue-600">
                Twitter
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">
                LinkedIn
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          © 2024 TechBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
