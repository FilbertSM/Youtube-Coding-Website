const Footer = () => {
  return (
    <footer className="bg-youtube-dark text-white py-12 mt-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">YT</span>
              </div>
              <span className="font-bold text-lg">YouTube Coding Guide</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for coding tutorials and programming guides.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/guides" className="hover:text-white transition-colors">All Guides</a></li>
              <li><a href="/create" className="hover:text-white transition-colors">Create Guide</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">JavaScript</a></li>
              <li><a href="#" className="hover:text-white transition-colors">React</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Node.js</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Python</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 YouTube Coding Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;