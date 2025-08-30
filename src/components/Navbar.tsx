import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import {/* SunIcon, MoonIcon, */GlobeAltIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const {/* theme, toggleTheme, */language, setLanguage } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const links = [
    { href: "#about", label: language === "es" ? "Sobre mí" : "About" },
    { href: "#experience", label: language === "es" ? "Experiencia" : "Experience" },
    { href: "#projects", label: language === "es" ? "Proyectos" : "Projects" },
    { href: "#skills", label: language === "es" ? "Habilidades" : "Skills" },
    { href: "#contact", label: language === "es" ? "Contacto" : "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          Ignacio<span className="text-gray-800 dark:text-gray-200">Dev</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-200 font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Buttons (Theme + Language) */}
        <div className="flex items-center space-x-4">
          {/* Language Switch */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleLanguage}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-teal-500 dark:hover:bg-teal-500 hover:text-white transition-colors duration-300"
            title={language === "es" ? "Cambiar a Inglés" : "Switch to Spanish"}
          >
            <GlobeAltIcon className="w-5 h-5" />
          </motion.button>

          {/* Theme Switch */}
          {/* <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-teal-500 dark:hover:bg-teal-500 hover:text-white transition-colors duration-300"
            title={theme === "light" ? "Activar modo oscuro" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </motion.button> */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4 shadow-md"
        >
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
