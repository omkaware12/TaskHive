import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className={`fixed z-[999] w-full px-4 sm:px-10 md:px-20 py-3 md:py-5 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className='logo flex items-center'> 
        {/* TaskHive Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M7.5 5.6L5 7L6.4 4.5L5 2L7.5 3.4L10 2L8.6 4.5L10 7L7.5 5.6ZM19.5 15.4L22 14L20.6 16.5L22 19L19.5 17.6L17 19L18.4 16.5L17 14L19.5 15.4ZM22 2L20.6 4.5L22 7L19.5 5.6L17 7L18.4 4.5L17 2L19.5 3.4L22 2ZM14.37 7.29L12 4L9.63 7.29L5.8 7.74L8.91 10.14L8.5 14L12 12.15L15.5 14L15.09 10.14L18.2 7.74L14.37 7.29Z" />
            </svg>
          </div>
          <div className={`font-bold text-xl ${scrolled ? 'text-blue-600' : 'text-gray-800'}`}>
            Task<span className="text-blue-500">Hive</span>
          </div>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <div className='md:hidden'>
        <button 
          onClick={toggleMenu} 
          className={`${scrolled ? 'text-blue-600 hover:text-blue-800' : 'text-gray-800 hover:text-black'} transition-colors duration-300`}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>
      
      {/* Desktop menu */}
      <div className='hidden md:flex items-center space-x-8'> 
        {[
          {name: "Home", path: "/taskhive"},
          {name: "Pricing", path: "/taskhive/pricing"},
          {name: "Our Work", path: "/taskhive/work"},
          {name: "Contact", path: "/taskhive/contact"}
        ].map((item, idx) => (
          <Link 
            className={`${scrolled ? 'text-blue-600 hover:text-blue-800' : 'text-gray-800 hover:text-black'} text-base font-medium capitalize relative group transition-colors duration-300`} 
            to={item.path} 
            key={idx}
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        
        {/* Sign In Button */}
        <Link 
          to="/taskhive/signin" 
          className={`ml-8 px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
            scrolled 
              ? 'bg-white text-black border border-blue-600 hover:bg-blue-50' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Sign In
        </Link>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 ${scrolled ? 'bg-white' : 'bg-white'} py-4 px-4 shadow-md`}>
          <div className='flex flex-col space-y-4'>
            {[
              {name: "Home", path: "/taskhive"},
              {name: "Pricing", path: "/taskhive/pricing"},
              {name: "Our Work", path: "/taskhive/work"},
              {name: "Contact", path: "/taskhive/contact"},
              {name: "Sign in", path: "/taskhive/signin"}
            ].map((item, idx) => (
              <Link 
                className={`${scrolled ? 'text-blue-600 hover:text-blue-800' : 'text-gray-800 hover:text-black'} text-base font-medium capitalize relative group transition-colors duration-300`} 
                to={item.path} 
                key={idx}
                onClick={toggleMenu}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar