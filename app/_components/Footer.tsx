import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 pb-3">
      {/* Logo Section */}
      

      <div className="max-w-6xl mx-auto border-t border-gray-200 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Company Info */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm">atomicity1809@gmail.com</span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <Image 
              src={"/imgs/atomicity_logo.png"}
              alt='atomicity_logo'
              width={40}
              height={40}

            />
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © Atomicity Events Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;