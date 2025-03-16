import React from 'react';

export default function SalesMarketingSection() {
  const cards = [
    {
      title: "Sales Techniques and Strategies",
      description:"Discover proven sales techniques to build strong client relationships, overcome objections, and close deals effectively. Whether you're a seasoned.",
      image: "https://cdn2.hubspot.net/hubfs/4595743/Untitled%20design-16.jpg",
    },
    {
      title: "Digital Marketing Essentials",
      description:
        "In the digital age, understanding digital marketing is crucial. Explore SEO, social media, email marketing, and more to enhance your online presence and drive growth.",
      image: "https://th.bing.com/th/id/OIP.CUjoaChs3HVhCAJcDl6eawAAAA?rs=1&pid=ImgDetMain",
    },
    {
      title: "Market Research and Analysis",
      description:
        "Access market research resources to understand your target market and industry trends. Learn to analyze consumer behavior and identify opportunities to stay ahead.",
      image: "https://okcredit-blog-images-prod.storage.googleapis.com/2021/05/expandingbusiness1.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Expand your sales & marketing knowledge
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {cards.map((card, index) => (
          <div key={index} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="text-gray-700 mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
