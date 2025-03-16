import { useState } from "react";

export default function PricingPlans() {
  const plans = [
    {
      name: "Starter",
      price: "$0.00",
      description: "Per month, billed annually",
      features: [
        "Up to 1,000 subscribers",
        "Basic email automation",
        "Drag-and-drop email builder",
        "Real-time analytics",
        "Standard support",
      ],
    },
    {
      name: "Premium",
      price: "$13.59",
      description: "Per month, billed annually",
      features: [
        "Up to 1,000 subscribers",
        "Advanced email automation",
        "A/B testing",
        "Dynamic content",
        "Priority support",
      ],
    },
    {
      name: "Professional",
      price: "$30.49",
      description: "Per month, billed annually",
      features: [
        "Custom subscriber limits",
        "Advanced segmentation",
        "Predictive analytics",
        "Dedicated account manager",
        "24/7 premium support",
      ],
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-12 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Simple and Transparent Pricing</h2>
        <p className="text-gray-600 mb-10">
          Discover the pricing options that fit your email marketing needs. We offer flexible plans to help you succeed.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative overflow-hidden p-6 rounded-2xl border border-gray-300 transition-all duration-500 ease-in-out 
                ${
                  hoveredIndex === index
                    ? "bg-gradient-to-br from-blue-200 to-blue-500 text-white"
                    : "bg-white text-gray-900"
                }
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-3xl font-bold my-3">{plan.price}</p>
              <p className="text-gray-600">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 px-6 py-2 rounded-full border-2 transition-all duration-500 ${
                  hoveredIndex === index ? "border-white text-white bg-transparent" : "border-blue-500 text-blue-500"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
