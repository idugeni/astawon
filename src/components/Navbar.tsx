'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaGoogle, FaXmark, FaUserGear  } from 'react-icons/fa6';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  // Daftar menu
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ];

  return (
    <nav
      data-theme='night'
      className='sticky top-0 z-50 border-b border-base-200 bg-base-100/80 shadow-lg backdrop-blur-md transition-all duration-300'
    >
      <div className='navbar container-fluid mx-auto px-4'>
        <div className='navbar-start'>
          {/* Mobile Menu Button */}
          <button
            className='btn btn-ghost btn-square lg:hidden'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaXmark className='h-5 w-5 text-primary' />
            ) : (
              <FaBars className='h-5 w-5' />
            )}
          </button>

          {/* Brand Logo */}
          <Link href='/' className='btn btn-ghost hover:bg-transparent'>
            <span className='text-2xl font-extrabold letter-spacing-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              ASTAWON
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal gap-1 px-1'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className='font-semibold hover:bg-base-200 hover:text-primary-focus transition duration-300'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Login/Dashboard Button */}
        <div className='navbar-end'>
          {user ? (
            // Jika pengguna sudah login, tampilkan tombol "Dashboard"
            <Link
              href='/dashboard'
              className='btn btn-primary group rounded-full px-6 hover:bg-base-content transition-all duration-300'
            >
              <FaUserGear  className='h-4 w-4 transition-transform group-hover:scale-105' />
              <span className='hidden sm:block text-sm md:text-base'>
                Dashboard
              </span>
            </Link>
          ) : (
            // Jika pengguna belum login, tampilkan tombol "Login"
            <Link
              href='/login'
              className='btn btn-primary group rounded-full px-6 hover:bg-base-content transition-all duration-300'
            >
              <FaGoogle className='h-4 w-4 transition-transform group-hover:scale-105' />
              <span className='ml-2 hidden sm:block text-sm md:text-base'>
                Login
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <ul className='menu w-full mx-auto mb-4 mt-2 space-y-2 rounded-box border border-base-200 bg-base-100 p-2 px-4 shadow-lg flex items-center justify-center'>
          {menuItems.map((item, index) => (
            <li className='w-full' key={index}>
              <Link
                href={item.href}
                className='btn btn-block btn-soft font-semibold hover:bg-base-200 hover:text-secondary transition-all duration-300'
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
