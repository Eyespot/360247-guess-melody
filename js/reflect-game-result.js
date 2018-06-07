export default (statistics, currentResult) => {
  let gameResult = ``;
  if (currentResult.timeLeft === 0) {
    gameResult = `Время вышло! Вы не успели отгадать все мелодии`;

    return gameResult;
  } else if (currentResult.livesLeft < 1) {
    gameResult = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

    return gameResult;
  }

  statistics.push(currentResult);
  statistics.sort(compareStatistics);
  const currentPlaceIndex = statistics.indexOf(currentResult);
  const currentPlace = currentPlaceIndex + 1;
  const competitorsQuantity = statistics.length;
  const beatenPlayers = competitorsQuantity - currentPlace;
  const beatenPercent = Math.floor(beatenPlayers / competitorsQuantity * 100);
  const declensionOfGamers = (competitorsQuantity > 1) ? `игроков` : `игрока`;

  gameResult = `Вы заняли ${currentPlace} место из ${competitorsQuantity} ${declensionOfGamers}. Это лучше, чем у ${beatenPercent}% игроков`;

  return gameResult;
};

const compareStatistics = (a, b) => {
  const pointsA = a.pointsReceived;
  const pointsB = b.pointsReceived;
  const livesA = a.livesLeft;
  const livesB = b.livesLeft;
  const timeA = a.timeLeft;
  const timeB = b.timeLeft;

  let comparison = 0;
  if (pointsA > pointsB) {
    comparison = 1;
  } else if (pointsA < pointsB) {
    comparison = -1;
  } else if (pointsA === pointsB && livesA > livesB) {
    comparison = 1;
  } else if (pointsA === pointsB && livesA < livesB) {
    comparison = -1;
  } else if (pointsA === pointsB && livesA === livesB && timeA > timeB) {
    comparison = 1;
  } else if (pointsA === pointsB && livesA === livesB && timeA <= timeB) {
    comparison = -1;
  }

  return comparison * -1;
};
