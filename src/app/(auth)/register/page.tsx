"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function RegisterPage() {
  useDocumentTitle("Register");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Semua field harus diisi!",
        text: "Pastikan nama, email, dan password telah diisi.",
      });
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password);
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Silakan login untuk melanjutkan.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/login");
      });
    } catch (error: unknown) {
      setLoading(false);

      if ((error as { code: string }).code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Email Sudah Terdaftar",
          text: "Email ini sudah digunakan. Silakan login atau gunakan email lain.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center grid-background p-8 overflow-hidden">
      <div className="card w-full max-w-4xl shadow-xl flex flex-col lg:flex-row transition-all overflow-auto">
        {/* Image Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-6 md:p-8 relative">
          <Image
            src="/background-made-paper-cuts.avif"
            alt="Register Illustration"
            fill
            className="object-cover rounded-tl-md rounded-bl-md"
          />
        </div>

        <div className="w-full glass p-6 sm:p-8 rounded-md lg:rounded-tr-md lg:rounded-br-md lg:rounded-none lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gradient tracking-wide uppercase mb-6">
            Daftar
          </h2>
          <p className="text-sm text-center mb-8">
            Buat akun baru untuk mengakses layanan.
          </p>
          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            {/* Name Input */}
            <div className="form-control">
              <label
                htmlFor="name"
                className="label mb-2 text-sm font-semibold"
              >
                Nama Lengkap
              </label>
              <div className="flex items-center border border-neutral-300 rounded-md">
                <span className="pl-3 pr-2 border-r border-neutral-300">
                  <FaUser className="text-gray-700" />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input bg-transparent border-none focus:outline-none w-full pl-3 focus:shadow-none"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  aria-describedby="name-helper-text"
                />
              </div>
              <p id="name-helper-text" className="text-xs italic mt-1">
                Masukkan nama lengkap Anda.
              </p>
            </div>

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
                  className="input bg-transparent border-none focus:outline-none w-full pl-3 focus:shadow-none"
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
                  className="input bg-transparent border-none focus:outline-none w-full pl-3 focus:shadow-none"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  aria-describedby="password-helper-text"
                />
              </div>
              <p id="password-helper-text" className="text-xs italic mt-1">
                Password harus terdiri dari minimal 8 karakter.
              </p>
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn w-full btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-infinity loading-lg"></span>
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  "Daftar"
                )}
              </button>
            </div>
          </form>
          <p className="text-center text-sm mt-4">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-info">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
