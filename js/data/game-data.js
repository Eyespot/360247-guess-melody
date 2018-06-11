export default [
  {
    gameType: `artist`,
    question: `Кто исполняет эту песню?`,
    source: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    options: [
      {
        artist: `Kevin MacLeod`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        isCorrect: false
      },
      {
        artist: `Jingle Punks`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        isCorrect: true
      },
      {
        artist: `Audionautix`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        isCorrect: false
      }
    ]
  },
  {
    gameType: `artist`,
    question: `Кто исполняет эту песню?`,
    source: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    options: [
      {
        artist: `Riot`,
        image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
        isCorrect: true
      },
      {
        artist: `Jingle Punks`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        isCorrect: false
      },
      {
        artist: `Gunnar Olsen`,
        image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
        isCorrect: false
      }
    ]
  },
  {
    gameType: `genre`,
    question: `Выберите кантри треки`,
    correctAnswer: `Country`,
    options: [
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
        genre: `Electronic`
      },
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        genre: `R&B`
      }
    ]
  },
  {
    gameType: `genre`,
    question: `Выберите рок треки`,
    correctAnswer: `Rock`,
    options: [
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
        genre: `Pop`
      },
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        source: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      }
    ]
  }
];
