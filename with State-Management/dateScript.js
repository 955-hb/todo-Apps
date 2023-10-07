const dateMEZ = new Date();
// console.log(dateMEZ); 

document.getElementById('time-heading').innerHTML = dateMEZ.toLocaleDateString('de-DE');

