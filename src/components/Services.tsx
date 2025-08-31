import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
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

  useEffect(() => {
    const docRef = doc(db, "content", "services");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setServices(snapshot.data().items || []);
      }
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
          {services.map((service, index) => (
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
              <p className="text-gray-600 dark:text-gray-300">
                {language === "es" ? service.description_es : service.description_en}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
