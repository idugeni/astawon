"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { validateInputs } from "@/utils/validate";
import Swal from "sweetalert2";
import { useMetadata } from "@/hooks/useMetadata";

export default function LoginPage() {
  useMetadata("Login", "Login page for the admin panel");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateInputs(email, password)) return;

    setLoading(true);

    try {
      await loginUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Selamat Datang Kembali! 🎉",
        text: "Login berhasil! Mohon tunggu, Anda akan diarahkan ke dashboard dalam beberapa saat.",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => router.push("/dashboard"),
      });
    } catch {
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Login Gagal 😞",
        text: "Email atau password yang Anda masukkan salah. Silakan coba lagi.",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 grid-background overflow-hidden">
      <div className="card glass w-full max-w-4xl shadow-xl flex flex-col lg:flex-row transition-all overflow-auto">
        <div className="w-full lg:w-1/2 p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gradient tracking-wide uppercase mb-6">
            Masuk
          </h2>
          <p className="text-sm text-center mb-8">
            Masukkan email dan password Anda untuk melanjutkan.
          </p>
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* Email Input */}
            <div className="form-control">
              <label
                htmlFor="email"
                className="label mb-2 text-sm font-semibold"
              >
                Email
              </label>
              <div className="flex items-center border border-neutral-300 rounded-md">
                <span className="pl-3 pr-2 border-r border-neutral-300">
                  <FaEnvelope className="text-gray-700" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input bg-transparent border-none focus:outline-none focus:shadow-none w-full pl-3"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  aria-describedby="email-helper-text"
                />
              </div>
              <p id="email-helper-text" className="text-xs italic mt-1">
                Masukkan email yang valid untuk melanjutkan.
              </p>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label
                htmlFor="password"
                className="label mb-2 text-sm font-semibold"
              >
                Password
              </label>
              <div className="flex items-center border border-neutral-300 rounded-md">
                <span className="pl-3 pr-2 border-r border-neutral-300">
                  <FaLock className="text-gray-700" />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input bg-transparent border-none focus:outline-none focus:shadow-none w-full pl-3"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  aria-describedby="password-helper-text"
                />
              </div>
              <p id="password-helper-text" className="text-xs italic mt-1">
                Password harus terdiri dari minimal 8 karakter.
              </p>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <Link
                href="#"
                className={`btn w-full btn-primary ${loading ? 'pointer-events-none' : ''}`}
                onClick={(e) => e.preventDefault()}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-infinity loading-lg text-primary">Loading...</span>
                  </div>
                ) : (
                  "Masuk"
                )}
              </Link>
            </div>
          </form>
          <p className="text-center text-sm mt-4">
            Belum punya akun?{" "}
            <Link href="/register" className="text-info">
              Daftar
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-6 md:p-8 relative">
          <Image
            src="/sculpture-woman-with-word-i-love-it.jpg"
            alt="Login Illustration"
            fill
            className="object-cover rounded-tr-md rounded-br-md"
          />
        </div>
      </div>
    </div>
  );
}
