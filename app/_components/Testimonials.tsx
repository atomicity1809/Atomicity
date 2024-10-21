import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    image: "/api/placeholder/150/150",
    quote: "The events organized through AtomiCity have transformed my college experience. The tech workshops were particularly enlightening!"
  },
  {
    name: "Alex Chen",
    role: "Robotics Club Member",
    image: "/api/placeholder/150/150",
    quote: "Being part of the robotics competitions has helped me grow both technically and personally. Couldn't ask for better opportunities!"
  },
  {
    name: "Maria Garcia",
    role: "Arts Society President",
    image: "/api/placeholder/150/150",
    quote: "The platform made organizing our annual art exhibition seamless. We reached more students than ever before!"
  },
  {
    name: "James Wilson",
    role: "Event Participant",
    image: "/api/placeholder/150/150",
    quote: "From registration to attendance, everything was smooth and well-organized. The events are always top-notch!"
  },
  {
    name: "Priya Patel",
    role: "Cultural Club Lead",
    image: "/api/placeholder/150/150",
    quote: "AtomiCity has revolutionized how we manage cultural events. The support from the team is outstanding!"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-purple-500 to-purple-600 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-7xl font-semibold text-center mb-16 text-white">
          Voices <span className=" font-thin"><i>@</i>Atomi<span className='font-semibold'>City</span></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`backdrop-blur-lg bg-white/10 border-white/20 ${
                index === 0 ? 'lg:col-span-2' : ''
              } transform hover:scale-102 transition-all duration-300 group`}
            >
              <CardContent className="p-8">
                <Quote className="text-white/60 mb-6" size={24} />
                <p className="text-white/90 mb-8 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 ring-2 ring-white/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-purple-700 text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;