const TransferSettings = {
  SERVER_URL: `https://es.dump.academy/guess-melody`,
  APP_ID: 36027798798
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const convertToJSON = (response) => response.json();

export default class GameDataTransfer {
  static loadData() {
    return fetch(`${TransferSettings.SERVER_URL}/questions`).then(checkStatus).then(convertToJSON);
  }

  static uploadStatistics(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${TransferSettings.SERVER_URL}/stats/${TransferSettings.APP_ID}`, requestSettings).then(checkStatus);
  }

  static downloadStatistics() {
    return fetch(`${TransferSettings.SERVER_URL}/stats/${TransferSettings.APP_ID}`).then(checkStatus).then(convertToJSON);
  }
}
