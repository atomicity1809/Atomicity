import React from 'react';
import { CreditCard, Ticket, Globe, Bell, BarChart, Shield } from 'lucide-react';

const AdditionalFeatures: React.FC = () => {
  const features = [
    { 
      icon: CreditCard, 
      title: "Secure Payments", 
      description: "Process ticket sales and donations with our integrated, secure payment gateway" 
    },
    { 
      icon: Ticket, 
      title: "Ticket Management", 
      description: "Create, customize, and manage tickets with ease, including QR code generation" 
    },
    { 
      icon: Globe, 
      title: "Virtual Events", 
      description: "Host engaging online events with our built-in streaming and interaction tools" 
    },
    { 
      icon: Bell, 
      title: "Smart Notifications", 
      description: "Keep attendees informed with automated, customizable event reminders" 
    },
    { 
      icon: BarChart, 
      title: "Advanced Reporting", 
      description: "Generate comprehensive reports on attendance, revenue, and engagement metrics" 
    },
    { 
      icon: Shield, 
      title: "GDPR Compliance", 
      description: "Ensure data protection with our GDPR-compliant data management tools" 
    }
  ];

  return (
    <section className="py-20 bg-purple-500">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Powerful Features for Exceptional Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <feature.icon size={24} className="text-purple-500 mr-3" />
                <h3 className="text-xl font-semibold text-purple-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeatures;