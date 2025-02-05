import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      data-theme='night'
      className='flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content px-4'
    >
      <h1 className='text-9xl font-extrabold text-error mb-6'>404</h1>
      <h2 className='text-3xl font-bold text-primary mb-4'>
        Oops! Page Not Found
      </h2>
      <p className='text-lg text-gray-600 mb-8 text-center'>
        The page you’re looking for might have been moved or doesn’t exist.
      </p>
      <Link
        href='/'
        className='btn btn-primary text-white hover:bg-primary-focus transition duration-300'
      >
        Return Home
      </Link>
    </div>
  );
}
