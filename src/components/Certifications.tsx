import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";
import { FiAward, FiEye, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Certification {
  name: string;
  institution: string;
  year: number;
  imageUrl?: string; 
}

export default function Certifications() {
  const { language } = useAppContext();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);

  useEffect(() => {
    const colRef = collection(db, "certifications");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const loadedCertifications: Certification[] = snapshot.docs.map((doc) => {
        return doc.data() as Certification;
      });
      // Ordenamos las certificaciones por año de forma descendente por defecto
      loadedCertifications.sort((a, b) => b.year - a.year);
      setCertifications(loadedCertifications);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showNext = useCallback(() => {
    if (activeCertIndex === null || certifications.length === 0) return;
    setActiveCertIndex((prev) => (prev !== null && prev < certifications.length - 1 ? prev + 1 : 0));
  }, [activeCertIndex, certifications.length]);

  const showPrev = useCallback(() => {
    if (activeCertIndex === null || certifications.length === 0) return;
    setActiveCertIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : certifications.length - 1));
  }, [activeCertIndex, certifications.length]);

  // Manejo de teclado para cerrar o navegar por el modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCertIndex === null) return;
      
      if (e.key === "Escape") {
        setActiveCertIndex(null);
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertIndex, showNext, showPrev]);

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título de la sección */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {language === "es" ? "Certificaciones" : "Certifications"}
        </h2>

        {/* Grid de Certificaciones */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="col-span-full text-center text-lg text-gray-600 dark:text-gray-400">
              {language === "es" ? "Cargando certificaciones..." : "Loading certifications..."}
            </p>
          ) : certifications.length > 0 ? (
            certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => cert.imageUrl && setActiveCertIndex(index)}
                className={`group flex flex-col h-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700/50 ${
                  cert.imageUrl ? "cursor-pointer" : ""
                }`}
              >
                {/* Icono de Distintivo / Certificación */}
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 border border-teal-100 dark:border-teal-800/40 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  <FiAward className="text-2xl" />
                </div>

                {/* Textos Informativos */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-teal-500 transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {cert.institution}
                  </p>
                </div>

                {/* Fila inferior con el año y botón interactivo */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/30">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                    {cert.year}
                  </span>
                  {cert.imageUrl && (
                    <span className="flex items-center space-x-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                      <FiEye className="text-base" />
                      <span>{language === "es" ? "Ver Certificado" : "View Certificate"}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-600 dark:text-gray-400">
              {language === "es" ? "No hay certificaciones disponibles." : "No certifications available."}
            </p>
          )}
        </div>
      </div>

      {/* Lightbox / Modal Interactivo para Visualizar Certificados */}
      <AnimatePresence>
        {activeCertIndex !== null && certifications[activeCertIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 md:p-6"
            onClick={() => setActiveCertIndex(null)}
          >
            {/* Botón de Cierre en la parte superior derecha */}
            <button
              onClick={() => setActiveCertIndex(null)}
              className="absolute top-6 right-6 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-all duration-300 border border-white/10 hover:scale-105"
              aria-label="Cerrar modal"
            >
              <FiX size={20} />
            </button>

            {/* Flecha de Navegación Izquierda (Anterior) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 md:left-8 z-55 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-all duration-300 border border-white/10 hover:scale-105"
              aria-label="Certificación anterior"
            >
              <FiChevronLeft size={24} />
            </button>

            {/* Contenedor del Certificado en Alta Definición */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic en el certificado
              className="relative max-w-4xl max-h-[75vh] md:max-h-[80vh] flex flex-col items-center select-none"
            >
              {certifications[activeCertIndex].imageUrl && (
                <img
                  src={certifications[activeCertIndex].imageUrl}
                  alt={`Certificado de ${certifications[activeCertIndex].name}`}
                  className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />
              )}

              {/* Pie del Modal con Metadatos del Certificado */}
              <div className="mt-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 tracking-tight px-4">
                  {certifications[activeCertIndex].name}
                </h3>
                <p className="text-teal-400 text-sm md:text-base font-semibold">
                  {certifications[activeCertIndex].institution} <span className="text-white/40 mx-2">•</span> {certifications[activeCertIndex].year}
                </p>
              </div>
            </motion.div>

            {/* Flecha de Navegación Derecha (Siguiente) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 md:right-8 z-55 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-all duration-300 border border-white/10 hover:scale-105"
              aria-label="Siguiente certificación"
            >
              <FiChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}