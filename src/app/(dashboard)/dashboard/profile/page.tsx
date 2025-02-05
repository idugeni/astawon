'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMetadata } from '@/hooks/useMetadata';
import { FiUser, FiUsers, FiClipboard } from 'react-icons/fi';

interface Stats {
  posts: number;
  followers: number;
  following: number;
}

export default function ProfilePage() {
  useMetadata('Profile', 'Profile page for the user dashboard');

  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('/default-avatar.png');
  const [bio, setBio] = useState<string>('');
  const [lastLogin, setLastLogin] = useState<string>('');

  // Inisialisasi stats langsung tanpa setStats
  const stats: Stats = {
    posts: Math.floor(Math.random() * 50),
    followers: Math.floor(Math.random() * 500),
    following: Math.floor(Math.random() * 200),
  };

  // Function to generate bio based on display name
  const generateBio = (name: string): string =>
    `Hi, I'm ${name}. Welcome to my profile!`;

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || 'Anonymous User');
      setPhotoURL(user.photoURL || '/default-avatar.png');
      setBio(generateBio(user.displayName || 'Anonymous User'));
      setLastLogin(
        user.metadata?.lastSignInTime
          ? new Date(user.metadata.lastSignInTime).toLocaleString()
          : 'Unknown'
      );
    }
  }, [user]);

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='alert alert-error max-w-md mx-auto p-8'>
          Unauthorized! Please login to view this page.
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8 flex justify-center flex-col items-center'>
      {/* Profile Header */}
      <div className='card bg-gradient-to-r from-primary to-secondary shadow-2xl p-8 rounded-2xl text-center text-white max-w-lg w-full mb-8'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='avatar'>
            <div className='w-36 h-36 rounded-full ring-4 ring-white bg-base-200 overflow-hidden'>
              <Image
                src={photoURL}
                alt='Profile'
                width={144}
                height={144}
                className='rounded-full object-cover'
                referrerPolicy='no-referrer'
              />
            </div>
          </div>
          <h1 className='text-3xl font-bold'>{displayName}</h1>
          <p className='opacity-90 text-lg'>{user.email}</p>
          <p className='opacity-80 text-md'>{bio}</p>
          <p className='text-sm opacity-70'>Last login: {lastLogin}</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className='w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
        <div className='stats shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg flex flex-col items-center'>
          <FiClipboard className='text-4xl mb-2' />
          <h2 className='text-2xl font-bold'>{stats.posts}</h2>
          <p className='text-sm opacity-80'>Posts</p>
        </div>
        <div className='stats shadow-xl bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg flex flex-col items-center'>
          <FiUsers className='text-4xl mb-2' />
          <h2 className='text-2xl font-bold'>{stats.followers}</h2>
          <p className='text-sm opacity-80'>Followers</p>
        </div>
        <div className='stats shadow-xl bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-lg flex flex-col items-center'>
          <FiUser className='text-4xl mb-2' />
          <h2 className='text-2xl font-bold'>{stats.following}</h2>
          <p className='text-sm opacity-80'>Following</p>
        </div>
      </div>
    </div>
  );
}
