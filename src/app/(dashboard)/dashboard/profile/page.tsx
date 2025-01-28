'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import { useMetadata } from '@/utils/MetadataContext';

export default function Profile() {
  useMetadata(
    'User Profile',
    'View and manage your profile information on the ASTAWON dashboard.'
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='card glass w-full max-w-xl shadow-xl p-6 space-y-4'>
        <div className='flex justify-center'>
          <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300'>
            <Image
              src={user.photoURL || '/author.jpeg'}
              alt='User Avatar'
              width={96}
              height={96}
              className='object-cover'
            />
          </div>
        </div>
        <h2 className='text-center text-2xl font-semibold'>
          {user.displayName || user.email}
        </h2>
        <p className='text-center text-gray-600'>{user.email}</p>
      </div>
    </div>
  );
}
