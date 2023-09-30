var tiempo = 0;
async function fetching (){
  const res = await fetch("https://bcv-api-vnzw.onrender.com/bcv")
  const data = await res.json()
  console.log("min: " + tiempo + " - " + data)
  tiempo += 1.5;
}
//console.log("min: " + (tiempo/60).toFixed(1) + " - " + data)
fetching();
setInterval(fetching, 90000 );






