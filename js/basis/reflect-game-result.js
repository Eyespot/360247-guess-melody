export default (statistics, currentResult) => {

  statistics.push(currentResult);
  statistics.sort(compareStatistics);
  const currentPlace = statistics.indexOf(currentResult) + 1;
  const competitorsQuantity = statistics.length;
  const beatenPercent = Math.floor((competitorsQuantity - currentPlace) / competitorsQuantity * 100);
  const declensionOfGamers = (competitorsQuantity > 1) ? `игроков` : `игрока`;

  return `Вы заняли ${currentPlace} место из ${competitorsQuantity} ${declensionOfGamers}. Это лучше, чем у ${beatenPercent}% игроков`;
};

const compareStatistics = (a, b) => {
  const comparison = a.pointsReceived - b.pointsReceived || a.livesLeft - b.livesLeft || a.timeLeft - b.timeLeft;

  return comparison * -1;
};
