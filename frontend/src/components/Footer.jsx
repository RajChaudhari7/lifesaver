import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10 text-sm">

        {/* Brand */}
        <div>
          <img src={assets.logo} className="w-24 mb-4" alt="logo" />
          <p className="text-gray-600 leading-6">
            Making healthcare simple, accessible, and stress-free. Book appointments, connect with trusted doctors, and manage your health seamlessly.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link className="hover:text-black transition" to="/">Home</Link></li>
            <li><Link className="hover:text-black transition" to="/doctors">Doctors</Link></li>
            <li><Link className="hover:text-black transition" to="/about">About</Link></li>
            <li><Link className="hover:text-black transition" to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-600">
            <li>📞 8600412566</li>
            <li>📧 lifesaver@gmail.com</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-600">
            <Facebook className="cursor-pointer hover:text-black" />
            <Twitter className="cursor-pointer hover:text-black" />
            <Instagram className="cursor-pointer hover:text-black" />
            <Linkedin className="cursor-pointer hover:text-black" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t text-center py-5 text-gray-500 text-sm">
        © {new Date().getFullYear()} LifeSaver. All rights reserved.
      </div>
    </footer>
  );
};