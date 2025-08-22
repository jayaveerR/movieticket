"use client";

import { FaTwitter, FaDiscord, FaGithub, FaLinkedin, FaChevronRight } from "react-icons/fa";

export default function Footer() {
  return (
    <>
    <br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> <br /><br />
    <footer className="w-full bg-white text-gray-700 rounded-t-2xl shadow-lg border-t border-gray-200 p-10">
      {" "}
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-purple-600">Royaltix</h2>
          <p className="mt-3 text-sm text-gray-500">Beautifully designed UI components to elevate your projects.</p>
          <div className="flex gap-4 mt-4 text-xl text-gray-500">
            <a href="#" className="hover:text-purple-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-purple-500">
              <FaDiscord />
            </a>
            <a href="#" className="hover:text-purple-500">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-purple-500">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Product</h3>
          <ul className="space-y-3 text-gray-500">
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Features
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Pricing
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Integrations
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Documentation
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
          <ul className="space-y-3 text-gray-500">
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Blog
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Guides
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Support
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> API Status
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
          <ul className="space-y-3 text-gray-500">
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> About
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Careers
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Press
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-purple-500">
                <FaChevronRight className="mr-2 text-xs" /> Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 text-sm text-gray-500">
        <p>&copy; 2023 Aceternity UI. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-purple-500">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-purple-500">
            Terms of Service
          </a>
          <a href="#" className="hover:text-purple-500">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
    </>
  );
}
