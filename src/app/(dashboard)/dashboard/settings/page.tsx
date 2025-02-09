"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser, FaLock } from "react-icons/fa";
import { auth } from "@/lib/firebase";
import ProfileTab from "@/components/ProfileTab";
import SecurityTab from "@/components/SecurityTab";
import { useMetadata } from "@/hooks/useMetadata";

export default function AccountSettingsPage() {
  useMetadata('Settings', '  Settings page for the user dashboard');

  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  // Mengelola navigasi agar tidak dipanggil dalam render
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!user.emailVerified) {
        router.push("/dashboard/settings/verification");
      }
    }
  }, [loading, user, router]);

  // Menampilkan loading sementara user sedang diambil
  if (loading || !user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="mx-4 sm:mx-auto max-w-3xl w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl mb-6 flex justify-center items-center">
              {activeTab === "profile" ? <FaUser className="mr-3" /> : <FaLock className="mr-3" />}
              Account Settings
            </h1>

            {/* Tabs */}
            <div role="tablist" className="tabs tabs-box flex w-full mb-6">
              <button
                role="tab"
                className={`tab flex-1 ${activeTab === "profile" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                role="tab"
                className={`tab flex-1 ${activeTab === "security" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "profile" ? <ProfileTab /> : <SecurityTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
