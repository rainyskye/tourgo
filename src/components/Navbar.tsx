'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Map, MapPin, Settings, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Map', icon: Map },
    { href: '/nearby', label: 'Nearby', icon: MapPin },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a href="#" className="flex items-center py-5 px-2 text-white">
                <span className="font-bold">MyMapApp</span>
              </a>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-5 px-3 hover:text-blue-200 transition duration-300 flex items-center ${
                    pathname === item.href ? 'text-blue-200 border-b-2 border-blue-200' : ''
                  }`}
                >
                  <Icon className="mr-1 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button p-2 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 text-sm hover:bg-blue-700 transition duration-300 flex items-center ${
                pathname === item.href ? 'bg-blue-700' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon className="mr-1 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;