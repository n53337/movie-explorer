export const getMovieDuration = (runtime: number): string => {
  const hours = Math.ceil(runtime / 3600);
  const minutes = Math.floor((runtime % 3600) / 60);
  return `${hours}h ${minutes}min`;
};
