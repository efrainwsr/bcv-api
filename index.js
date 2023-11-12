 const express = require('express'); 
 const app = express(); 
 const cors = require('cors'); 
 const axios = require('axios');
 const {getData} = require ('./alcambio.js');
//const { obtenerBcv } = require('./bcv'); 
 var precioBcv = 0;
 var bcv = null;
 var menuConPrecioBs;
 var fecha;

 const port = process.env.PORT || 3000; 
 app.use(cors()); 

 async function calcularPreciosEnBs() { 
   try { 
     menuConPrecioBs = menu.map((item) => ({ 
       ...item, 
       precioBs: parseFloat((item.precio * bcv.precio).toFixed(2)), 
     })); 
   } catch (error) { 
     console.error('Error al calcular los precios en Bs:', error); 
   } 
 }

 const actualizarDatos = async() =>{
  bcv = await getData();
  precioBcv = bcv.precio;
  fecha = bcv.fecha;
 }


//**************** INICIAR SERVIDOR *********************
 app.listen(port, async () => { 
   console.log(`Servidor Express escuchando en el puerto ${port}`); 
   await actualizarDatos()
   await calcularPreciosEnBs();
 }); 


 setInterval(async function () { 
    await actualizarDatos()
    await calcularPreciosEnBs(); 
  }, 180000);



//***************** ENDPOINTS *************************
 app.get('/bcv', async (req, res) => { 
   try { 
    //let bcv = await getData();
    res.json(bcv);
  }catch (error) { 
   res.status(500).json({ error: 'Error al obtener los datos del BCV' }); 
 } 
});


 app.get('/menu', async (req, res) => {
   res.json(menuConPrecioBs); 
 }); 



 var menu = [ 
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
 nombre: "Refresco", 
 size: "Peq.", 
 precio:1.6, 
 cat: 5, 
 id:10, 
 cant:0 
},
/* 
{ 
 desc: "2L", 
 nombre: "Coca-Cola", 
 size: "Gran.", 
 precio:2.6, 
 cat: 5, 
 id:11, 
 cant:0 
}, */
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
 desc: "400 ml", 
 nombre: "Refresco", 
 size: "Peq.", 
 precio:0.55, 
 cat: 5, 
 id:13, 
 cant:0 
}, 
]; 




 // Datos del menú almacenados en una variable en memoria 