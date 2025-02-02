"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHouse,
  FaUser,
  FaGear,
  FaChartColumn,
  FaBars,
  FaRegFileLines
} from "react-icons/fa6";
import Image from "next/image";
import Swal from "sweetalert2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <FaHouse className="text-lg" /> },
    { name: "Article", href: "/dashboard/article", icon: <FaRegFileLines className="text-lg" /> },
    { name: "Profile", href: "/dashboard/profile", icon: <FaUser className="text-lg" /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FaGear className="text-lg" /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <FaChartColumn className="text-lg" /> },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        Unauthorized! Please{" "}
        <Link href="/login" className="link link-primary">
          login
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          window.location.href = "/";
        });
      }
    });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="w-full navbar bg-base-100 shadow-lg px-4 sm:px-6">
          <div className="flex-none lg:hidden">
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-square btn-ghost"
        >
          <FaBars className="text-xl" />
        </label>
          </div>
          
          <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <span className="font-bold">ASTAWON</span>
        </Link>
          </div>
          
          <div className="flex-none gap-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
          <Image
            src={user.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
          <Link href="#" onClick={handleLogout}>
            Logout
          </Link>
            </li>
          </ul>
        </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-base-200 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer footer-center p-6 bg-base-300 text-base-content">
          <aside>
        <p className="font-medium">
          © {new Date().getFullYear()} <Link href="/" className="text-primary">ASTAWON</Link> - Humas Rutan Wonosobo
        </p>
          </aside>
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        
        <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content shadow-lg border-r border-base-200">
          {/* User Profile Section */}
          <div className="mb-4 p-4 bg-base-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <Image
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <p className="font-bold truncate">{user.displayName || "User"}</p>
                <p className="text-sm opacity-75 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex gap-3 items-center py-3 px-4 rounded-lg transition-colors ${
                    pathname === link.href 
                      ? "bg-primary text-primary-content" 
                      : "hover:bg-base-200"
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}