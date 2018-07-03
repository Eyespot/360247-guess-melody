export default (statistics, currentResult) => {

  statistics.sort(compareStatistics);

  let currentPlace = 0;

  for (let i = statistics.length - 1; i >= 0; i--) {
    if (statistics[i].pointsReceived === currentResult.pointsReceived && statistics[i].livesLeft === currentResult.livesLeft && statistics[i].timeLeft === currentResult.timeLeft) {
      currentPlace = i + 1;

      break;
    }
  }

  const competitorsQuantity = statistics.length;
  const beatenPercent = Math.floor((competitorsQuantity - currentPlace) / competitorsQuantity * 100);
  const declensionOfGamers = (competitorsQuantity > 1) ? `игроков` : `игрока`;

  return `Вы заняли ${currentPlace} место из ${competitorsQuantity} ${declensionOfGamers}. Это лучше, чем у ${beatenPercent}% игроков`;
};

const compareStatistics = (a, b) => {
  const comparison = a.pointsReceived - b.pointsReceived || a.livesLeft - b.livesLeft || a.timeLeft - b.timeLeft;

  return comparison * -1;
};
