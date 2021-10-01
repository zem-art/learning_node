console.log('Hello Belajar Node Pemula');

const iniModul = (nama) => {
    return `Hallo nama saya ${nama}`;
}

const PI = 3.14;

// MENGEKSPORT SEMUA MODUL YANG BERADA DI ATAS NYA 
module.exports.exPortsinModul = iniModul;
module.exports.exPortPI = PI;