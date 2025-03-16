export default function Footer() {
    return (
      <footer className="bg-[#0e1a42] text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full w-8 h-8 mr-2"></div>
              <span className="text-xl font-bold">ProjectHub</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="space-y-2">
              {['Plan', 'Build', 'Insights', 'Customer Requests', 'Linear Asks', 'Security', 'Mobile'].map((item) => (
                <li key={item} className="hover:text-blue-300 cursor-pointer transition-colors text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              {['Pricing', 'Method', 'Integrations', 'Changelog', 'Documentation', 'Download', 'Switch'].map((item) => (
                <li key={item} className="hover:text-blue-300 cursor-pointer transition-colors text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {['About', 'Customers', 'Careers', 'Blog', 'README', 'Quality', 'Brand'].map((item) => (
                <li key={item} className="hover:text-blue-300 cursor-pointer transition-colors text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              {['API', 'Status', 'Startups', 'Report issue', 'DPA', 'Privacy', 'Terms'].map((item) => (
                <li key={item} className="hover:text-blue-300 cursor-pointer transition-colors text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
              <span className="text-sm">f</span>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
              <span className="text-sm">t</span>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
              <span className="text-sm">in</span>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
              <span className="text-sm">ig</span>
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            ©2024. All Rights Reserved ProjectHub Inc.
          </div>
        </div>
      </footer>
    );
  }
  