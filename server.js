import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'portfolio.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    bio TEXT,
    email TEXT,
    linkedin TEXT,
    github TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    technologies TEXT,
    link TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    skills TEXT
  );
`);

// Insert sample data if empty
const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get();
if (profileCount.count === 0) {
  db.prepare('INSERT INTO profile (name, bio, email, linkedin, github) VALUES (?, ?, ?, ?, ?)').run(
    'Vincentius Susanto',
    'Full-stack developer passionate about creating innovative web applications.',
    'vincentiussusanto88@gmail.com',
    'https://linkedin.com/in/vincentius',
    'https://github.com/vincentius'
  );
}

const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
if (projectsCount.count === 0) {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with React and Vite',
      technologies: 'React, TypeScript, Tailwind CSS',
      link: 'https://github.com/vincentius/portfolio',
      image: '/images/portfolio.jpg'
    },
    {
      title: 'E-commerce App',
      description: 'Full-stack e-commerce application',
      technologies: 'Node.js, Express, SQLite',
      link: 'https://github.com/vincentius/ecommerce',
      image: '/images/ecommerce.jpg'
    }
  ];

  const insertProject = db.prepare('INSERT INTO projects (title, description, technologies, link, image) VALUES (?, ?, ?, ?, ?)');
  projects.forEach(project => insertProject.run(project.title, project.description, project.technologies, project.link, project.image));
}

const skillsCount = db.prepare('SELECT COUNT(*) as count FROM skills').get();
if (skillsCount.count === 0) {
  const skills = [
    { category: 'Frontend', skills: 'React, Vue.js, HTML, CSS, JavaScript' },
    { category: 'Backend', skills: 'Node.js, Express, Python, SQL' },
    { category: 'Tools', skills: 'Git, Docker, AWS, Vercel' }
  ];

  const insertSkill = db.prepare('INSERT INTO skills (category, skills) VALUES (?, ?)');
  skills.forEach(skill => insertSkill.run(skill.category, skill.skills));
}

// API Routes
app.get('/api/profile', (req, res) => {
  const profile = db.prepare('SELECT * FROM profile LIMIT 1').get();
  res.json(profile);
});

app.get('/api/projects', (req, res) => {
  const projects = db.prepare('SELECT * FROM projects').all();
  res.json(projects);
});

app.get('/api/skills', (req, res) => {
  const skills = db.prepare('SELECT * FROM skills').all();
  res.json(skills);
});

// Serve static files from dist in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});