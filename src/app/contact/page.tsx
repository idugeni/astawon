// src/app/contact/page.tsx

"use client";

import React from "react";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useMetadata } from "@/hooks/useMetadata";

export default function ContactPage() {
  useMetadata("Contact", "Contact page for ASTAWON platform");
  return (
      <div className="min-h-screen bg-base-100 p-8 sm:p-16 transition-all duration-700 ease-in-out">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center mb-6 pb-2 bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
            Contact
          </h1>

          <p className="leading-relaxed text-center mb-8">
            Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih
            lanjut mengenai platform ASTAWON, jangan ragu untuk menghubungi
            kami. Kami siap membantu Anda!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-200 p-6 shadow-xl text-center">
              <div className="flex justify-center items-center bg-blue-500 text-white p-6 rounded-full mb-4 hover:bg-blue-700 transition-all duration-300 ease-in-out w-16 h-16 mx-auto">
                <FaEnvelope className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <div className="divider"></div>
              <p className="mb-4 text-sm">
                Kami akan segera merespon email Anda.
              </p>
              <Link href="mailto:rutanwsb@gmail.com" className="text-blue-600">
                rutanwsb@gmail.com
              </Link>
            </div>

            <div className="card bg-base-200 p-6 shadow-xl text-center">
              <div className="flex justify-center items-center bg-green-500 text-white p-6 rounded-full mb-4 hover:bg-green-700 transition-all duration-300 ease-in-out w-16 h-16 mx-auto">
                <FaPhone className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Telepon</h3>
              <div className="divider"></div>
              <p className="mb-4 text-sm">Hubungi kami di nomor berikut.</p>
              <span>(0286) 321030</span>
            </div>

            <div className="card bg-base-200 p-6 shadow-xl text-center">
              <div className="flex justify-center items-center bg-red-500 text-white p-6 rounded-full mb-4 hover:bg-red-700 transition-all duration-300 ease-in-out w-16 h-16 mx-auto">
                <FaLocationDot className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Alamat</h3>
              <div className="divider"></div>
              <p className="mb-4 text-sm">
                Jl. Pramuka No.1, Sumberan Barat, Wonosobo Bar., Kec. Wonosobo,
                Kabupaten Wonosobo, Jawa Tengah 56311
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Temukan Kami
            </h3>
            <div className="w-full h-[450px] overflow-hidden rounded-lg bg-neutral-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.9426023177657!2d109.90178739999999!3d-7.360331200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa056029da10b%3A0x1ae278eb49746082!2sRutan%20Klas%20IIB%20Wonosobo!5e0!3m2!1sid!2sid!4v1737970235214!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
  );
}
