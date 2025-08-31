import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

export default function Hero() {
  const { language } = useAppContext();

  const content = {
    es: {
      greeting: "¡Hola! Soy",
      name: "Ignacio Orco",
      role: "Desarrollador Full Stack",
      subtitle: "Creo soluciones web dinámicas, escalables y optimizadas.",
      cv: "Descargar CV",
      cvFile: "./cvs/IgnacioOrcoBarberis_DesarrolladorFullStack_CV.pdf"
    },
    en: {
      greeting: "Hi! I'm",
      name: "Ignacio Orco",
      role: "Full Stack Developer",
      subtitle: "I build dynamic, scalable, and optimized web solutions.",
      cv: "Download CV",
      cvFile: "./cvs/IgnacioOrcoBarberis_FullStackDeveloper_CV.pdf"
    }
  };

  const lang = language === "es" ? content.es : content.en;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-white dark:from-gray-900 to-gray-100 dark:to-gray-800">
      <motion.h2
        className="text-lg text-gray-600 dark:text-gray-300 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {lang.greeting}
      </motion.h2>

      <motion.h1
        className="text-4xl md:text-6xl font-bold text-teal-600 dark:text-teal-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {lang.name}
      </motion.h1>

      <motion.h3
        className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {lang.role}
      </motion.h3>

      <motion.p
        className="max-w-2xl mt-4 text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {lang.subtitle}
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a
          href={lang.cvFile}
          download
          className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition"
        >
          {lang.cv}
        </a>
      </motion.div>
    </section>
  );
}
