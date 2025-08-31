import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export default function SocialLinks() {
  const [links, setLinks] = useState<SocialLinks | null>(null);

  useEffect(() => {
    const docRef = doc(db, "content", "social_links");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setLinks(snapshot.data() as SocialLinks);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!links) return null;

  return (
    <div className="flex justify-center gap-6 py-6">
      {[ 
        { icon: <FaGithub />, url: links.github },
        { icon: <FaLinkedin />, url: links.linkedin },
        { icon: <FaTwitter />, url: links.twitter },
        { icon: <FaEnvelope />, url: `mailto:${links.email}` }
      ].map((item, i) => (
        <motion.a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          className="text-3xl text-gray-700 dark:text-gray-300 hover:text-teal-500 transition"
        >
          {item.icon}
        </motion.a>
      ))}
    </div>
  );
}
