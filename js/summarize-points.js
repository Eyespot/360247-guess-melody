const DEFEAT_RESULT = -1;
const MINIMAL_ANSWERS_QUANTITY = 10;
const CORRECT_ANSWER_POINTS = 1;
const CORRECT_FAST_ANSWER_POINTS = 2;
const MISTAKE_PENALTY = 2;

export default (playerAnswers, playerLivesLeft) => {
  if (playerAnswers.length < MINIMAL_ANSWERS_QUANTITY) {

    return DEFEAT_RESULT;
  }

  let points = 0;
  for (const answer of playerAnswers) {
    if (answer.isCorrect) {
      points += answer.isFast ? CORRECT_FAST_ANSWER_POINTS : CORRECT_ANSWER_POINTS;
    } else {
      points -= MISTAKE_PENALTY;
      playerLivesLeft--;
    }
    if (playerLivesLeft < 1) {
      return DEFEAT_RESULT;
    }
  }

  return points;
};
