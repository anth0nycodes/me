import { useEffect, useState, type RefObject } from "react";

export function useOnScreen(ref: RefObject<Element | null>, threshold = 0.5) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}
