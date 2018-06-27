

export const onGenreFormSubmitClick = (data, state) => {
  event.preventDefault();
  const currentLevel = data[state.screen];
  const correctAnswer = currentLevel.correctAnswer;
  let correctAnswersQuantity = 0;
  currentLevel.options.forEach((option) => {
    if (option.genre === correctAnswer) {
      correctAnswersQuantity++;
    }
  });
  const checkValue = (value) => value === correctAnswer;
  const isCorrect = checkedAnswers.every(checkValue) && checkedAnswers.length === correctAnswersQuantity;
  onAnswer(data, state, isCorrect);
};
