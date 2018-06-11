export const getRandomInteger = (min, max) => {
  let random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
};

// const declension = (number, titles) => {
//   const cases = [2, 0, 1, 1, 1, 2];
//   return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
// };
// console.log(declension(4, [`секунда`, `секунды`, `секунд`]));
// console.log(declension(855, [`ошибка`, `ошибки`, `ошибок`]));
// console.log(declension(77, [`место`, `места`, `мест`]));
