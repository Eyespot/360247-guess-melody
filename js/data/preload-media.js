// import gameData from "./game-data";

const preloadMedia = (data) => {
  const tracks = new Set();
  const pictures = new Set();

  data.forEach((level) => {
    const options = data[data.indexOf(level)].options;

    options.forEach((option) => {
      if (option.hasOwnProperty(`image`)) {
        pictures.add(option.image);
      } else if (option.hasOwnProperty(`source`)) {
        tracks.add(option.source);
      }
    });
  });

  const preloadCollection = (collection, type) => {
    collection.forEach((item) => {
      const preloadLink = document.createElement(`link`);
      preloadLink.href = item;
      preloadLink.rel = `preload`;
      preloadLink.as = type;
      document.head.appendChild(preloadLink);
    });
  };

  preloadCollection(tracks, `audio`);
  preloadCollection(pictures, `image`);
};

export default preloadMedia;
