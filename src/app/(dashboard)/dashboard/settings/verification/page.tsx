'use client';

import { useState, useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import { User } from 'firebase/auth';

const VerificationPage = () => {
  const [countdown, setCountdown] = useState(0);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      if (currentUser.emailVerified) {
        router.push('/dashboard');
      }
    }
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSendVerification = async () => {
    if (countdown > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Tunggu Sebentar',
        text: `Anda dapat mengirimkan ulang verifikasi setelah ${countdown} detik.`,
      });
      return;
    }

    try {
      if (user) {
        await sendEmailVerification(user);
        setIsVerificationSent(true);
        setCountdown(300);
        Swal.fire({
          icon: 'success',
          title: 'Email Verifikasi Dikirim',
          text: 'Silakan cek inbox Anda untuk email verifikasi.',
        });
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim Verifikasi',
        text: 'Terjadi kesalahan saat mengirim email verifikasi.',
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='card glass w-full max-w-lg shadow-xl p-6 space-y-4'>
        <h2 className='text-center text-2xl font-semibold'>Verifikasi Email</h2>

        <div className='space-y-6'>
          <p className='text-center'>
            Email verifikasi akan dikirimkan ke <strong>{user?.email}</strong>.
          </p>

          {!isVerificationSent ? (
            <button
              className='btn btn-primary w-full'
              onClick={handleSendVerification}
            >
              Kirim Email Verifikasi
            </button>
          ) : (
            <p className='text-center text-sm text-gray-500'>
              Email verifikasi telah dikirim. Silakan cek inbox Anda. Anda dapat
              mengirim ulang setelah {countdown} detik.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
