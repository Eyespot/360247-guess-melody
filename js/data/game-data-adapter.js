const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const convertAnswers = (level, answers) => answers.map((answer) => {

  if (level.type === GameType.ARTIST) {
    const artist = answer.title;
    const image = answer.image.url.split(`?`)[0];
    const isCorrect = answer.isCorrect;

    return {artist, image, isCorrect};
  } else {
    const source = answer.src;
    const genre = answer.genre;

    return {source, genre};
  }
});

export const adaptServerData = (data) => {
  const newData = [];
  data.forEach((level, index) => {
    newData.push({});
    newData[index].gameType = level.type;
    newData[index].question = level.question;
    newData[index].options = convertAnswers(level, level.answers);

    if (level.type === GameType.ARTIST) {
      newData[index].source = level.src;
    } else {
      newData[index].correctAnswer = level.genre;
    }
  });
  return newData;
};
