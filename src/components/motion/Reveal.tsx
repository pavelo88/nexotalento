import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Entrada cuando el bloque alcanza el centro visual de la pantalla.
 * El margen inferior negativo evita disparar el efecto apenas asoma por abajo.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, y = 18 }) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -45% 0px' }}
      transition={{ duration: 0.48, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
};
