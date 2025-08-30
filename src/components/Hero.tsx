import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { useMemo } from "react";

const MotionButton = motion.a;

export default function Hero() {
  const { language } = useAppContext();

  const cvPaths = useMemo(
    () => ({
      es: "../cvs/IgnacioOrcoBarberis_DesarrolladorFullStack_CV.pdf",
      en: "../cvs/IgnacioOrcoBarberis_FullStackDeveloper_CV.pdf",
    }),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 dark:bg-gray-900 px-6 transition-colors duration-500"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Nombre */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight"
        >
          Ignacio Orco Barberis
        </motion.h1>

        {/* Rol */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl text-teal-500 dark:text-teal-400 mb-8 font-semibold"
        >
          {language === "es" ? "Desarrollador Full Stack" : "Full Stack Developer"}
        </motion.h2>

        {/* Botones */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row gap-4 mt-6"
        >
          {/* Botón Proyectos */}
          <MotionButton
            href="#projects"
            className="bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {language === "es" ? "Ver Proyectos" : "View Projects"}
          </MotionButton>

          {/* Botón CV */}
          <MotionButton
            href={language === "es" ? cvPaths.es : cvPaths.en}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-teal-500 text-teal-500 dark:text-teal-400 font-bold py-3 px-8 rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300"
          >
            {language === "es" ? "Descargar CV" : "Download CV"}
          </MotionButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
