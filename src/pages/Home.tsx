import { motion } from "framer-motion"; // ✅ diperbaiki
import { ArrowRight, Briefcase, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/profile')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const experiences = [
    {
      title: "Organisasi Kepramukaan",
      company: "SMAK Frateran",
      period: "2023-2025",
      description: "Dewan Ambalan Kepramukaan",
    },
  ];

  return (
    <div className="bg-paper">
      {/* Split Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center p-8 lg:p-24 space-y-12 border-r border-brand/10">
          {/* ... isi kiri */}
        </div>

        <div className="relative bg-brand flex items-center justify-center overflow-hidden">
          {/* ... isi kanan */}
        </div>
      </section> {/* ✅ INI YANG DITAMBAHKAN */}

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content text-4xl font-black uppercase tracking-tighter">
          &nbsp;• BELAJAR • BERKARYA • PRESTASI • INOVASI • BELAJAR • BERKARYA • PRESTASI • DEDIKASI • INOVASI
        </div>
        <div className="marquee-content text-4xl font-black uppercase tracking-tighter">
          &nbsp;• BELAJAR • BERKARYA • PRESTASI • DEDIKASI • INOVASI • BELAJAR • BERKARYA • PRESTASI • DEDIKASI • INOVASI
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        {/* ... */}
      </section>

      {/* Experience Section */}
      <section className="bg-brand text-white py-40">
        {/* ... */}
      </section>

      {/* Footer */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* ... */}
      </section>
    </div>
  );
}
