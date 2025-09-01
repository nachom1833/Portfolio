import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore"; // Importa 'collection'
import { useAppContext } from "../context/AppContext";

interface Service {
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  icon: string;
}

export default function Services() {
  const { language } = useAppContext();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apunta a la colección 'services'
    const colRef = collection(db, "services");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      // Mapea los documentos de la colección
      const loadedServices: Service[] = snapshot.docs.map((doc) => {
        return doc.data() as Service;
      });
      setServices(loadedServices);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
          {language === "es" ? "Servicios" : "Services"}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="col-span-3 text-gray-600 dark:text-gray-400">
              Cargando servicios...
            </p>
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {language === "es" ? service.title_es : service.title_en}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === "es"
                    ? service.description_es
                    : service.description_en}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="col-span-3 text-gray-600 dark:text-gray-400">
              No hay servicios disponibles.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}