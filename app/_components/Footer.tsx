import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black  text-gray-300">
    {/* <div className=' bg-white flex justify-center'>
        <Image
            src="/imgs/atomicity_banner.png"
            alt='atomicity logo'
            height={100}
            width={400}
            className=' object-contain'
        />
    </div> */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:py-2 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  {['Marketing', 'Analytics', 'Commerce', 'Insights'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-base hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  {['Pricing', 'Documentation', 'Guides', 'API Status'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-base hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  {['About', 'Blog', 'Jobs', 'Press', 'Partners'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-base hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {['Privacy', 'Terms', 'Cookie Policy', 'Trademark Policy'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-base hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-300">
              The latest events and happenings around you sent to your inbox weekly.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400 sm:max-w-xs"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <Button type="submit" className="w-full bg-white text-black hover:bg-white hover:text-black">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {[
              { icon: Facebook, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Instagram, href: '#' },
              { icon: Linkedin, href: '#' },
            ].map(({ icon: Icon, href }) => (
              <a key={Icon.name} href={href} className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">{Icon.name}</span>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024-25 Atomicity Events Inc. | All rights reserved.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5" />
            <span>atomicity1809@gmail.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-5 w-5" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-5 w-5" />
            <span>123 Main St, Anytown, ST 12345</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;