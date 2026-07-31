import { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function SectionReveal({ children, className, delay = 0, y = 60 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
