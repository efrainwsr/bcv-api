const express = require('express');
const app = express();
const cors = require('cors');
const { obtenerBcv } = require('./bcv');
var precioBcv = 0;
var menuConPrecioBs;


var menu = [
  {
   desc: "Combo 1",
   nombre: "Perro",
   size: "",
   precio: 5,
   cat: 6,
   id: 14,
  },
  {
    desc: "Sencillo",
    nombre: "Perro",
    size: "Peq.",
    precio:1,
    cat: 1,
    id:1
  },
  {
    desc: "Especial",
    nombre: "Perro",
    size: "Peq.",
    precio:1.8,
    cat: 1,
    id:2
  },
  {
    desc: "Sencilla",
    nombre: "Hamburguesa",
    size: "",
    precio:3,
    cat: 2,
    id:3
  },
  {
    desc: "Especial",
    nombre: "Hamburguesa",
    size: "",
    precio:4.8,
    cat: 2,
    id:4
  },
  {
    desc: "Sencilla",
    nombre: "Empanada",
    size: "",
    precio:1,
    cat: 3,
    id:5
  },
  {
    desc: "Especial",
    nombre: "Empanada",
    size: "",
    precio:2,
    cat: 3,
    id:6
  },
  {
    desc: "",
    nombre: "Parri-Papa",
    size: "",
    precio:5,
    cat: 4,
    id:7
  },
  {
    desc: "",
    nombre: "Enrrollado",
    size: "",
    precio:5,
    cat: 4,
    id:8
  },
  {
    desc: "",
    nombre: "Pepito",
    size: "",
    precio:5,
    cat: 4,
    id:9
  },
  {
    desc: "1L",
    nombre: "Coca-Cola",
    size: "Peq.",
    precio:1.6,
    cat: 5,
    id:10
  },
  {
    desc: "2L",
    nombre: "Coca-Cola",
    size: "Gran.",
    precio:2.6,
    cat: 5,
    id:11
  },
  {
    desc: "1L",
    nombre: "Sun",
    size: "Peq.",
    precio:1,
    cat: 5,
    id:12
  },
  {
    desc: "Botella",
    nombre: "Refresco",
    size: "Peq.",
    precio:0.75,
    cat: 5,
    id:13
  },
];



//const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

/*
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});*/

//const db = getFirestore();

/*
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqwU7Klz9JgWv0-xD2uU9rl_eqRTkgw3Q",
  authDomain: "menu-45f18.firebaseapp.com",
  projectId: "menu-45f18",
  storageBucket: "menu-45f18.appspot.com",
  messagingSenderId: "851505743604",
  appId: "1:851505743604:web:6e80dfe439ce4d9db0c0a1"
};*/





setInterval(async function () {
    precioBcv = await obtenerBcv();
    calcularPreciosEnBs();
}, 300000);

const port = process.env.PORT || 3000;
app.use(cors());
app.listen(port, async () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
  precioBcv = await obtenerBcv();
  calcularPreciosEnBs();
});

async function calcularPreciosEnBs() {
  try {
    
    menuConPrecioBs = menu.map((item) => ({
      ...item,
      precioBs: parseFloat((item.precio * precioBcv.usd).toFixed(2)),
    }));
    console.log('Precios en Bs calculados con éxito.');
  } catch (error) {
    console.error('Error al calcular los precios en Bs:', error);
  }
}


app.get('/bcv', async (req, res) => {
  try {
    //precioBcv = await obtenerBcv();
    //calcularPreciosEnBs();
    res.json(precioBcv.usd);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del BCV' });
  }
});


  app.get('/menu', async (req, res) => {
    res.json(menuConPrecioBs);
  });




// Ruta para obtener los datos del BCV

/*
app.get('/menu', async (req, res) => {
  try {
  
    const menu = db.collection('menu');

    // Obtiene todos los documentos en la colección
    const snapshot = await menu.get();

    const datos = [];
    snapshot.forEach((doc) => {
      datos.push(doc.data());
    });

    console.log('Datos obtenidos de Firestore:', datos);
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener los datos desde Firestore:', error);
    res.status(500).json({ error: 'Error al obtener los datos desde Firestore' });
  }
});
*/




// Datos del menú almacenados en una variable en memoria


