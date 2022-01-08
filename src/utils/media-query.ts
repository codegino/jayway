// We can use different breaking points here
const bp: {[index: string]: number} = {
  sm: 500,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const mq = (n: 'sm' | 'md' | 'lg' | 'xl'): string | number => {
  const bpArray = Object.keys(bp).map(key => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};
