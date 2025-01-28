import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='bg-base-100 shadow-md sticky top-0 z-50'>
      <div className='navbar max-w-7xl mx-auto'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/about'>About</Link>
              </li>
              <li>
                <Link href='/contact'>Contact</Link>
              </li>
            </ul>
          </div>
          <Link
            href='/'
            className='btn btn-ghost normal-case text-2xl font-extrabold transition-all duration-300'
          >
            ASTAWON
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <Link
            href='/login'
            className='btn btn-sm rounded-full bg-white text-black border-neutral-200 flex items-center'
          >
            <svg
              aria-label='Email icon'
              width='16'
              height='16'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='mr-2 hidden sm:block'
            >
              <g
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth='2'
                fill='none'
                stroke='black'
              >
                <rect width='20' height='16' x='2' y='4' rx='2'></rect>
                <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
              </g>
            </svg>
            <span className='hidden sm:block'>Login with Email</span>
            <span className='sm:hidden'>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
