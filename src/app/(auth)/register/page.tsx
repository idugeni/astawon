'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { useMetadata } from '@/hooks/useMetadata';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function RegisterPage() {
  useMetadata('Register', 'Register page for the admin panel');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

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

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Semua field harus diisi!',
        text: 'Pastikan nama, email, dan password telah diisi.',
      });
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(email, password);
      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil',
        text: 'Silakan login untuk melanjutkan.',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push('/login');
      });
    } catch (error) {
      setLoading(false);

      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan saat mendaftar. Coba lagi nanti.',
      });
    }
  };

  return (
    <div className='flex items-center justify-center grid-background p-8 overflow-hidden'>
      <div className='card bg-base-200 w-full max-w-4xl shadow-xl flex flex-col lg:flex-row transition-all overflow-auto'>
        <div className='hidden lg:flex w-1/2 items-center justify-center p-6 md:p-8 relative'>
          <Image
            src='/background-made-paper-cuts.avif'
            alt='Register Illustration'
            fill
            className='object-cover rounded-tl-md rounded-bl-md'
          />
        </div>

        <div className='w-full p-6 sm:p-8 rounded-md lg:rounded-tr-md lg:rounded-br-md lg:rounded-none lg:w-1/2'>
          <h2 className='text-3xl sm:text-4xl font-semibold text-center text-gradient tracking-wide uppercase mb-6'>
            Daftar
          </h2>
          <p className='text-sm text-center mb-8'>
            Buat akun baru untuk mengakses layanan.
          </p>
          <form onSubmit={handleRegister} className='space-y-4' noValidate>
            <div className='form-control'>
              <label
                htmlFor='name'
                className='label mb-2 text-sm font-semibold text-neutral-content'
              >
                Nama Lengkap
              </label>
              <div className='flex items-center border border-neutral-300 rounded-md'>
                <span className='pl-3 pr-2 border-r border-neutral-300'>
                  <FaUser className='text-neutral-content' />
                </span>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='input bg-transparent border-none focus:outline-none w-full pl-3 focus:shadow-none'
                  placeholder='Nama Lengkap'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete='off'
                />
              </div>
            </div>

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
                  className='input bg-transparent border-none focus:outline-none w-full pl-3 focus:shadow-none'
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
                  className='input bg-transparent border-none focus:outline-none w-full pl-3 pr-10'
                  placeholder='********'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete='new-password'
                />
                <button
                  type='button'
                  className='absolute right-3 text-neutral-content'
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

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn w-full btn-primary ${loading ? 'pointer-events-none' : ''
                  }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Loading...
                  </>
                ) : (
                  'Daftar'
                )}
              </button>
            </div>
          </form>
          <p className='text-center text-sm mt-4'>
            Sudah punya akun?{' '}
            <Link href='/login' className='text-info'>
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
