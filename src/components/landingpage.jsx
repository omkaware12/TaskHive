import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/taskhive/signup");
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-100 min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Give Your Managers the <span className="text-blue-600">Tools They Need to Excel</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          The all-in-one solution to transform management in your company
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
            Learn more
          </button>
          <button 
            onClick={handleSignUp}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-lg font-medium transition-colors text-center"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
