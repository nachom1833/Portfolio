import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

interface Certification {
  name: string;
  institution: string;
  year: number;
}

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    const docRef = doc(db, "content", "certifications");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setCertifications(snapshot.data().items || []);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Certificaciones</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold">{cert.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{cert.institution}</p>
              <span className="text-teal-500 font-bold">{cert.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
