import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

interface ExperienceItem {
  id: string;
  title_es: string;
  title_en: string;
  company: string;
  period: string;
  description_es: string;
  description_en: string;
}

export default function Experience() {
  const { language } = useAppContext();
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const colRef = collection(db, "experiences");

    // Construye la consulta para ordenar por título descendente
    const q = query(colRef, orderBy("company", "desc"));

    // Ahora, onSnapshot escuchará los resultados ordenados
    const unsubscribe = onSnapshot(
      q, // <-- Usa la nueva consulta aquí
      (snapshot) => {
        const data: ExperienceItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ExperienceItem, "id">),
        }));
        setExperiences(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  return (
    <section id="experience" className="max-w-5xl mx-auto p-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
      >
        {language === "es" ? "Experiencia" : "Experience"}
      </motion.h2>

      {isLoading && (
        <p className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {language === "es" ? "Cargando..." : "Loading..."}
        </p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="relative border-l border-gray-300 dark:border-gray-600 pl-6 md:-left-[25px]">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="mb-8 relative"
              >
                 {/* Círculo de la línea de tiempo. */}
                  <div className="absolute w-4 h-4 bg-teal-400 rounded-full -left-[35px] md:-left-[20px] top-2 border-2 border-white dark:border-gray-900"></div>
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "es" ? exp.title_es : exp.title_en}
                </h3>
                <p className="text-lg text-teal-500">{exp.company}</p>
                <p className="text-md text-gray-600 dark:text-gray-400">{exp.period}</p>
                <p className="mt-2 text-gray-800 dark:text-gray-300">
                  {language === "es" ? exp.description_es : exp.description_en}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300">
              {language === "es"
                ? "No hay experiencia disponible."
                : "No experience available."}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
