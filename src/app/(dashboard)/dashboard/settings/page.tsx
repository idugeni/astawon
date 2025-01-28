'use client';

import { useState, useEffect } from 'react';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useMetadata } from '@/utils/MetadataContext';

export default function Settings() {
  useMetadata(
    'Settings',
    'Change your account password and manage other account settings.'
  );
  const [user, setUser] = useState<User | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsEmailVerified(user.emailVerified);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && !isEmailVerified) {
      router.push('/dashboard/settings/verification');
    }
  }, [user, isEmailVerified, router]);

  useEffect(() => {
    if (
      currentPassword &&
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword &&
      newPassword !== currentPassword &&
      newPassword.length >= 8 &&
      isEmailVerified
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [currentPassword, newPassword, confirmPassword, isEmailVerified]);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Semua kolom harus diisi.',
      });
      return;
    }

    if (newPassword === currentPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Password lama dan password baru tidak boleh sama.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Password baru dan konfirmasi password tidak cocok.',
      });
      return;
    }

    if (newPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Password baru harus terdiri dari minimal 8 karakter.',
      });
      return;
    }

    const userCredential = auth.currentUser;
    if (!userCredential) return;

    try {
      const credentials = EmailAuthProvider.credential(
        userCredential.email!,
        currentPassword
      );
      await reauthenticateWithCredential(userCredential, credentials);

      await updatePassword(userCredential, newPassword);

      Swal.fire({
        icon: 'success',
        title: 'Password Berhasil Diubah',
        text: 'Password Anda telah berhasil diubah.',
      });

      await signOut(auth);

      router.push('/login');
    } catch (error) {
      console.error('Error during password change:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengubah Password',
        text: 'Pastikan password lama Anda benar.',
      });
    }
  };

  if (!user) {
    return (
      <div className='fixed inset-0 w-screen h-screen bg-gradient-to-r from-base-300 via-base-200 to-base-100 flex justify-center items-center z-50'>
        <span className='loading loading-infinity loading-xl'></span>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='card glass w-full max-w-lg shadow-xl p-6 space-y-4'>
        <h2 className='text-center text-2xl font-semibold'>Pengaturan Akun</h2>

        <div className='space-y-6'>
          <div className='form-group'>
            <label className='floating-label'>
              <span>Password Lama</span>
              <input
                type='password'
                placeholder='Password Lama'
                className='input input-bordered border-none w-full focus:outline-none focus:border-transparent'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>

          <div className='form-group'>
            <label className='floating-label'>
              <span>Password Baru</span>
              <input
                type='password'
                placeholder='Password Baru'
                className='input input-bordered border-none w-full focus:outline-none focus:border-transparent'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>

          <div className='form-group'>
            <label className='floating-label'>
              <span>Konfirmasi Password Baru</span>
              <input
                type='password'
                placeholder='Konfirmasi Password Baru'
                className='input input-bordered border-none w-full focus:outline-none focus:border-transparent'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='off'
              />
            </label>
          </div>

          <button
            className='btn btn-primary w-full'
            onClick={handleChangePassword}
            disabled={isButtonDisabled}
          >
            Ubah Password
          </button>
        </div>
      </div>
    </div>
  );
}
