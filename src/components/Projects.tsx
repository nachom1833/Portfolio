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
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Imagen del proyecto */}
                  <img
                    src={project.img}
                    alt={language === "es" ? project.title_es : project.title_en}
                    className="w-full h-auto object-cover rounded-lg mb-4"
                  />

                  {/* Título y descripción */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === "es" ? project.title_es : project.title_en}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {language === "es" ? project.description_es : project.description_en}
                  </p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="bg-teal-100 text-teal-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Enlaces a GitHub y al sitio web */}
                  <div className="flex space-x-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-teal-600 hover:text-teal-400 dark:text-teal-400 dark:hover:text-teal-300 transition-colors duration-300"
                        aria-label={language === "es" ? "Ver sitio web" : "View website"}
                      >
                        <FiExternalLink className="text-xl" />
                        <span>{language === "es" ? "Ver Sitio" : "View Site"}</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                        aria-label="Ver en GitHub"
                      >
                        <FaGithub className="text-xl" />
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
