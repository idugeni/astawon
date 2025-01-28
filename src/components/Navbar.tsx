"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaEnvelope, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-theme="business">
      <nav className="sticky top-0 z-50 border-b border-base-200 bg-base-100/80 backdrop-blur-md transition-all duration-300">
        <div className="navbar container mx-auto px-4">
          <div className="navbar-start">
            {/* Mobile Menu Button */}
            <button
              className="btn btn-ghost btn-square lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FaTimes className="h-5 w-5 text-primary" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>

            {/* Brand Logo */}
            <Link
              href="/"
              className="btn btn-ghost text-xl font-bold normal-case hover:bg-transparent"
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ASTAWON
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal menu-md gap-1 px-1">
              <li>
                <Link
                  href="/"
                  className="rounded-lg font-medium hover:bg-base-200 hover:text-primary-focus"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="rounded-lg font-medium hover:bg-base-200 hover:text-primary-focus"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="rounded-lg font-medium hover:bg-base-200 hover:text-primary-focus"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          <div className="navbar-end">
            <Link
              href="/login"
              className="btn btn-primary btn-md group rounded-full px-6 shadow-lg hover:shadow-primary/30"
            >
              <FaEnvelope className="h-4 w-4 transition-transform group-hover:scale-105" />
              <span className="ml-2 hidden sm:block">Email Login</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <ul className="menu menu-compact mx-4 mb-4 mt-2 space-y-2 rounded-box border border-base-200 bg-base-100 p-2 shadow-lg">
            <li>
              <Link
                href="/"
                className="rounded-lg font-medium hover:bg-base-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="rounded-lg font-medium hover:bg-base-200"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="rounded-lg font-medium hover:bg-base-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
