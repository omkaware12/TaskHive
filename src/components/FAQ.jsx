import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      question: "What is ProjectHub?", 
      answer: "ProjectHub is a comprehensive project management platform designed to help teams collaborate, track progress, and deliver projects efficiently." 
    },
    { 
      question: "How do I sign up for ProjectHub?", 
      answer: "You can sign up for ProjectHub by visiting our website and clicking on the \"Sign Up\" button. Follow the instructions to create your account and get started." 
    },
    { 
      question: "Is there a free trial available?", 
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial." 
    },
    { 
      question: "Can I manage multiple projects with ProjectHub?", 
      answer: "Absolutely! ProjectHub allows you to manage unlimited projects with different teams and settings, all from a single dashboard." 
    },
    { 
      question: "How does the collaboration feature work?", 
      answer: "ProjectHub's collaboration feature allows team members to communicate through comments, share files, and update tasks in real-time. You can also use the integrated chat function to keep in touch with your team." 
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-gray-900 font-medium">{faq.question}</span>
                <span className="text-gray-400 ml-2">
                  {openIndex === index ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 text-gray-600 border-t border-gray-100 bg-white">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
