import { motion } from 'framer-motion';

// Componente para botones con estilos de Tailwind
// Se mueve aquí para simplificar la importación y la estructura
const StyledButton = motion.a;

// Define props for the component
interface ProjectCardProps {
  img: string;
  title: string;
  description: string;
  techs: string[];
  link?: string;
  github?: string;
}

// A card component to display a single project
const ProjectCard = ({ img, title, description, techs, link, github }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
    >
      <img
        src={img}
        alt={`Screenshot of the project ${title}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-6">
          {techs.map((tech, index) => (
            <span key={index} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {link && (
            <StyledButton
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-white font-semibold bg-teal-500 hover:bg-teal-600 transition-colors duration-300 shadow-lg"
            >
              Demo
            </StyledButton>
          )}
          {github && (
            <StyledButton
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-teal-500 font-semibold border-2 border-teal-500 hover:bg-teal-500 hover:text-white transition-colors duration-300"
            >
              GitHub
            </StyledButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;