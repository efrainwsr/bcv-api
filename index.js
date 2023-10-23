 const express = require('express'); 
 const app = express(); 
 const cors = require('cors'); 
 const axios = require('axios')
//const { obtenerBcv } = require('./bcv'); 
 var precioBcv = 0; 
 var menuConPrecioBs;


async function obtenerBcv() {
 const response = await axios.get("https://exchange.vcoud.com/coins/latest")
 return response.data[61].price;
 }

 //console.log(obtenerBcv())


 
 

/*
 const apiUrl = "https://api.alcambio.app/graphql/"

 const graphqlQuery = `
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
      __typename
    }
    country {
      code
      dial_code
      flag
      name
      __typename
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
        __typename
      }
      rateValue
      type
      __typename
    }
    dateBcvFees
    dateParalelo
    dateBcv
    createdAt
    __typename
  }
}
`;

const variables = {
  countryCode: 'VE',
};

axios.post(apiUrl, {
    query: graphqlQuery,
    variables,
  })
  .then((response) => {

   console.log(rates)
  })
  .catch((error) => {
    console.error('Error:', error);
  });*/

  

 
  
 var menu = [ 
   { 
    desc: "Combo 1", 
    nombre: "Perro", 
    size: "", 
    precio: 5, 
    cat: 6, 
    id: 14, 
    cant:0 
   }, 
   { 
     desc: "Sencillo", 
     nombre: "Perro", 
     size: "Peq.", 
     precio:1,
     cat: 1, 
     id:1, 
     cant:0 
   }, 
   { 
     desc: "Especial", 
     nombre: "Perro", 
     size: "Peq.", 
     precio:1.8, 
     cat: 1, 
     id:2, 
     cant:0 
   }, 
   { 
     desc: "Sencilla", 
     nombre: "Hamburguesa", 
     size: "", 
     precio:3, 
     cat: 2, 
     id:3, 
     cant:0 
   }, 
   { 
     desc: "Especial", 
     nombre: "Hamburguesa", 
     size: "", 
     precio:4.8, 
     cat: 2, 
     id:4, 
     cant:0 
   }, 
   { 
     desc: "Sencilla", 
     nombre: "Empanada", 
     size: "", 
     precio:1, 
     cat: 3, 
     id:5, 
     cant:0 
   }, 
   { 
     desc: "Especial", 
     nombre: "Empanada", 
     size: "", 
     precio:2, 
     cat: 3, 
     id:6, 
     cant:0 
   }, 
   { 
     desc: "", 
     nombre: "Parri-Papa", 
     size: "", 
     precio:5, 
     cat: 4, 
     id:7, 
     cant:0 
   }, 
   { 
     desc: "", 
     nombre: "Enrrollado", 
     size: "", 
     precio:5, 
     cat: 4, 
     id:8, 
     cant:0 
   }, 
   { 
     desc: "", 
     nombre: "Pepito", 
     size: "", 
     precio:5, 
     cat: 4, 
     id:9, 
     cant:0 
   }, 
   { 
     desc: "1L", 
     nombre: "Coca-Cola", 
     size: "Peq.", 
     precio:1.6, 
     cat: 5, 
     id:10, 
     cant:0 
   }, 
   { 
     desc: "2L", 
     nombre: "Coca-Cola", 
     size: "Gran.", 
     precio:2.6, 
     cat: 5, 
     id:11, 
     cant:0 
   }, 
   { 
     desc: "1L", 
     nombre: "Sun", 
     size: "Peq.", 
     precio:1, 
     cat: 5, 
     id:12, 
     cant:0 
   }, 
   { 
     desc: "Botella", 
     nombre: "Refresco", 
     size: "Peq.", 
     precio:0.75, 
     cat: 5, 
     id:13, 
     cant:0 
   }, 
 ]; 
  

  
 setInterval(async function () { 
     precioBcv = await obtenerBcv(); 
     calcularPreciosEnBs(); 
     console.log(precioBcv)
 }, 60000);
  
 const port = process.env.PORT || 3000; 
 app.use(cors()); 
 app.listen(port, async () => { 
   console.log(`Servidor Express escuchando en el puerto ${port}`); 
   precioBcv = await obtenerBcv();
   calcularPreciosEnBs();
   setInterval(async function () { 
    precioBcv = await obtenerBcv(); 
    calcularPreciosEnBs(); 
}, 180000);
 }); 
  
 async function calcularPreciosEnBs() { 
   try { 
     //precioBcv = await obtenerBcv();
     menuConPrecioBs = menu.map((item) => ({ 
       ...item, 
       precioBs: parseFloat((item.precio * precioBcv).toFixed(2)), 
     })); 
     //console.log('Precios en Bs calculados con éxito.'); 
   } catch (error) { 
     console.error('Error al calcular los precios en Bs:', error); 
   } 
 } 
  
  
 app.get('/bcv', async (req, res) => { 
   try { 
     //precioBcv = await obtenerBcv(); 
     //calcularPreciosEnBs(); 
     //res.json(precioBcv.usd);
    //precioBcv = await obtenerBcv();
    res.json(precioBcv);
   } catch (error) { 
     res.status(500).json({ error: 'Error al obtener los datos del BCV' }); 
   } 
 });
  
  
   app.get('/menu', async (req, res) => {
     //await calcularPreciosEnBs();
     res.json(menuConPrecioBs); 
   }); 
  
  
  

  
  
  
  
 // Datos del menú almacenados en una variable en memoria 