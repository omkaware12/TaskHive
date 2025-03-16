import React from 'react';
import { FaColumns, FaUsers, FaClock, FaRobot, FaSitemap, FaBuilding } from 'react-icons/fa';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaColumns className="text-white text-2xl" />,
      title: "Kanban view",
      description:
        "Stay informed and make data-driven decisions. Get real-time insights into campaign performance. Monitor open rates, click-through rates, conversions, and revenue generated.",
    },
    {
      icon: <FaUsers className="text-white text-2xl" />,
      title: "Improve collaboration",
      description:
        "Boost teamwork with tools for seamless communication and task management. Share files, track discussions, and stay aligned to achieve project goals efficiently.",
    },
    {
      icon: <FaClock className="text-white text-2xl" />,
      title: "Deliver projects on time, every time",
      description:
        "Ensure timely project completion with features for deadline tracking, and progress monitoring. Keep your team on schedule and meet every deadline with confidence.",
    },
    {
      icon: <FaRobot className="text-white text-2xl" />,
      title: "Butler Automation",
      description:
        "Streamline your workflow with Butler Automation. Automate repetitive tasks, set up custom triggers, and Butler handles the heavy lifting, so the team can focus on what really matters.",
    },
    {
      icon: <FaSitemap className="text-white text-2xl" />,
      title: "Workflows",
      description:
        "Optimize processes with customizable workflows. Define and automate project steps to ensure consistency, improve efficiency, and keep your team aligned from start to finish.",
    },
    {
      icon: <FaBuilding className="text-white text-2xl" />,
      title: "Enterprise",
      description:
        "Empower large teams with robust project management features tailored for enterprise needs. Ensure scalability, security, and compliance while streamlining workflows.",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Features and Benefits</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-700 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  