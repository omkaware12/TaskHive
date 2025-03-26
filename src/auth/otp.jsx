import React, { useState, useRef, useEffect } from 'react'
import { FaTasks } from 'react-icons/fa'
import { useAuth } from "../contextAPI/index"; 
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    const { userData } = useAuth();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [email, setEmail] = useState(userData?.email); 
    const inputRefs = useRef([]);
    const navigate = useNavigate();
  
    // Handle verification and navigation
    const handleVerify = () => {
      console.log("Verifying OTP:", otp.join(""));
      
      // Here you would typically verify the OTP with your backend
      // For now, we'll just navigate to the user's project page
      
    
        // Fallback if firstName is not available
        navigate('/taskhive/signin');
      
    };
  
    // Handle input change
    const handleChange = (element, index) => {
      if (isNaN(element.value)) return false;
      
      setOtp([...otp.map((d, idx) => (idx === index) ? element.value : d)]);
      
      // Focus next input
      if (element.value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    // Handle backspace
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    // Handle paste
    const handlePaste = (e) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
      
      if (pasteData.some(char => isNaN(char))) return;
      
      let updatedOtp = [...otp];
      pasteData.forEach((value, index) => {
        if (index < 6) {
          updatedOtp[index] = value;
        }
      });
      
      setOtp(updatedOtp);
      const lastFilledIndex = updatedOtp.findLastIndex(val => val !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    };
  
    const resendCode = () => {
      // Logic to resend code would go here
      console.log("Resending code to", email);
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md">
          {/* Logo at the top */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FaTasks size={24} className="text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-blue-600">TaskHive</span>
            </div>
          </div>
  
          <div className="bg-white shadow-md rounded-xl w-full p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Verify your email</h2>
            
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
              We sent you a six digit confirmation code to {email}. Please enter it below to confirm your email address.
            </p>
            
            <div className="flex flex-wrap justify-between gap-2 sm:gap-0 mb-6 sm:mb-8">
              {otp.map((data, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    ref={el => inputRefs.current[index] = el}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl font-bold bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                );
              })}
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm sm:text-base mb-2">Didn't receive a code?</p>
              <button 
                onClick={resendCode}
                className="text-blue-600 font-medium hover:underline text-sm sm:text-base"
              >
                Send code again.
              </button>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button 
                onClick={handleVerify}
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Otp