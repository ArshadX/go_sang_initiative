import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is carpooling?",
      answer: "Carpooling is sharing a car journey so that more than one person travels in a car."
    },
    {
      question: "How does your service work?",
      answer: "You can book a ride through our app by selecting your pickup and drop-off locations."
    },
    {
      question: "Is there a limit on the number of passengers?",
      answer: "Yes, each ride can accommodate up to 4 passengers for safety and comfort."
    },
    {
      question: "How do I become a driver?",
      answer: "You can apply to become a driver by filling out the application form on our website."
    },
    {
      question: "What types of vehicles are available?",
      answer: "We offer both cabs and bikes for sharing, catering to different travel needs."
    },
    {
      question: "Do you offer bike services?",
      answer: "Yes, we provide bike-sharing services for short-distance travel. You can easily book a bike through our app, making it a convenient and eco-friendly option for your daily commute."
    },
    {
      question: "What are the payment methods?",
      answer: "We accept various payment methods, including credit/debit cards and digital wallets."
    },
    {
      question: "How do I cancel a ride?",
      answer: "You can cancel your ride directly through the app before the driver arrives."
    },
    {
      question: "Is your service available 24/7?",
      answer: "Yes, our service is available round-the-clock to meet your travel needs."
    },
    {
      question: "What safety measures are in place?",
      answer: "We ensure all drivers are verified and vehicles are regularly maintained for safety."
    },
    {
      question: "What safety features do you offer for women?",  // New Question
      answer: "We prioritize the safety of our female passengers by implementing features such as real-time ride tracking, an emergency contact option, and driver verification. Our female passengers can also choose to ride with women drivers if they prefer."
    },
    {
      question: "What is your commission rate?",  // New Question
      answer: "We charge a 0% commission on rides, allowing our drivers to keep all their earnings while providing you with affordable fares."
    },
    {
      question: "Can I share my ride with friends?",
      answer: "Absolutely! You can invite friends to join your ride through the app."
    },
  ];
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="max-w-lg w-full space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {openIndex === index ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
            </div>
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
