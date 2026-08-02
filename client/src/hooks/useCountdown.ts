import { useEffect, useState } from 'react';

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
};

function getParts(target: number): CountdownParts {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isOver: false,
  };
}

export function useCountdown(targetDate: string): CountdownParts {
  const target = new Date(targetDate).getTime();
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const interval = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  return parts;
}
