export default function Footer() {
  return (
    <footer className="bg-black  text-gray-400 py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Top: Social Icons */}
        <div className="flex space-x-6 mb-6 text-white text-2xl">
          <a href="https://facebook.com" target="blank">
            <i className="fa-brands fa-facebook-f hover:text-gray-300"></i>
          </a>
          <a href="https://instagram.com" target="blank">
            <i className="fa-brands fa-instagram hover:text-gray-300"></i>
          </a>
          <a href="https://twitter.com" target="blank">
            <i className="fa-brands fa-x-twitter hover:text-gray-300"></i>
          </a>
          <a href="https://youtube.com" target="blank">
            <i className="fa-brands fa-youtube hover:text-gray-300"></i>
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
          <a href="/" className="hover:underline">
            Audio Description
          </a>
          <a href="/" className="hover:underline">
            Help Center
          </a>
          <a href="/" className="hover:underline">
            Gift Cards
          </a>
          <a href="/" className="hover:underline">
            Media Center
          </a>

          <a href="/" className="hover:underline">
            Investor Relations
          </a>
          <a href="/" className="hover:underline">
            Jobs
          </a>
          <a href="/" className="hover:underline">
            Terms of Use
          </a>
          <a href="/" className="hover:underline">
            Privacy
          </a>

          <a href="/" className="hover:underline">
            Legal Notices
          </a>
          <a href="/" className="hover:underline">
            Cookie Preferences
          </a>
          <a href="/" className="hover:underline">
            Corporate Info
          </a>
          <a href="/" className="hover:underline">
            Contact Us
          </a>
        </div>

        {/* Service Code */}
        <button className="border border-gray-500 px-3 py-1 text-sm hover:text-white hover:border-white">
          Service Code
        </button>

        {/* Bottom Text */}
        <p className="text-xs text-gray-500 mt-6">© 2025 MovieClone, Inc.</p>
      </div>
    </footer>
  );
}
