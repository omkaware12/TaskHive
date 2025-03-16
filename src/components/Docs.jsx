import { useState } from "react";
import { FileText, MessageSquare, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function AnimatedUI() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      title: "Collaborative Documents",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      content:
        "Write down product ideas and work together on feature specs in real-time, multiplayer project documents. Add **style** and ##structure with rich-text formatting options.",
      tag: "zoe",
    },
    {
      title: "Inline Comments",
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      content:
        "Provide feedback directly in the document. Comments are attached to text and easy to resolve.",
      tag: "quinn",
    },
    {
      title: "Text-to-Issue Commands",
      icon: <Terminal className="w-6 h-6 text-blue-600" />,
      content:
        "Convert text into actionable issues with simple commands. Manage tasks directly from the document.",
      tag: "max",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="flex flex-col md:flex-row gap-10 max-w-5xl w-full">
        {/* Left Section */}
        <div className="w-full md:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Ideate and specify what to build next</h2>
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer space-x-3 p-2 rounded-lg transition duration-300 ${
                activeIndex === index ? "bg-blue-100" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={`h-10 w-1 rounded-full transition duration-300 ${
                  activeIndex === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div>
                <h3 className={`font-medium ${activeIndex === index ? "text-blue-600" : "text-gray-700"}`}>
                  {section.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-2/3 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative"
        >
          {/* Navigation bar */}
          <div className="flex items-center mb-6 text-sm text-gray-500">
            <span className="mr-2">Spice harvester</span>
            <span className="mr-2">›</span>
            <span>Project specs</span>
            <span className="ml-2">•••</span>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center mr-2">
              <div className="text-white">
                {activeIndex === 0 ? 
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 8c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0 0h6m-6 0v6" />
                  </svg> : 
                  sections[activeIndex].icon}
              </div>
            </div>
          </div>
          <div className="bg-green-600 text-white text-xs px-2 py-1 rounded absolute right-6 top-16">
            {sections[activeIndex].tag}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 border border-green-600 inline-block px-3 py-1 rounded">
            {activeIndex === 0 ? "Collaborate on ideas" : sections[activeIndex].title}
          </h3>
          <p className="text-gray-600 mb-8">{sections[activeIndex].content}</p>
          
          {/* Placeholder for document lines */}
          <div className="space-y-3">
            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
            <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-1.5 bg-gray-200 rounded w-4/6"></div>
            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
            <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
