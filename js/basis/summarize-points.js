const CORRECT_ANSWER_POINTS = 1;
const CORRECT_FAST_ANSWER_POINTS = 2;
const MISTAKE_PENALTY = 2;

export default (playerAnswers) => {

  let points = 0;
  for (const answer of playerAnswers) {
    if (answer.isCorrect) {
      points += answer.isFast ? CORRECT_FAST_ANSWER_POINTS : CORRECT_ANSWER_POINTS;
    } else {
      points -= MISTAKE_PENALTY;
    }
  }

  return points;
};
