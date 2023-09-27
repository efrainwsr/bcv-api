const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.bcv.org.ve/';

async function obtenerBcv() {
  try {
    const response = await axios.get(url);
    console.log("obteniendo pagina bcv desde bcv.js scrapper")
    const $ = cheerio.load(response.data);
    const usd = $("#dolar > div > div > div.col-sm-6.col-xs-6.centrado > strong").text();
    const usdTrim = usd.trim();
    let result = usdTrim.replace(",", ".");
    const usdNumber = parseFloat(result).toFixed(2);

    // Devuelve los datos como un objeto
    const data = { usd: usdNumber };
    console.log("datos de bcv desde bcv.js devueltos")
    return data;
  } catch (error) {
    console.error(`Error al hacer la solicitud HTTP: ${error.message}`);
    throw error;
  }
}

module.exports = {
  obtenerBcv,
};
