import camelcaseKeys from 'camelcase-keys';
import { useEffect, useRef, useState } from 'react';

export const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const getResponse = async (link: string) => {
  const response = await fetch(link);
  const result = await response.json();

  return camelcaseKeys(result, { deep: true });
};

export const useIsVisible = (ref: React.RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    ref.current && observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};
