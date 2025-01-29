"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { FaUser, FaCamera, FaFloppyDisk, FaTrash, FaShieldHalved } from "react-icons/fa6";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      await updateProfile(user, {
        displayName,
        photoURL: photoURL || null
      });
      toast.success("Profile updated successfully!", {
        style: {
          background: '#4f46e5',
          color: '#fff',
          border: '1px solid #3b82f6'
        }
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.", {
        style: {
          background: '#ef4444',
          color: '#fff',
          border: '1px solid #dc2626'
        }
      });
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: 'Delete Account?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#4f46e5',
      confirmButtonText: 'Delete',
      background: '#1f2937',
      color: '#fff',
      customClass: {
        popup: 'rounded-xl border border-base-300',
        confirmButton: 'bg-error hover:bg-error/90'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement delete account logic
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <div className="alert alert-error max-w-md mx-auto">
          Unauthorized! Please login to view this page
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-primary to-secondary rounded-xl mb-20">
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="avatar relative group">
                  <div className="w-32 h-32 rounded-full ring-4 ring-base-100 bg-base-200">
                    <Image
                      src={photoURL || "/default-avatar.png"}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-base-100 p-2 rounded-full shadow-lg cursor-pointer hover:bg-base-200 transition-all">
                      <FaCamera className="text-xl" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPhotoURL(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                            }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mt-20">
              <h1 className="text-3xl font-bold">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input input-ghost text-center text-3xl font-bold"
                  />
                ) : (
                  user.displayName || "Anonymous User"
                )}
              </h1>
              <p className="text-base-content/70 mt-2">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <FaUser className="text-primary" />
              Account Settings
            </h2>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Display Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo URL</span>
                </label>
                <div className="join">
                  <input
                    type="text"
                    className="input input-bordered join-item w-full"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    disabled={!isEditing}
                  />
                  <button 
                    className="btn join-item"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="btn btn-primary gap-2"
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FaFloppyDisk /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <FaShieldHalved className="text-secondary" />
              Security
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={user.email || ""}
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Change Password</span>
                </label>
                <div className="join">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="input input-bordered join-item w-full"
                  />
                  <button className="btn join-item">Update</button>
                </div>
              </div>

              <div className="divider"></div>

              {/* Danger Zone */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-error">Danger Zone</h3>
                <button
                  className="btn btn-error w-full gap-2"
                  onClick={handleDeleteAccount}
                >
                  <FaTrash /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="card-title">Profile Completion</h2>
              <p className="text-base-content/70">Complete your profile to unlock all features</p>
            </div>
            <div className="radial-progress text-primary" 
              style={{"--value":70} as React.CSSProperties}>
              70%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}