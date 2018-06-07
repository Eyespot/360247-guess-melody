export default (playerAnswers, playerLivesLeft) => {
  if (playerAnswers.length < 10) {

    return -1;
  }

  let points = 0;
  for (const answer of playerAnswers) {
    if (answer.isCorrect) {
      points += answer.isFast ? 2 : 1;
    } else {
      points -= 2;
      playerLivesLeft--;
    }
    if (playerLivesLeft < 1) {
      return -1;
    }
  }

  return points;
};
