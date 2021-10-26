const fs = require("fs");

// Membuat Folder Data Jika Belum Ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  // Di Cek Dahulu Menggunakak Method existsSync() Apabila Tidak Ada Maka Jalan kan Perintah Ini
  fs.mkdirSync(dirPath);
}

// Membuat File json nya Jika Belum Ada
const dirFile = "./data/dataContact.json";
if (!fs.existsSync(dirFile)) {
  fs.writeFileSync(dirFile, "[]", "utf-8");
}

// MENGAMBIL SEMUA DATA DI FILE JSON
const loadContact = () => {
  const readFile = fs.readFileSync("./data/dataContact.json");

  const changeData = JSON.parse(readFile);

  return changeData;
};

// MENGAMBIL DETAIL CONTACT
const findContact = (nama) => {
  const readDataJson = loadContact();

  const FindData = readDataJson.find(
    (readDataJson) => readDataJson.nama.toLowerCase() === nama.toLowerCase()
  );

  return FindData;
};

// MENULISKAN / MENIMPA FILE CONCTECT.json DENGAN DATA YANG BARU
const saveContact = (data) => {
  fs.writeFileSync("./data/dataContact.json", JSON.stringify(data));
};

// MENAMBAH KAN DATA BARU DI CONTACT
const addDataContact = (dataFrom) => {
  // parameter dataForm => mgambil data form yg d input
  const getData = loadContact(); // mengambil data kontak yg berada di File Json nya
  getData.push(dataFrom); // memasukan data baru yg ke file json nya
  saveContact(getData); // menimpa ulang data baru yg berada di file json nya dan di save
};

// CEK NAMA YANG DUPLIKAT DI DALAM FILE JSON
const CekDuplikat = (nama) => {
  // vrbl nama yg di input
  const readJSON = loadContact(); // data json di ambil semua nya

  return readJSON.find((readJSON) => readJSON.nama === nama); // di cek apakah nama dari prmt sama dengan nama yg ada di dalam JSON nya
};

module.exports = { loadContact, findContact, addDataContact, CekDuplikat };
