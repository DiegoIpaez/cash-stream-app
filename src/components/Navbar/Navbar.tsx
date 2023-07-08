"use client";
import Link from "next/link";
import { useState } from "react";
import { HamburgerMenu, NavItems } from "./components";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link
                href={"/"}
                className="text-sm font-medium text-white px-3 py-2"
              >
                Cash Stream
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navlinks for screens larger than 600px */}
              <div className="hidden sm:block">
                <NavItems />
              </div>
              {/* Hamburger menu for screens smaller than 600px */}
              <HamburgerMenu toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
        {/* Dropdown menu for screens smaller than 600px */}
        {menuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavItems className="block text-sm font-medium text-white hover:bg-gray-700 px-3 py-2 rounded-md" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
