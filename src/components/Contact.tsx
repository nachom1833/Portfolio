import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const { language } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Obtener texto dinámico desde Firestore
  useEffect(() => {
    const q = query(collection(db, "contact_content"), where("lang", "==", language));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          setContent(snapshot.docs[0].data());
        } else {
          console.error(`No content found for language: ${language}`);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error loading content:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [language]);

  // ✅ Manejar envío del formulario a Firestore
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        timestamp: new Date(),
      });

      setSubmitStatus("success");
       form.reset();
    } catch (error) {
      console.error("Error saving message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="text-center py-20">
        <p className="text-gray-600 dark:text-gray-400">
          {language === "es" ? "Cargando sección..." : "Loading section..."}
        </p>
      </section>
    );
  }

  if (!content) {
    return (
      <section className="text-center py-20">
        <p className="text-red-500">
          {language === "es"
            ? "Error cargando contenido. Verifica Firestore."
            : "Error loading content. Check Firestore."}
        </p>
      </section>
    );
  }

  return (
    <section id="contact" className="max-w-4xl mx-auto py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
      >
        {content.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-lg text-center leading-relaxed max-w-2xl mx-auto mb-10 text-gray-700 dark:text-gray-300"
      >
        {content.subtitle}
      </motion.p>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-lg"
      >
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={content.form.name}
            required
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <input
            type="email"
            name="email"
            placeholder={content.form.email}
            required
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <textarea
            name="message"
            placeholder={content.form.message}
            rows={6}
            required
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        {submitStatus === "success" && (
          <p className="text-center text-green-500 font-semibold">{content.status.success}</p>
        )}
        {submitStatus === "error" && (
          <p className="text-center text-red-500 font-semibold">{content.status.error}</p>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transition-colors duration-300"
        >
          {isSubmitting ? content.form.sending : content.form.send}
        </motion.button>
      </motion.form>

      <div className="flex justify-center space-x-6 mt-10">
        <a
          href="mailto:ignacioorco@gmail.com"
          target="_blank"
          className="text-gray-600 dark:text-gray-300 hover:text-teal-500 transition-colors duration-300"
          aria-label="Correo Electrónico"
        >
          <FaEnvelope className="text-3xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/ignacio-orco-barberis/"
          target="_blank"
          className="text-gray-600 dark:text-gray-300 hover:text-teal-500 transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-3xl" />
        </a>
        <a
          href="https://github.com/nachom1833"
          target="_blank"
          className="text-gray-600 dark:text-gray-300 hover:text-teal-500 transition-colors duration-300"
          aria-label="GitHub"
        >
          <FaGithub className="text-3xl" />
        </a>
      </div>
    </section>
  );
}
