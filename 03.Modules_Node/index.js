// Modules = Sekumpulan baris kode yang bisa di pakai ulang kembali , dengan antarmuka yang terdefinisikan

// Node Mudeles = Fungsionalitas yang simple ataupun kompleks yang tersimpan di dalam file javascript , yang dapat kita gunakan kembali pada aplikasi node js / file lain

// const fs = require('fs') // core module

// const getmodul = require('./index') // local module 

// const moment = require('moment') // third party module / npm module / node_modules

// Contoh Mengirim Fungsi
const sayHello = (nama) => {
    console.log(`Nama Saya ${nama}`);
};

//Contoh Mengirim Variabel
const Umur = 23.1

// Contoh Mengirim Object
const data = {
    nama : 'Ujang',
    umur : 23,
    // Menggunkan Notasi ES6 Yang Baru , Seperti Fungis pada umum nya
    cetakNama(){
        return `Nama Saya ${this.nama} Umur ${this.umur}, ` // Mengambil dari Properti yang di atasnya
    }
}

// Contoh Mengirimkan Class
class Orang {
    constructor(){
        console.log("Class Nya Orang Orang sudah di Buat !!!");
    }
}

// Cara Export BEBERAPA MODULE SEKALIGUS 

// Bisa Menuliskan nya SATU SATU 

// module.exports.importFungsi = sayHello;
// module.exports.importVariabel = Umur;
// module.exports.importObject = data;
// module.exports.importClass = Orang;

// ATAU Bisa Menggunkan Semua nya Menjadi Object

module.exports = {
    importFungsi : sayHello,
    importVariabel : Umur,
    importObject : data,
    importClass : Orang,
}

// ATAU BISA MENGGABUNGKAN PROPERTI DAN METHOD MENJADI 1 apabila sama kedua nya !!!

// module = { importClass , importFungsi , importObject , importVariabel ,Orang}
