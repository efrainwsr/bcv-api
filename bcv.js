const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.bcv.org.ve/';


function obtenerBcv() {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data);
        const usd =  $("#dolar > div > div > div.col-sm-6.col-xs-6.centrado > strong").text();
        const usdTrim = usd.trim();

        let result = usdTrim.replace(",", ".");

        const usdNumber = parseFloat(result).toFixed(2);

        // Devuelve los datos como un objeto
        const data = { usd: usdNumber };
        resolve(data);
        console.log(data)
      })
      .catch(error => {
        console.error(`Error al hacer la solicitud HTTP: ${error.message}`);
        reject(error);
      });
  });
}

module.exports = {
  obtenerBcv,
};


