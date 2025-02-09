"use client";

import { useState, FormEvent } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateProfile, updateEmail } from 'firebase/auth';
import Swal from 'sweetalert2';

import { auth } from '@/lib/firebase';

export default function ProfileTab() {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setIsLoading(true);

    try {
      // Check if there are actually changes
      if (displayName === user.displayName && email === user.email) {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'No updates were made to your profile.'
        });
        return;
      }

      // Update display name
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }

      // Update email
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been successfully updated.'
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text flex items-center">
            <FaUser className="mr-2" /> Display Name
          </span>
        </label>
        <input
          type="text"
          placeholder="Enter display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="input input-bordered w-full focus:ring-0 focus:outline-transparent"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text flex items-center">
            <FaEnvelope className="mr-2" /> Email Address
          </span>
        </label>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full focus:ring-0 focus:outline-transparent"
          required
        />
      </div>

      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </form>
  );
}