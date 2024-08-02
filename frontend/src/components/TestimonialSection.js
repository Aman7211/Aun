import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Jay Sahu",
    message: "Aun Herbal's medicine transformed my health! After struggling with digestive issues for years, the holistic approach, including dietary changes and herbal remedies, brought me immense relief."
  },
  {
    id: 2,
    name: "Meera Subramanyam",
    message: "I bought their product Sundari Bahar from an exhibition in Mumbai. This product helped me in my various health issues such as abdominal pain,  hot flashes, loss of apetite. I am continously using this and loved it."
  },
  {
    id: 3,
    name: "Shaurya",
    message:"I was suffering from lot of digestive problems but after using there zafrani chatni I feel relaxed"
  },
  {
    id: 4,
    name: "Aayush",
    message:"I was suffering from lot of digestive problems but after using there zafrani chatni I feel relaxed"
  }
];

const TestimonialSection = () => {
  return (
    <div className="  bg-[#fbf6e7] py-3">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className=" bg-[#fbf6e7] border p-6 rounded-lg shadow-xl">
            
              <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
              <p className="text-gray-700">{testimonial.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
