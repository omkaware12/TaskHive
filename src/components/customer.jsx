import { useState } from "react";
import { Star } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "James L",
      role: "CEO at Creativex",
      review:
        "ProjectHub has completely transformed our workflow. The intuitive design and user-friendly interface make project management a breeze. Highly recommend!",
      avatar: "https://th.bing.com/th/id/OIP.a9F_vLc0iE28S8HJwrLyIAAAAA?rs=1&pid=ImgDetMain",
    },
    {
      name: "Emily R",
      role: "CEO at No Fear Funnels",
      review:
        "The UI of ProjectHub is clean and efficient. It’s incredibly easy to navigate and has significantly improved our team’s productivity. A game-changer for our projects!",
      avatar: "https://static.vecteezy.com/system/resources/previews/024/183/535/original/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg",
    },
    {
      name: "Dave Foy",
      role: "CEO at Go For It",
      review:
        "ProjectHub is the perfect tool for managing our projects. The design is not only visually appealing but also highly functional. Our team loves it!",
      avatar: "https://static.vecteezy.com/system/resources/previews/004/219/787/original/young-man-with-beard-and-glasses-avatar-character-free-vector.jpg",
    },
    {
      name: "Sarah K",
      role: "Project Manager at InnovateX",
      review:
        "Using ProjectHub has made our workflow so much smoother. The features are exactly what we needed to keep our projects organized.",
      avatar: "https://img.freepik.com/premium-vector/avatar-man-with-glasses-portrait-young-guy-vector-illustration-face_217290-1809.jpg",
    },
    {
      name: "Michael B",
      role: "CTO at DevStack",
      review:
        "A well-thought-out tool that helps our teams stay on track. It’s intuitive and efficient. We couldn't manage without it!",
      avatar: "https://static.vecteezy.com/system/resources/previews/017/440/116/original/male-paramedic-avatar-character-icon-free-vector.jpg",
    },
    {
      name: "Olivia W",
      role: "Head of Marketing at Brandify",
      review:
        "ProjectHub has simplified our project management and made collaboration so much easier. It’s a must-have for any team!",
      avatar: "https://th.bing.com/th/id/OIP.KS4UeFLkQSyZQMOV7VvDVQHaIY?w=1768&h=2000&rs=1&pid=ImgDetMain",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex + 3 < reviews.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const prevSlide = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  return (
    <section className="py-12 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8">What Our Customers Say</h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-2xl shadow-md text-center flex flex-col items-center cursor-pointer"
                onClick={index === 2 ? nextSlide : index === 0 ? prevSlide : undefined}
              >
                <div className="flex space-x-1 mb-4 text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.review}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
