const axios = require('axios');
const apiURL = 'https://api.alcambio.app/graphql';

const queryDataFull = {
  operationName: "getCountryConversions",
  variables: {
    "countryCode": "VE"
  },
  query: `
    query getCountryConversions($countryCode: String!) {
      getCountryConversions(payload: {countryCode: $countryCode}) {
        _id
        baseCurrency {
          code
          decimalDigits
          name
          rounding
          symbol
          symbolNative
        }
        country {
          code
          dial_code
          flag
          name
        }
        conversionRates {
          baseValue
          official
          principal
          rateCurrency {
            code
            decimalDigits
            name
            rounding
            symbol
            symbolNative
          }
          rateValue
          type
        }
        dateBcvFees
        dateParalelo
        dateBcv
        createdAt
      }
    }
  `
};


const queryData = {
  operationName: "getCountryConversions",
  variables: {
    "countryCode": "VE"
  },
  query: `
    query getCountryConversions($countryCode: String!) {
      getCountryConversions(payload: {countryCode: $countryCode}) {
        _id
        conversionRates {
          baseValue
        }
        dateBcv
      }
    }
  `
};

const getData = async () => {
	const response = await axios.post(apiURL, queryData);
	const data = response.data.data.getCountryConversions;

    let price = data.conversionRates[1].baseValue;
    let timestamp = data.dateBcv; // Multiplica por 1000 para convertir de segundos a milisegundos
    let date = new Date(timestamp);

    let bcv ={precio: price, fecha: date.toISOString()
      }

	//console.log(bcv)
	return bcv;
}

getData();

module.exports = {
	getData
}