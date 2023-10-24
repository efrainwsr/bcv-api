const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
var serviceAccount = require("./service-account.json");
var admin = require("firebase-admin");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

const getData = async ()  =>{
const menuRef = db.collection('menu').doc('hamburguesas');
const hamurguesas = await menuRef.get();
console.log(hamurguesas.data())
  

  /*const snapshot = await menuRef.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });*/
}

getData();

