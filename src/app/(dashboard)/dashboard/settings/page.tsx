"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { 
  FaPalette,
  FaBell,
  FaShieldHalved,
  FaTrash,
  FaKey
} from "react-icons/fa6";
import { useState } from "react";
import { deleteUser } from "firebase/auth";
import Swal from "sweetalert2";

export default function SettingsPage() {
  const [user] = useAuthState(auth);
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
      setIsProcessing(true);
      await deleteUser(user);
      Swal.fire(
        'Deleted!',
        'Your account has been deleted.',
        'success'
      );
      // Redirect to login or home page after deletion
      } catch {
      Swal.fire(
        'Error!',
        'There was an error deleting your account.',
        'error'
      );
      // Handle re-authentication needed
      } finally {
      setIsProcessing(false);
      }
    }

    try {
      setIsProcessing(true);
      await deleteUser(user);
      // Redirect to login or home page after deletion
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle re-authentication needed
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">
            <FaPalette className="text-xl" /> Appearance
          </h2>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Theme</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">
            <FaBell className="text-xl" /> Notifications
          </h2>
          
          <div className="space-y-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email Notifications</span>
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary" 
                  defaultChecked 
                />
              </label>
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Push Notifications</span>
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary" 
                  defaultChecked 
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">
            <FaShieldHalved className="text-xl" /> Security
          </h2>
          
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaKey /> Change Email
                </span>
              </label>
              <div className="join w-full">
                <input
                  type="email"
                  className="input input-bordered join-item w-full"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button className="btn btn-outline join-item">
                  Update Email
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaKey /> Change Password
                </span>
              </label>
              <div className="join w-full">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="input input-bordered join-item w-full"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button className="btn btn-outline join-item">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dangerous Zone */}
      <div className="card bg-base-100 shadow border border-error">
        <div className="card-body">
          <h2 className="card-title text-error">
            <FaTrash className="text-xl" /> Dangerous Zone
          </h2>
          
          <div className="space-y-4">
            <div className="alert alert-error">
              <div>
                <span>Permanent account deletion. This action cannot be undone.</span>
              </div>
            </div>
            
            <button 
              className="btn btn-error w-full"
              onClick={handleDeleteAccount}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="loading loading-infinity"></span>
              ) : (
                <>
                  <FaTrash /> Delete Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}