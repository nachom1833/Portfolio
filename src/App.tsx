import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";
import { motion } from "framer-motion";

// Lazy load de componentes
const Hero = lazy(() => import("./components/Hero"));
const Experience = lazy(() => import("./components/Experience"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Certifications = lazy(() => import("./components/Certifications"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Goals = lazy(() => import("./components/Goals"));
const Contact = lazy(() => import("./components/Contact"));
const SocialLinks = lazy(() => import("./components/SocialLinks"));

function App() {
  return (
    <AppProvider>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
        <Navbar />
        <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>

          {/* Hero Section */}
          <motion.section id="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Hero />
          </motion.section>

          {/* Experience */}
          <motion.section id="experience" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Experience />
          </motion.section> 
          
          {/* About */}
          <motion.section id="about" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <About />
          </motion.section>

          {/* Services */}
          <motion.section id="services" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Services />
          </motion.section>

          {/* Projects */}
          <motion.section id="projects" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Projects />
          </motion.section>

          {/* Skills */}
          <motion.section id="skills" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Skills />
          </motion.section>

          {/* Certifications */}
          <motion.section id="certifications" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Certifications />
          </motion.section>

          {/* Testimonials */}
          <motion.section id="testimonials" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Testimonials />
          </motion.section>

          {/* Goals */}
          <motion.section id="goals" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Goals />
          </motion.section>

          {/* Contact */}
          <motion.section id="contact" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Contact />
            <SocialLinks />
          </motion.section>

        </Suspense>
      </div>
    </AppProvider>
  );
}

export default App;
