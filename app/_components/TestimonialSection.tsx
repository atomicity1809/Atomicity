import React from 'react';

const testimonials = [
  { id: 1, name: 'Jane Doe', feedback: 'This system made managing our events so easy!' },
  { id: 2, name: 'John Smith', feedback: 'A great tool for organizing large events.' },
  { id: 3, name: 'Emily Johnson', feedback: 'Highly recommend for any event manager!' },
];

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">What People Are Saying</h2>
        <div className="space-y-4">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <p className="italic">{testimonial.feedback}</p>
              <p className="mt-2 text-right font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
