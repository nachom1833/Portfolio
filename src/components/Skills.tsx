import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase/config";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

// Define la interfaz para un item de habilidad
interface SkillItem {
    name: string;
    level: number;
}

// Define la interfaz para la categoría de habilidades
interface SkillCategory {
    category: string;
    items: SkillItem[];
}

export default function Skills() {
    // Obtenemos el idioma del contexto de la aplicación
    const { language } = useAppContext();
    // Estado para las habilidades, inicializado como un array vacío
    const [skills, setSkills] = useState<SkillCategory[]>([]);
    // Estado para la carga de datos
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Estado para manejar errores
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Referencia a la colección 'skills' en Firestore
        const colRef = collection(db, "skills");

        // Usa onSnapshot para escuchar los cambios en tiempo real
        const unsubscribe = onSnapshot(
            colRef,
            (snapshot) => {
                setError(null);
                const loadedSkills: SkillCategory[] = [];

                if (snapshot.docs.length > 0) {
                    // Itera sobre cada documento en la colección
                    snapshot.docs.forEach((doc: DocumentData) => {
                        const categoryName = doc.id;
                        const skillData = doc.data() as { [key: string]: number };

                        // Transforma el objeto de habilidades en un array de SkillItem
                        const skillItems: SkillItem[] = Object.entries(skillData).map(([name, level]) => ({
                            name,
                            level,
                        }));

                        loadedSkills.push({
                            category: categoryName,
                            items: skillItems,
                        });
                    });

                    setSkills(loadedSkills);
                } else {
                    setSkills([]);
                }
                setIsLoading(false);
            },
            (err) => {
                console.error("Error fetching skills: ", err);
                setError("Error al cargar las habilidades. Por favor, inténtalo de nuevo más tarde.");
                setIsLoading(false);
            }
        );

        // Retorna la función de limpieza para desuscribirse
        return () => unsubscribe();
    }, []);

    return (
        <section id="skills" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                    {language === "es" ? "Habilidades" : "Skills"}
                </h2>
                {/* Muestra un mensaje de carga si los datos aún no están listos */}
                {isLoading && (
                    <p className="text-center text-lg text-gray-600 dark:text-gray-400">
                        {language === "es" ? "Cargando habilidades..." : "Loading skills..."}
                    </p>
                )}
                {/* Muestra un mensaje de error si ocurre algún problema */}
                {error && (
                    <p className="text-center text-lg text-red-500">{error}</p>
                )}
                {/* Renderiza las habilidades si no hay error y ya se han cargado */}
                {!isLoading && !error && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skills.length > 0 ? (
                            skills.map((category) => (
                                <motion.div
                                    key={category.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
                                >
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{category.category}</h3>
                                    <ul>
                                        {category.items.map((skill) => (
                                            <li key={skill.name} className="mb-3">
                                                <div className="flex justify-between mb-1 text-gray-700 dark:text-gray-300">
                                                    <span>{skill.name}</span>
                                                    <span>{skill.level}%</span>
                                                </div>
                                                <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded">
                                                    <div
                                                        className="bg-teal-500 h-2 rounded"
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))
                        ) : (
                            // Mensaje cuando no hay habilidades para mostrar
                            <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
                                {language === "es" ? "No hay habilidades para mostrar." : "No skills to display."}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
