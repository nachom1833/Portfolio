import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
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

  useEffect(() => {
    const docRef = doc(db, "content", "testimonials");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setTestimonials(snapshot.data().items || []);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">{language === "es" ? "Testimonios" : "Testimonials"}</h2>
        <div className="space-y-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <p className="text-lg italic text-gray-700 dark:text-gray-300">
                “{language === "es" ? t.comment_es : t.comment_en}”
              </p>
              <p className="mt-4 font-semibold">{t.name} - {t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
