import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

export function useCountUp(target: number, duration = 1.8) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return { ref, value };
}
