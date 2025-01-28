'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaRocket,
  FaGear,
  FaRightToBracket,
  FaFileLines,
} from 'react-icons/fa6';
import { logoutUser } from '@/lib/auth';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <FaRocket /> },
  { href: '/dashboard/article', label: 'Article', icon: <FaFileLines /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <FaGear /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Keluar',
        text: 'Apakah Anda yakin ingin keluar? Semua sesi aktif akan diakhiri, dan Anda akan diarahkan ke halaman utama.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
        customClass: {
          confirmButton: 'bg-red-600 text-white hover:bg-red-700',
          cancelButton: 'bg-gray-300 text-black hover:bg-gray-400',
        },
      });

      if (result.isConfirmed) {
        await logoutUser();
        await Swal.fire({
          title: 'Logout Berhasil',
          text: 'Anda telah berhasil keluar. Sampai jumpa kembali!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        router.push('/');
      } else {
        Swal.fire({
          title: 'Logout Dibatalkan',
          text: 'Anda tetap berada di halaman saat ini.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Logout Gagal',
        text: 'Terjadi kesalahan saat memproses logout. Silakan coba lagi nanti.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div data-theme='night' className='relative'>
      {/* Sidebar for large screens (lg and up) */}
      <div className='hidden lg:flex flex-col w-64 bg-base-200 border-r border-neutral shadow-md h-screen fixed left-0 top-0 z-50 text-base-content'>
        <div className='pt-4'>
          <h2 className='text-2xl font-extrabold text-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 text-transparent bg-clip-text tracking-wide uppercase'>
            ASTAWON
          </h2>
        </div>
        <div className='divider mt-2'></div>
        <nav className='p-4 flex-grow'>
          <ul className='space-y-4'>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary-focus'
                  }`}
                >
                  {item.icon}
                  <span className='ml-3'>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Move Logout Link to the bottom */}
        <div className='mt-auto p-4'>
          <Link
            href='#'
            onClick={handleLogout}
            className='flex items-center p-3 rounded-lg hover:bg-primary-focus transition-colors duration-300 w-full'
          >
            <FaRightToBracket />
            <span className='ml-3'>Keluar</span>
          </Link>
        </div>
      </div>

      {/* Sidebar for mobile screens */}
      <div className='lg:hidden fixed left-0 top-0 z-50 bg-base-200 h-full shadow-md flex flex-col justify-between'>
        <div className='pt-4 text-center'>
          <h2 className='text-xl font-extrabold text-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 text-transparent bg-clip-text tracking-wide uppercase'>
            A
          </h2>
        </div>
        <div className='divider mt-2'></div>
        <ul className='menu flex flex-grow flex-col items-center justify-center space-y-4 w-full'>
          {menuItems.map((item) => (
            <li
              key={item.href}
              className='flex items-center justify-center w-auto'
            >
              <Link
                href={item.href}
                className={`tooltip tooltip-right flex items-center justify-center bg-primary text-white p-3 rounded-full transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-primary'
                    : 'hover:bg-secondary-focus'
                }`}
                data-tip={item.label}
              >
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
        {/* Move Logout Link to the bottom */}
        <div className='p-4'>
          <Link
            href='#'
            onClick={handleLogout}
            className='flex items-center justify-center bg-error text-white p-3 rounded-full hover:bg-error-focus transition-colors duration-300 w-full'
            data-tip='Keluar'
          >
            <FaRightToBracket />
          </Link>
        </div>
      </div>
    </div>
  );
}
