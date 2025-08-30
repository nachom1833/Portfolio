import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

// Define la interfaz para los datos de la sección "About"
interface AboutContent {
  title: string;
  p1: string;
  p2: string;
  p3: string;
}

export default function About() {
  // Obtiene el idioma actual del contexto de la aplicación
  const { language } = useAppContext();
  // Estado para almacenar el contenido de la sección "About"
  const [content, setContent] = useState<AboutContent | null>(null);
  // Estado para el manejo de errores
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Referencia al documento 'content' dentro de la colección 'about'
    const docRef = doc(db, "about", "content");

    // Usa onSnapshot para escuchar cambios en tiempo real en el documento
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        setError(null); // Reinicia el estado de error
        if (snapshot.exists()) {
          const data = snapshot.data();
          // Usa el operador de coalescencia nula (??) para evitar errores si los campos no existen
          setContent({
            title: data.title[language] ?? data.title.es,
            p1: data.p1[language] ?? data.p1.es,
            p2: data.p2[language] ?? data.p2.es,
            p3: data.p3[language] ?? data.p3.es,
          });
        } else {
          // Manejo si el documento no existe
          setContent(null);
          setError("El documento de 'about' no existe.");
        }
      },
      (err) => {
        // Manejo de errores durante la lectura
        console.error("Error fetching about content: ", err);
        setError("Error al cargar el contenido. Por favor, inténtalo de nuevo más tarde.");
      }
    );

    // Retorna la función de limpieza para desuscribirse del listener
    return () => unsubscribe();
  }, [language]); // Dependencia del idioma para recargar el contenido al cambiar

  // Muestra un mensaje de carga si el contenido aún no está disponible
  if (!content && !error) {
    return (
      <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        {language === "es" ? "Cargando..." : "Loading..."}
      </p>
    );
  }

  // Muestra un mensaje de error si algo sale mal
  if (error) {
    return (
      <p className="text-center text-lg text-red-500">{error}</p>
    );
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
          {content.title}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            {/* Contenedor para la imagen con estilo de avatar */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200 dark:bg-gray-700 shadow-xl overflow-hidden">
              <img
                src="..\imgenes\image1.jpeg"
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
            {/* Renderiza los párrafos basados en los datos cargados */}
            <p className="mb-4">{content.p1}</p>
            <p className="mb-4">{content.p2}</p>
            <p>{content.p3}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
