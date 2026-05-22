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
      className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
    >
      {/* Contenedor Técnico (Terminal / IDE) para la Imagen */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-lg mb-6 bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex flex-col">
        {/* Barra superior estilo Terminal */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-200/10 dark:border-slate-800/80 text-[10px] sm:text-xs font-mono text-slate-400 select-none">
          <div className="flex items-center space-x-2">
            <span className="text-teal-400 font-bold">&gt;_</span>
            <span className="text-slate-300 tracking-tight">
              {title.toLowerCase().replace(/\s+/g, '-')}.sh
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${link ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'} `} />
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
              {link ? "Deployed" : "GitHub"}
            </span>
          </div>
        </div>
        {/* Contenedor de Imagen con Fondo de Rejilla de Ingeniería */}
        <div 
          className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-slate-50/5 dark:bg-slate-950"
          style={{ 
            backgroundImage: 'radial-gradient(rgba(20, 184, 166, 0.08) 1.5px, transparent 1.5px)', 
            backgroundSize: '16px 16px' 
          }}
        >
          <img
            src={img}
            alt={`Screenshot of the project ${title}`}
            className={`w-full h-full ${
              img.includes('logo') || img.includes('@')
                ? 'object-contain p-8'
                : 'object-cover object-top'
            } group-hover:scale-105 transition-transform duration-500 ease-out`}
            loading="lazy"
          />
          {/* Sutil overlay de degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors duration-300">{title}</h3>
        <p className="text-sm mb-4 text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-6 mt-auto pt-4">
          {techs.map((tech, index) => (
            <span key={index} className="bg-gray-100 dark:bg-gray-700/50 border border-gray-200/30 dark:border-gray-700/30 rounded-full px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 border-t border-gray-100 dark:border-gray-700/30 pt-4 mt-auto">
          {link && (
            <StyledButton
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-white font-semibold bg-teal-500 hover:bg-teal-600 transition-colors duration-300 shadow-lg text-sm"
            >
              Demo
            </StyledButton>
          )}
          {github && (
            <StyledButton
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-teal-500 font-semibold border-2 border-teal-500 hover:bg-teal-500 hover:text-white transition-colors duration-300 text-sm"
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