import { motion } from "motion/react";
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

      {/* About Section - Minimal & Typographic */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Profil Saya</span>
              <h2 className="text-5xl font-black text-brand leading-none tracking-tighter">
                Dedikasi dalam <br /> Belajar & <br /> Organisasi.
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-12">
            <p className="text-3xl text-brand/80 leading-tight font-light">
              Sebagai pelajar SMK Frateran, saya memiliki ketertarikan pada bidang teknologi dan kreativitas yang menggunakan keterampilan tangan. Saya berkomitmen untuk terus belajar, mengembangkan kemampuan, serta membangun pengalaman melalui berbagai proyek dan pembelajaran.
            </p>
            <div className="grid grid-cols-1 gap-12 pt-12 border-t border-brand/10">
              <div className="space-y-4">
                <h4 className="text-6xl font-black text-brand">3</h4>
                <p className="text-brand/50 text-sm font-medium uppercase tracking-widest">Tahun di SMA</p>
                <p className="text-brand/70 text-sm leading-relaxed">
                  Menjalani masa SMA dengan penuh semangat dan fokus pada pengembangan karakter serta pengetahuan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Visible Grid Pattern */}
      <section className="bg-brand text-white py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter">
              PERJALANAN <br /> <span className="text-accent">BELAJAR.</span>
            </h2>
            <p className="text-white/50 max-w-xs text-sm uppercase tracking-widest leading-relaxed">
              Membangun fondasi masa depan melalui pendidikan dan pengalaman organisasi.
            </p>
          </div>

          <div className="grid grid-cols-1 border-t border-white/10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group grid grid-cols-1 lg:grid-cols-12 py-12 border-b border-white/10 hover:bg-white/5 transition-colors cursor-default"
              >
                <div className="lg:col-span-2 text-white/30 font-black text-sm mb-4 lg:mb-0">
                  0{index + 1}
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-2xl font-black group-hover:text-accent transition-colors">{exp.title}</h3>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-2">{exp.company}</p>
                </div>
                <div className="lg:col-span-4 text-white/70 font-light leading-relaxed mt-4 lg:mt-0">
                  {exp.description}
                </div>
                <div className="lg:col-span-2 text-right text-white/30 text-xs font-black uppercase tracking-widest mt-4 lg:mt-0">
                  {exp.period}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Contact - Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 lg:p-24 bg-accent text-white flex flex-col justify-between min-h-[400px]">
          <h3 className="text-4xl lg:text-6xl font-black tracking-tighter">MARI <br /> BERKOLABORASI.</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
              <ArrowRight size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Let's work together</span>
          </div>
        </div>
        <div className="p-12 lg:p-24 bg-paper flex flex-col justify-center space-y-12">
          <p className="text-2xl text-brand/80 font-light">
            Saya selalu terbuka untuk belajar hal baru dan berkontribusi dalam berbagai kegiatan positif.
          </p>
          <a
            href="mailto:vincentiussusanto88@gmail.com"
            className="text-4xl lg:text-6xl font-black text-brand hover:text-accent transition-colors break-all tracking-tighter"
          >
            SAY HELLO.
          </a>
        </div>
      </section>
    </div>
  );
}
