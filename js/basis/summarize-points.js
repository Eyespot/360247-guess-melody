const CORRECT_ANSWER_POINTS = 1;
const CORRECT_FAST_ANSWER_POINTS = 2;
const MISTAKE_PENALTY = 2;

export default (state) => {

  let points = 0;
  for (const answer of state.answers) {
    if (answer.isCorrect) {
      points += answer.isFast ? CORRECT_FAST_ANSWER_POINTS : CORRECT_ANSWER_POINTS;
      if (answer.isFast) {
        state.outcome.quickPointsReceived++;
      }
    } else {
      points -= MISTAKE_PENALTY;
    }
  }

  return points;
};
