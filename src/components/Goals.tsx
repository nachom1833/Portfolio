import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

interface Goals {
  short_term_es: string;
  short_term_en: string;
  long_term_es: string;
  long_term_en: string;
}

export default function Goals() {
  const { language } = useAppContext();
  const [goals, setGoals] = useState<Goals | null>(null);

  useEffect(() => {
    const docRef = doc(db, "content", "goals");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setGoals(snapshot.data() as Goals);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!goals) return null;

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">{language === "es" ? "Objetivos" : "Goals"}</h2>
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="font-bold text-lg">{language === "es" ? "Corto Plazo" : "Short Term"}</h3>
            <p>{language === "es" ? goals.short_term_es : goals.short_term_en}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="font-bold text-lg">{language === "es" ? "Largo Plazo" : "Long Term"}</h3>
            <p>{language === "es" ? goals.long_term_es : goals.long_term_en}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
