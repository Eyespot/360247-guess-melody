export default (statistics, currentResult) => {

  const compareStatistics = (a, b) => {
    return a.pointsReceived - b.pointsReceived || a.livesLeft - b.livesLeft || a.timeLeft - b.timeLeft;
  };

  statistics.sort(compareStatistics);

  const findSimilar = (index) => {
    return index.pointsReceived === currentResult.pointsReceived && index.livesLeft === currentResult.livesLeft && index.timeLeft === currentResult.timeLeft;
  };

  const currentPlace = statistics.length - statistics.findIndex(findSimilar);
  const competitorsQuantity = statistics.length;
  const beatenPercent = Math.floor((competitorsQuantity - currentPlace) / competitorsQuantity * 100);
  const declensionOfGamers = (competitorsQuantity > 1) ? `игроков` : `игрока`;

  return `Вы заняли ${currentPlace} место из ${competitorsQuantity} ${declensionOfGamers}. Это лучше, чем у ${beatenPercent}% игроков`;
};
