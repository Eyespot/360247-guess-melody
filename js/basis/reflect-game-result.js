export default (statistics, currentResult) => {

  statistics.sort(compareStatistics);

  let currentPlace = 0;
  statistics.forEach((result) => {
    if (result.pointsReceived === currentResult.pointsReceived && result.livesLeft === currentResult.livesLeft && result.timeLeft === currentResult.timeLeft) {
      currentPlace = statistics.indexOf(result) + 1;
    }
  });
  const competitorsQuantity = statistics.length;
  const beatenPercent = Math.floor((competitorsQuantity - currentPlace) / competitorsQuantity * 100);
  const declensionOfGamers = (competitorsQuantity > 1) ? `игроков` : `игрока`;

  return `Вы заняли ${currentPlace} место из ${competitorsQuantity} ${declensionOfGamers}. Это лучше, чем у ${beatenPercent}% игроков`;
};

const compareStatistics = (a, b) => {
  const comparison = a.pointsReceived - b.pointsReceived || a.livesLeft - b.livesLeft || a.timeLeft - b.timeLeft;

  return comparison * -1;
};
