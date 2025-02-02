"use client";

import { useState, ChangeEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { FaUser, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa6";
import { IconType } from "react-icons";
import Swal from "sweetalert2";
import { useMetadata } from "@/hooks/useMetadata";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: IconType;
}

export default function SettingsPage() {
  useMetadata("Account Settings", "Update your account settings here.");
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState<"profile" | "security">("profile");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const changesMade =
      displayName !== user?.displayName ||
      email !== user?.email ||
      (password && newPassword && newPassword === confirmNewPassword);

    if (!changesMade) {
      Swal.fire({
        icon: "warning",
        title: "No Changes Detected",
        text: "Please make some changes to your profile before updating.",
        background: "#fff",
        customClass: {
          container: "font-sans",
          popup: "rounded-2xl shadow-2xl",
          title: "text-xl font-bold",
          htmlContainer: "text-base-content"
        }
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (password && newPassword && newPassword === confirmNewPassword && user) {
        const credentials = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credentials);
      }

      if (displayName !== user?.displayName && user) {
        await updateProfile(user, { displayName });
      }

      if (email !== user?.email && user) {
        await updateEmail(user, email);
      }

      if (password && newPassword && newPassword === confirmNewPassword && user) {
        await updatePassword(user, newPassword);
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your changes have been saved successfully.",
        background: "#fff",
        customClass: {
          container: "font-sans",
          popup: "rounded-2xl shadow-2xl",
          title: "text-xl font-bold",
          htmlContainer: "text-base-content"
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: err.message.includes("auth/requires-recent-login")
            ? "Invalid Current Password"
            : "Error Occurred",
          text: err.message.includes("auth/requires-recent-login")
            ? "The current password you entered is incorrect. Please try again."
            : err.message,
          background: "#fff",
          customClass: {
            container: "font-sans",
            popup: "rounded-2xl shadow-2xl",
            title: "text-xl font-bold",
            htmlContainer: "text-base-content"
          }
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): string => {
    if (newPassword && newPassword !== confirmNewPassword) {
      return "New password and confirmation password do not match.";
    }
    if (newPassword && newPassword.length < 6) {
      return "New password should be at least 6 characters.";
    }
    if (!email.includes("@")) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const InputField = ({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    icon: Icon
  }: InputFieldProps) => (
    <div className="form-control w-full">
      <label htmlFor={id} className="label">
        <span className="label-text text-base font-medium">{label}</span>
      </label>
      <div className="relative group">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="input input-bordered w-full pr-12 bg-base-100
                   transition-all duration-300 focus:outline-none
                   hover:border-primary border-2"
          placeholder={placeholder}
        />
        <Icon className="absolute top-1/2 -translate-y-1/2 right-3 text-lg 
                      text-base-content/50 group-hover:text-primary
                      transition-colors duration-300" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-2xl shadow-xl p-8 space-y-8
                    backdrop-blur-xl backdrop-saturate-150
                    transition-all duration-500 hover:shadow-2xl
                    border border-base-300">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-base-content">Account Settings</h2>
          <p className="text-base-content/60 text-lg">Manage your account preferences</p>
        </div>

        <div role="tablist" className="tabs tabs-box justify-center bg-base-200 p-1 rounded-box">
          <button
            className={`tab tab-lg transition-all duration-300 rounded-lg ${activeSection === "profile" ? "tab-active bg-ghost text-primary" : ""
              }`}
            onClick={() => setActiveSection("profile")}
            type="button"
          >
            Profile
          </button>
          <button
            className={`tab tab-lg transition-all duration-300 rounded-lg ${activeSection === "security" ? "tab-active bg-ghost text-primary" : ""
              }`}
            onClick={() => setActiveSection("security")}
            type="button"
          >
            Security
          </button>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-8">
          {activeSection === "profile" && (
            <div className="space-y-6 animate-fadeIn">
              <InputField
                id="displayName"
                label="Display Name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                icon={FaUser}
              />
              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon={FaEnvelope}
              />
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6 animate-fadeIn">
              <InputField
                id="password"
                label="Current Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter current password"
                icon={FaLock}
              />
              <InputField
                id="newPassword"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                icon={FaLock}
              />
              <InputField
                id="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                icon={FaLock}
              />
            </div>
          )}

          {validateForm() && (
            <div className="alert alert-error rounded-xl shadow-lg">
              <span className="text-sm font-medium">{validateForm()}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || validateForm() !== ""}
            className="btn btn-primary w-full gap-2 font-medium
                     transition-all duration-300 rounded-md
                     hover:shadow-md hover:shadow-primary/20
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}