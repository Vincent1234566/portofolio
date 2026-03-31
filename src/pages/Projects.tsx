import { motion } from "motion/react";
import { Mail, Layers, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Projects() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/api/skills').then(res => res.json()),
      fetch('http://localhost:3001/api/projects').then(res => res.json()),
      fetch('http://localhost:3001/api/profile').then(res => res.json())
    ])
      .then(([skillsData, projectsData, profileData]) => {
        const transformedSkills = skillsData.flatMap(category => 
          category.skills.split(', ').map(skill => ({
            name: skill,
            level: 85,
            category: category.category
          }))
        );
        setSkills(transformedSkills);
        setProjects(projectsData);
        setProfile(profileData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-paper min-h-screen">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 border-b border-brand/10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Keahlian & Kompetensi</span>
            <h1 className="text-7xl lg:text-[112px] font-black leading-[0.88] tracking-[-0.04em] text-brand">
              KEAHLIAN <br /> <span className="text-accent">SAYA.</span>
            </h1>
          </div>
          <p className="text-brand/50 max-w-xs text-sm uppercase tracking-widest leading-relaxed">
            Kumpulan kompetensi yang saya kembangkan selama masa sekolah dan organisasi.
          </p>
        </div>
      </section>

      {/* Skills Grid - Brutalist Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand/10 border border-brand/10">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-paper p-12 space-y-12 hover:bg-brand hover:text-white transition-all duration-500 group cursor-default relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <span className="text-4xl font-black opacity-10 group-hover:opacity-20 transition-opacity">0{index + 1}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent group-hover:text-white transition-colors">{skill.category}</span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-3xl font-black tracking-tighter leading-none">{skill.name}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-grow h-px bg-brand/10 group-hover:bg-white/20 transition-colors"></div>
                  <span className="text-xs font-black tracking-widest">{skill.level}%</span>
                </div>
              </div>

              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 relative z-10">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  Mastery Level <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-brand/10">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Proyek & Pengalaman</span>
            <h2 className="text-5xl font-black tracking-tighter text-brand">PROYEK <span className="text-accent">SAYA.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper border border-brand/10 p-8 space-y-6 hover:border-accent transition-colors"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tighter">{project.title}</h3>
                  <p className="text-brand/60 text-sm">{project.description}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(', ').map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-brand/5 text-brand text-xs font-bold uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="inline-flex items-center gap-2 text-accent hover:text-brand transition-colors text-sm font-bold">
                    View Project <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Unique Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 border-t border-brand/10">
        <div className="flex flex-col lg:flex-row gap-24">
          <div className="lg:w-1/3">
            <h2 className="text-5xl font-black tracking-tighter text-brand leading-none">
              PRINSIP & <br /> <span className="text-accent">NILAI.</span>
            </h2>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h4 className="text-xl font-black tracking-tighter">Integritas</h4>
              <p className="text-brand/60 text-sm leading-relaxed">
                Selalu mengutamakan kejujuran dan tanggung jawab dalam setiap tugas yang diberikan, baik di sekolah maupun organisasi.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-black tracking-tighter">Kolaborasi</h4>
              <p className="text-brand/60 text-sm leading-relaxed">
                Percaya bahwa hasil terbaik dicapai melalui kerjasama tim yang solid dan komunikasi yang terbuka.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-black tracking-tighter">Disiplin</h4>
              <p className="text-brand/60 text-sm leading-relaxed">
                Menghargai waktu dan komitmen untuk mencapai target yang telah ditetapkan dengan konsisten.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-black tracking-tighter">Adaptabilitas</h4>
              <p className="text-brand/60 text-sm leading-relaxed">
                Siap belajar hal baru dan menyesuaikan diri dengan cepat di lingkungan yang dinamis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-t border-brand/10">
        <div className="p-12 lg:p-24 bg-brand text-white flex flex-col justify-between min-h-[400px]">
          <h3 className="text-4xl lg:text-6xl font-black tracking-tighter">PUNYA <br /> PERTANYAAN?</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Get in touch via email</span>
          </div>
        </div>
        <div className="p-12 lg:p-24 bg-accent flex flex-col justify-center space-y-12 text-white">
          <p className="text-2xl font-light">
            Saya selalu terbuka untuk belajar hal baru dan berkontribusi dalam berbagai kegiatan positif.
          </p>
          <a
            href={`mailto:${profile?.email || 'vincentiussusanto88@gmail.com'}`}
            className="text-4xl lg:text-6xl font-black hover:text-brand transition-colors break-all tracking-tighter"
          >
            HUBUNGI SAYA.
          </a>
        </div>
      </section>
    </div>
  );
}



