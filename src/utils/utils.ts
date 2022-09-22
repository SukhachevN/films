import { PayloadAction } from '@reduxjs/toolkit';
import camelcaseKeys from 'camelcase-keys';
import { useEffect, useState } from 'react';
import { ShorFilmInfo, StoredFilms, IStoredFilmsState } from './interfaces';

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

  if (!response.ok) throw new Error(result.status_message);

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

export const handleStoredFilm = (
  state: IStoredFilmsState,
  action: PayloadAction<ShorFilmInfo>
) => {
  const { id, ...rest } = action.payload;
  if (state.films[id]) {
    delete state.films[id];
  } else {
    state.films[id] = { id, ...rest };
  }
};

export const setStoredFilmsState = (
  state: IStoredFilmsState,
  action: PayloadAction<StoredFilms>
) => {
  state.films = action.payload;
};
