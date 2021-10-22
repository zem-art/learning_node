const getModule = require('./index.js') // MEMBUAT Inisialisasi untuk menampung Module nya 

console.log('DATA ==> ',getModule); // Apabila module nya di kirim banyak maka Bentuk nya object

console.log(getModule.importFungsi('Ujang')); // Data Fungsi

console.log(getModule.importVariabel); // Data Variabel

console.log(getModule.importObject.cetakNama()); // Data Object

console.log(new getModule.importClass());