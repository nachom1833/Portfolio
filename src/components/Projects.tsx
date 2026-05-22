import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

// Define la interfaz para los datos del proyecto
interface ProjectItem {
  id: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  img: string;
  link?: string;
  github?: string;
  techs: string[];
}

export default function Projects() {
  const { language } = useAppContext();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const colRef = collection(db, "projects");
    const q = query(colRef, orderBy("order", "asc")); 

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: ProjectItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProjectItem, "id">),
        }));
        setProjects(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error al obtener los proyectos:", err);
        setError("Error al cargar los proyectos. Por favor, inténtalo de nuevo.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);



  // Limpia el listener cuando el componente se desmonte

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Título de la sección */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          {language === "es" ? "Proyectos" : "Projects"}
        </h2>

        {isLoading && (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            {language === "es" ? "Cargando proyectos..." : "Loading projects..."}
          </p>
        )}

        {error && (
          <p className="text-center text-lg text-red-500">{error}</p>
        )}

        {/* Grid de proyectos */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Contenedor Técnico (Terminal / IDE) para la Imagen del Proyecto */}
                  <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden rounded-lg mb-6 bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex flex-col">
                    {/* Barra superior estilo Terminal */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-200/10 dark:border-slate-800/80 text-[10px] sm:text-xs font-mono text-slate-400 select-none">
                      <div className="flex items-center space-x-2">
                        <span className="text-teal-400 font-bold">&gt;_</span>
                        <span className="text-slate-300 tracking-tight">
                          {(language === "es" ? project.title_es : project.title_en).toLowerCase().replace(/\s+/g, '-')}.sh
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${project.link ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'} `} />
                        <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                          {project.link ? (language === "es" ? "Desplegado" : "Deployed") : "GitHub"}
                        </span>
                      </div>
                    </div>
                    {/* Contenedor de Imagen con Fondo de Rejilla de Ingeniería */}
                    <div 
                      className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-slate-50/5 dark:bg-slate-950"
                      style={{ 
                        backgroundImage: 'radial-gradient(rgba(20, 184, 166, 0.08) 1.5px, transparent 1.5px)', 
                        backgroundSize: '16px 16px' 
                      }}
                    >
                      <img
                        src={project.img}
                        alt={language === "es" ? project.title_es : project.title_en}
                        className={`w-full h-full ${
                          project.img.includes('logo') || project.img.includes('@')
                            ? 'object-contain p-8'
                            : 'object-cover object-top'
                        } group-hover:scale-105 transition-transform duration-500 ease-out`}
                        loading="lazy"
                      />
                      {/* Sutil overlay de degradado para profundidad */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Título y descripción */}
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-500 transition-colors duration-300">
                      {language === "es" ? project.title_es : project.title_en}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                      {language === "es" ? project.description_es : project.description_en}
                    </p>

                    {/* Tecnologías */}
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto pt-4">
                      {project.techs.map((tech) => (
                        <span
                          key={tech}
                          className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-teal-900/40 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enlaces a GitHub y al sitio web */}
                  <div className="flex space-x-4 border-t border-gray-100 dark:border-gray-700/30 pt-4 mt-auto">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-teal-600 hover:text-teal-400 dark:text-teal-400 dark:hover:text-teal-300 font-semibold text-sm transition-colors duration-300"
                        aria-label={language === "es" ? "Ver sitio web" : "View website"}
                      >
                        <FiExternalLink className="text-lg" />
                        <span>{language === "es" ? "Ver Sitio" : "View Site"}</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-semibold text-sm transition-colors duration-300"
                        aria-label="Ver en GitHub"
                      >
                        <FaGithub className="text-lg" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-lg col-span-2 text-gray-600 dark:text-gray-400">
                {language === "es" ? "No hay proyectos para mostrar." : "No projects to display."}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
