export const getRandomInteger = (min, max) => {
  let random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
};
