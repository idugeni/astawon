"use client";

import { useState, FormEvent } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';

import { auth } from '@/lib/firebase';

export default function SecurityTab() {
  const [user] = useAuthState(auth);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || !user.email) return;

    // Validation checks
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all password fields.'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New passwords do not match.'
      });
      return;
    }

    if (currentPassword === newPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Password',
        text: 'New password cannot be the same as the current password.'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'Your password has been successfully changed.'
      });

      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
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
    <form onSubmit={handlePasswordUpdate} className="space-y-4">
      <div className="form-control relative">
        <label className="label">
          <span className="label-text flex items-center">
            <FaLock className="mr-2" /> Current Password
          </span>
        </label>
        <div className="flex items-center">
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input input-bordered w-full focus:ring-0 focus:outline-transparent pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 text-gray-500"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="form-control relative">
        <label className="label">
          <span className="label-text flex items-center">
            <FaLock className="mr-2" /> New Password
          </span>
        </label>
        <div className="flex items-center">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full focus:ring-0 focus:outline-transparent pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 text-gray-500"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="form-control relative">
        <label className="label">
          <span className="label-text flex items-center">
            <FaLock className="mr-2" /> Confirm New Password
          </span>
        </label>
        <div className="flex items-center">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full focus:ring-0 focus:outline-transparent pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
}