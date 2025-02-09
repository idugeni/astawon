"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import { FaEnvelope, FaCheckCircle, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { auth } from "@/lib/firebase";
import { useMetadata } from '@/hooks/useMetadata';

export default function VerificationPage() {
  useMetadata('Verification', 'Verification page for the user dashboard');

  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Mengelola navigasi secara aman setelah komponen dirender
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.emailVerified) {
        router.push("/dashboard/settings");
      }
    }
  }, [loading, user, router]);

  // Menampilkan loading saat state auth sedang diproses
  if (loading || !user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const handleResendVerification = async () => {
    if (countdown > 0) return;

    setResending(true);
    try {
      await sendEmailVerification(user);
      setCountdown(60);

      // Mulai countdown setelah email dikirim
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      Swal.fire({
        icon: "success",
        title: "Verification Email Sent",
        text: "Please check your inbox and spam folder.",
      });
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text: error.message,
      });
    } finally {
      setResending(false);
    }
  };

  const checkVerification = async () => {
    try {
      await user.reload();
      if (user.emailVerified) {
        Swal.fire({
          icon: "success",
          title: "Email Verified!",
          text: "Redirecting to settings...",
        });
        router.push("/dashboard/settings");
      } else {
        Swal.fire({
          icon: "error",
          title: "Not Verified",
          text: "Please check your email and click the verification link.",
        });
      }
    } catch (error) {
      console.error("Error checking email verification:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to check verification status.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body items-center text-center">
          <FaEnvelope className="text-6xl text-primary mb-4" />
          <h1 className="card-title text-2xl mb-2">Verify Your Email</h1>
          <p className="mb-6">
            We've sent a verification email to <strong>{user.email}</strong>.
            Please check your inbox and verify your email to continue.
          </p>

          <div className="space-y-4 w-full">
            <button className="btn btn-primary w-full" onClick={checkVerification}>
              <FaCheckCircle className="mr-2" />
              I've Verified My Email
            </button>

            <button
              className="btn btn-outline w-full"
              onClick={handleResendVerification}
              disabled={resending || countdown > 0}
            >
              {resending ? <FaSpinner className="animate-spin mr-2" /> : null}
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend Verification Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
