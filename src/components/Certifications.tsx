import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

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

  useEffect(() => {
    const colRef = collection(db, "certifications");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const loadedCertifications: Certification[] = snapshot.docs.map((doc) => {
        return doc.data() as Certification;
      });
      setCertifications(loadedCertifications);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
          {language === "es" ? "Certificaciones" : "Certifications"}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="col-span-full text-gray-600 dark:text-gray-400">
              Cargando certificaciones...
            </p>
          ) : certifications.length > 0 ? (
            certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative" // Contenedor para la imagen
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition relative z-10">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {cert.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cert.year}
                  </p>
                </div>
                
                {cert.imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer" // El cursor está siempre sobre este div
                  >
                    <img
                      src={cert.imageUrl}
                      alt={`Certificado de ${cert.name}`}
                      className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
                    />
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-gray-600 dark:text-gray-400">
              No hay certificaciones disponibles.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}