import { motion, useReducedMotion } from 'motion/react';

const shapes = [
  { className: 'left-[-8%] top-[18%]', width: 560, height: 150, rotate: -12, delay: 0.25, color: 'rgba(65, 227, 208, 0.12)' },
  { className: 'right-[-6%] top-[10%]', width: 440, height: 120, rotate: 18, delay: 0.35, color: 'rgba(216, 196, 156, 0.11)' },
  { className: 'right-[18%] bottom-[12%]', width: 300, height: 84, rotate: -24, delay: 0.45, color: 'rgba(65, 227, 208, 0.08)' },
];

export function HeroGeometricShapes() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, index) => (
        <motion.div
          key={`${shape.className}-${index}`}
          className={`absolute ${shape.className}`}
          initial={reducedMotion ? false : { opacity: 0, y: -70, rotate: shape.rotate - 8 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotate: shape.rotate }}
          transition={{
            duration: 1.35,
            delay: reducedMotion ? 0 : shape.delay,
            ease: [0.23, 0.86, 0.39, 0.96],
          }}
        >
          <motion.div
            className="relative rounded-full border border-white/10"
            animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: shape.width,
              height: shape.height,
              background: `linear-gradient(90deg, ${shape.color}, transparent 72%)`,
              boxShadow: `0 8px 32px ${shape.color}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
