import { useState } from "react";
import { FaCheck } from 'react-icons/fa';
import Sidebar from "./Sidebar";

export default function ManagePlan() {
  const [yearlyBilling, setYearlyBilling] = useState(true);

  // Brand logos that appear at the top
  const brands = ["Nike", "Zendesk", "Riot", "Zoho", "Dept", "Wahl"];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      description: "Essential features and storage for individuals or small projects.",
      features: ["1 project", "Tasks", "Basic Kanban boards", "100 MB file storage", "500 MB file transfers"],
      buttonText: "Current plan",
      users: 1
    },
    {
      name: "TaskHive Starter",
      price: yearlyBilling ? "$15" : "$18",
      period: "/mo",
      description: "Ideal for small teams managing multiple projects.",
      features: ["3 projects", "Tasks", "Team collaboration", "1 GB file storage", "2 GB file transfers", "1000 API requests"],
      buttonText: "Continue with Starter",
      users: 5
    },
    {
      name: "TaskHive Pro",
      price: yearlyBilling ? "$35" : "$40",
      period: "/mo",
      description: "Create and manage with unlimited projects and team members.",
      features: ["Unlimited Projects", "Unlimited Tasks", "Team Collaboration", "5 GB file storage", "10 GB file transfers", "5000 API requests"],
      buttonText: "Continue with Pro",
      recommended: true,
      users: 10
    },
    {
      name: "TaskHive Team",
      price: yearlyBilling ? "$30" : "$36",
      period: "/mo per seat (min 5 seats)",
      description: "Requires team plan with priority support and advanced features.",
      features: ["Unlimited Projects", "Team workspaces", "Can edit with API features", "Team workspaces"],
      buttonText: "Continue with Team",
      users: "Unlimited"
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Import Sidebar Component */}
      <Sidebar activePage="manage-plan" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          <h2 className="text-2xl font-semibold mb-8">Manage Plan</h2>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Plans that evolve with your projects.</h1>
              <p className="text-xl text-gray-700">Try with your <span className="text-blue-500 font-medium">team</span> for free.</p>
              
              {/* Brand logos */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-gray-400 text-sm">
                <p>Trusted by teams at</p>
                {brands.map(brand => (
                  <span key={brand} className="font-semibold">{brand}</span>
                ))}
              </div>
              
              {/* Billing toggle */}
              <div className="flex items-center justify-center mt-8">
                <div className="flex items-center bg-gray-100 p-1 rounded-full">
                  <span 
                    className={`px-4 py-2 rounded-full cursor-pointer text-sm ${!yearlyBilling ? 'bg-white shadow-sm font-medium' : 'text-gray-600'}`}
                    onClick={() => setYearlyBilling(false)}
                  >
                    Monthly
                  </span>
                  <span 
                    className={`px-4 py-2 rounded-full cursor-pointer text-sm ${yearlyBilling ? 'bg-white shadow-sm font-medium' : 'text-gray-600'}`}
                    onClick={() => setYearlyBilling(true)}
                  >
                    Yearly discount (20%)
                  </span>
                </div>
              </div>
            </div>
            
            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-lg border border-gray-200
                    overflow-hidden transition-all duration-300 hover:border-black hover:shadow-lg group flex flex-col`}
                >
                  {/* Card header */}
                  <div className="p-5 border-b border-gray-100 flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">{plan.name}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{plan.users} {typeof plan.users === 'number' && plan.users === 1 ? 'user' : 'users'}</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 text-sm">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 h-12">{plan.description}</p>
                  </div>
                  
                  {/* Features and Button Container */}
                  <div className="flex flex-col justify-between flex-grow">
                    {/* Features list */}
                    <div className="p-5 flex-grow">
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <span className="text-blue-500 mr-2 mt-0.5">
                              <FaCheck size={12} />
                            </span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Button */}
                    <div className="p-5 pt-0">
                      <button 
                        className={`w-full py-2 rounded text-sm font-medium transition-colors duration-300
                          ${plan.recommended 
                            ? 'bg-white text-black border border-blue-500 hover:bg-blue-600 hover:text-white hover:border-transparent' 
                            : index === 0 
                              ? 'bg-gray-200 text-gray-800 group-hover:bg-blue-500 group-hover:text-white' 
                              : 'bg-white text-black border border-gray-300 hover:bg-blue-500 hover:text-white hover:border-transparent'
                          }`}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Compare features link */}
            <div className="text-center mt-8">
              <button className="text-blue-600 text-sm font-medium flex items-center justify-center mx-auto hover:underline">
                Compare all features
                <span className="ml-1 text-xs">↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}