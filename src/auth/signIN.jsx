import React, { useState } from 'react'
import { FaTasks } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const signIN = () => {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handelchange = (e) => {
        setformdata({...formdata, [e.target.id]: e.target.value})
        // Clear error when user types
        if (errors[e.target.id]) {
          setErrors({ ...errors, [e.target.id]: "" });
        }
    }
    
    const validateForm = () => {
      const newErrors = {};
      
      // Email validation
      if (!formdata.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
        newErrors.email = "Email is invalid";
      }
      
      // Password validation
      if (!formdata.password) {
        newErrors.password = "Password is required";
      }
      
      return newErrors;
    };
    
    const show = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setIsSubmitting(false);
          return;
        }
        
        console.log(formdata);
        // If validation passes, you can redirect or perform login logic
        // For now, let's just log the data
        setIsSubmitting(false);
    }
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo at the top */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FaTasks size={24} className="text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-blue-600">TaskHive</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl w-full p-8">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">Sign in</h2>
          
          <form className="space-y-6" onSubmit={show}>
            <div>
              <label htmlFor='email' className="block text-gray-700 text-1xl mb-2">Email</label>
              <input 
                id='email'
                value={formdata.email}
                onChange={handelchange} 
                type='email'
                className={`w-full p-3 bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-none'} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                placeholder="email address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor='password' className="block text-gray-700 text-1xl">Password</label>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot password?</a>
              </div>
              <input 
                id='password' 
                value={formdata.password}
                onChange={handelchange}
                type='password'
                className={`w-full p-3 bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-none'} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                placeholder="password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mt-4 disabled:bg-blue-300"
            >
              {isSubmitting ? "Signing in..." : "Log in"}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?
            </p>
            <Link to="/signup" className="bg-white border border-blue-300 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signIN