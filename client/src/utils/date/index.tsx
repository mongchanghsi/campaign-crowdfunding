export const getDaysLeft = (timestamp: number) => {
  const currentDate = new Date();

  if (+currentDate >= timestamp * 1_000) return 0;
  const remainingSeconds = timestamp * 1_000 - +currentDate;
  return Math.floor(remainingSeconds / (1_000 * 60 * 60 * 24));
};
