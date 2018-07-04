const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const convertAnswers = (level, answers) => answers.map((answer) => {

  if (level.type === GameType.ARTIST) {
    const artist = answer.title;
    const image = answer.image.url;
    const isCorrect = answer.isCorrect;

    return {artist, image, isCorrect};
  }
  const source = answer.src;
  const genre = answer.genre;

  return {source, genre};
});

export const adaptServerData = (data) => {
  const convertedData = [];
  data.forEach((level, index) => {
    convertedData.push({});
    convertedData[index].gameType = level.type;
    convertedData[index].question = level.question;
    convertedData[index].options = convertAnswers(level, level.answers);

    if (level.type === GameType.ARTIST) {
      convertedData[index].source = level.src;
    } else {
      convertedData[index].correctAnswer = level.genre;
    }
  });
  return convertedData;
};
