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
    const links = [];
    collection.forEach((item) => {
      const preloadLink = document.createElement(`link`);
      preloadLink.href = item;
      preloadLink.rel = `preload`;
      preloadLink.as = type;
      document.head.appendChild(preloadLink);
      links.push(preloadLink);
    });
  }

  appendPreloadLinks() {
    this.getCollections();
    this.createPreloadLinks(this.tracks, `audio`);
    this.createPreloadLinks(this.pictures, `image`);
  }

  // addLoaders() {
  //   this.getCollections();
  //   // this.appendPreloadLinks();
  //   const links = this.tracks;
  //   const loaders = [];
  //
  //   links.forEach((link) => {
  //     return loaders.push(new Promise((onSuccess, onError) => {
  //       const audio = new Audio();
  //       audio.addEventListener(`canplaythrough`, () => onSuccess(audio));
  //       audio.onerror = () => {
  //         onError(`Произошла ошибка при загрузке данных. Пожалуйста, перезагрузите страницу.`);
  //       };
  //       audio.src = link;
  //     }));
  //   });
  //
  //   // this.createPreloadLinks(this.tracks, `audio`);
  //   this.createPreloadLinks(this.pictures, `image`);
  //
  //   return loaders;
  // }
}
