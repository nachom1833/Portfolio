import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore"; // Importa 'collection'
import { useAppContext } from "../context/AppContext";

interface Testimonial {
  name: string;
  role: string;
  comment_es: string;
  comment_en: string;
}

export default function Testimonials() {
  const { language } = useAppContext();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apunta a la colección 'testimonials'
    const colRef = collection(db, "testimonials");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      // Mapea los documentos de la colección
      const loadedTestimonials: Testimonial[] = snapshot.docs.map((doc) => {
        return doc.data() as Testimonial;
      });
      setTestimonials(loadedTestimonials);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">
          {language === "es" ? "Testimonios" : "Testimonials"}
        </h2>
        <div className="space-y-8">
          {isLoading ? (
            <p className="text-gray-600 dark:text-gray-400">
              Cargando testimonios...
            </p>
          ) : testimonials.length > 0 ? (
            testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <p className="text-lg italic text-gray-800 dark:text-gray-300">
                  {language === "es" ? `"${t.comment_es}"` : `"${t.comment_en}"`}
                </p>
                <p className="mt-4 font-bold text-gray-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.role}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No hay testimonios disponibles.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}