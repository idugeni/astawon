// src/components/DashboardNavbar.tsx
import Link from 'next/link';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGreeting } from '@/utils/greeting';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';
import Swal from 'sweetalert2';

const DashboardNavbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Keluar',
        text: 'Apakah Anda yakin ingin keluar?',
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
          text: 'Anda telah berhasil keluar.',
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
    <nav className='navbar bg-base-200 px-8 border-b border-neutral text-base-content shadow-md'>
      <div className='flex-1'>
        <span className='hidden md:block text-sm'>
          <span className='font-bold'>{getGreeting()}</span>{' '}
          <span className='font-mono'>[{user?.email}]</span>
        </span>
      </div>

      <div className='flex-none'>
        <div className='dropdown dropdown-hover dropdown-end'>
          <div tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <Image
                src='/author.jpeg'
                alt='User Avatar'
                width={40}
                height={40}
                className='rounded-full'
              />
            </div>
          </div>
          <ul className='dropdown-content menu menu-sm bg-base-200 text-base-content rounded-box z-10 p-0 shadow-md'>
            <li>
              <Link href='/dashboard/profile' className='px-6 rounded-none'>
                Profile
              </Link>
            </li>
            <li>
              <Link href='/dashboard/settings' className='px-6 rounded-none'>
                Settings
              </Link>
            </li>
            <li>
              <Link
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className='px-6 rounded-none text-red-600 hover:text-red-700 transition-colors duration-300 w-full'
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
