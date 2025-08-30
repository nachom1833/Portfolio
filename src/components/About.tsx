import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

// Interfaz para el documento completo (manteniendo objetos para idiomas)
interface AboutContent {
  title: { [key: string]: string };
  p1: { [key: string]: string };
  p2: { [key: string]: string };
  p3: { [key: string]: string };
}

export default function About() {
  const { language } = useAppContext();
  const [content, setContent] = useState<AboutContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const docRef = doc(db, "about", "content");

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as AboutContent;
          setContent(data);
          setError(null);
        } else {
          setContent(null);
          setError("El documento de 'about' no existe.");
        }
      },
      (err) => {
        console.error("Error fetching about content: ", err);
        setError("Error al cargar el contenido. Por favor, inténtalo de nuevo más tarde.");
      }
    );

    return () => unsubscribe();
  }, []);

  if (!content && !error) {
    return (
      <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        {language === "es" ? "Cargando..." : "Loading..."}
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-900 dark:text-white"
        >
          {content?.title[language] ?? ""}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200 dark:bg-gray-700 shadow-xl overflow-hidden">
              <img
                src="/imgenes/image1.jpeg"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            <p className="mb-4">{content?.p1[language]}</p>
            <p className="mb-4">{content?.p2[language]}</p>
            <p className="mb-4">{content?.p3[language]}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
