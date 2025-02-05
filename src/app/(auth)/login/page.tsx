'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa6';
import { validateInputs } from '@/utils/validate';
import Swal from 'sweetalert2';
import { useMetadata } from '@/hooks/useMetadata';

export default function LoginPage() {
  useMetadata('Login', 'Login page for the admin panel');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateInputs(email, password)) return;

    setLoading(true);

    try {
      await loginUser(email, password);

      Swal.fire({
        icon: 'success',
        title: 'Selamat Datang Kembali! 🎉',
        text: 'Login berhasil! Mohon tunggu, Anda akan diarahkan ke dashboard dalam beberapa saat.',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => router.push('/dashboard'),
      });
    } catch {
      setLoading(false);

      Swal.fire({
        icon: 'error',
        title: 'Login Gagal 😞',
        text: 'Email atau password yang Anda masukkan salah. Silakan coba lagi.',
        confirmButtonText: 'Coba Lagi',
      });
    }
  };

  return (
    <div className='flex items-center justify-center p-8 grid-background overflow-hidden'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl flex flex-col lg:flex-row transition-all overflow-auto'>
        <div className='w-full lg:w-1/2 p-6 sm:p-8'>
          <h2 className='text-3xl sm:text-4xl font-semibold text-center text-gradient tracking-wide uppercase mb-6'>
            Masuk
          </h2>
          <p className='text-sm text-center mb-8'>
            Masukkan email dan password Anda untuk melanjutkan.
          </p>
          <form onSubmit={handleLogin} className='space-y-4' noValidate>
            <div className='form-control'>
              <label
                htmlFor='email'
                className='label mb-2 text-sm font-semibold text-neutral-content'
              >
                Email
              </label>
              <div className='flex items-center border border-neutral-300 rounded-md'>
                <span className='pl-3 pr-2 border-r border-neutral-300'>
                  <FaEnvelope className='text-neutral-content' />
                </span>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='input bg-transparent border-none focus:outline-none focus:shadow-none w-full pl-3'
                  placeholder='example@gmail.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete='off'
                />
              </div>
            </div>

            <div className='form-control'>
              <label
                htmlFor='password'
                className='label mb-2 text-sm font-semibold text-neutral-content'
              >
                Password
              </label>
              <div className='flex items-center border border-neutral-300 rounded-md relative'>
                <span className='pl-3 pr-2 border-r border-neutral-300'>
                  <FaLock className='text-neutral-content' />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  className='input bg-transparent border-none focus:outline-none focus:shadow-none w-full pl-3 pr-10'
                  placeholder='********'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete='off'
                />
                <button
                  type='button'
                  className='absolute right-3 text-gray-700'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className='text-neutral-content' />
                  ) : (
                    <FaEye className='text-neutral-content' />
                  )}
                </button>
              </div>
            </div>

            <div className='form-control mt-6'>
              <button
                type='submit'
                className={`btn w-full btn-primary ${
                  loading ? 'pointer-events-none' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <span className='loading loading-infinity loading-lg text-primary'></span>
                    <span className='ml-2'>Loading...</span>
                  </div>
                ) : (
                  'Masuk'
                )}
              </button>
            </div>
          </form>
          <p className='text-center text-sm mt-4'>
            Belum punya akun?{' '}
            <Link href='/register' className='text-info'>
              Daftar
            </Link>
          </p>
        </div>
        <div className='hidden lg:flex w-1/2 items-center justify-center p-6 md:p-8 relative'>
          <Image
            src='/sculpture-woman-with-word-i-love-it.jpg'
            alt='Login Illustration'
            fill
            className='object-cover rounded-tr-md rounded-br-md'
          />
        </div>
      </div>
    </div>
  );
}
