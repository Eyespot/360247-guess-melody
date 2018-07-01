import Application from "../basis/application";

export default class MediaPreloader {
  constructor(data) {
    this.data = data;
    this.tracks = new Set();
    this.pictures = new Set();
  }

  getCollections() {
    const data = this.data;

    data.forEach((level) => {
      const options = data[data.indexOf(level)].options;

      options.forEach((option) => {
        if (option.hasOwnProperty(`image`)) {
          this.pictures.add(option.image);
        } else if (option.hasOwnProperty(`source`)) {
          this.tracks.add(option.source);
        }
      });
    });
  }

  createPreloadLinks(collection, type) {
    collection.forEach((item) => {
      const preloadLink = document.createElement(`link`);
      preloadLink.href = item;
      preloadLink.rel = `preload`;
      preloadLink.as = type;
      document.head.appendChild(preloadLink);
    });
  }

  static onError(error) {
    Application.showError(error);
  }

  addLoaders() {
    this.getCollections();
    this.createPreloadLinks(this.pictures, `image`);
    this.createPreloadLinks(this.tracks, `audio`);

    const links = this.tracks;
    const loaders = [];

    links.forEach((link) => {
      return loaders.push(new Promise((onSuccess) => {
        const audio = new Audio();
        audio.addEventListener(`canplay`, () => onSuccess(audio));
        audio.onerror = () => {
          MediaPreloader.onError(`Произошла ошибка при загрузке данных`);
        };
        audio.src = link;
      }));
    });

    return loaders;
  }
}
