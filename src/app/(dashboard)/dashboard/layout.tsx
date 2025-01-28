'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardFooter from '@/components/DashboardFooter';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className='flex flex-col lg:flex-row'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='pl-16 lg:pl-64 w-full min-h-screen bg-base-100 flex-1'>
        <DashboardNavbar />

        {/* Page Content */}
        {children}

        <DashboardFooter />
      </div>

      <Toaster position='top-right' />
    </div>
  );
}
