import camelcaseKeys from 'camelcase-keys';

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

export const API_KEY = import.meta.env.VITE_API_KEY;
