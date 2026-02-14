import { motion as Motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimatedSection({ children, delay = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </Motion.div>
  );
}
