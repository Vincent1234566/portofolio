import { motion } from "framer-motion"; // ✅ FIXED
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
      company: "SMK Frateran",
      period: "2023-2025",
      description: "Dewan Ambalan Kepramukaan",
    },
  ];

  return (
    <div className="bg-paper">
      {/* Split Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center p-8 lg:p-24 space-y-12 border-r border-brand/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Pelajar 
            </span>
            <h1 className="text-7xl lg:text-[112px] font-black leading-[0.88] tracking-[-0.04em] text-brand">
              {(profile?.name || 'Vincentius Gonzales').split(' ')[0]} <br /> <span className="text-accent">{(profile?.name || 'Vincentius Gonzales').split(' ')[1]}.</span>
            </h1>
            <p className="text-xl text-brand/60 font-light max-w-md leading-relaxed">
              {profile?.bio || 'Seorang siswa yang bersemangat dalam kegiatan akademik dan non-akademik di sekolah. Berkomitmen untuk terus berprestasi.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-8"
          >
            <Link to="/projects" className="cta-circle">
              Keahlian
            </Link>
            <div className="rail-text text-brand/30">
              Scroll to explore profile
            </div>
          </motion.div>
        </div>

        <div className="relative bg-brand flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src="https://picsum.photos/seed/student1/1920/1080"
              alt="Vincentius"
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
              <User className="text-white" size={48} />
            </div>
            <span className="text-white/50 text-xs font-black uppercase tracking-[0.3em]">
              Based in Indonesia
            </span>
          </div>

          {/* Bubble 'Ketua Kelas' dihapus sesuai permintaan user */}
        </div>
      </section>

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content text-4xl font-black uppercase tracking-tighter">
          &nbsp;• BELAJAR • BERKARYA •  PRESTASI •  INOVASI • BELAJAR • BERKARYA •  PRESTASI • DEDIKASI • INOVASI
        </div>
        <div className="marquee-content text-4xl font-black uppercase tracking-tighter">
          &nbsp;• BELAJAR • BERKARYA •  PRESTASI • DEDIKASI • INOVASI • BELAJAR • BERKARYA •  PRESTASI • DEDIKASI • INOVASI
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        {/* isi tetap */}
      </section>

      {/* Experience Section */}
      <section className="bg-brand text-white py-40">
        {/* isi tetap */}
      </section>

      {/* Footer */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* isi tetap */}
      </section>
    </div>
  );
}
