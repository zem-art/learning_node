const fs = require("fs");

// Membuat Folder Data Jika Belum Ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  // Di Cek Dahulu Menggunakak Method existsSync() Apabila Tidak Ada Maka Jalan kan Perintah Ini
  fs.mkdirSync(dirPath);
}
// Membuat File json nya Jika Belum Ada
const dirFile = "./data/context.json";
if (!fs.existsSync(dirFile)) {
  fs.writeFileSync(dirFile, "[]", "utf-8");
}

// Mengambil Semua Data JSON
const loadContact = () => {
  const readFile = fs.readFileSync("./data/context.json");

  const changeData = JSON.parse(readFile);

  return changeData;
};

const findContact = (nama) => {
  const readDataJson = loadContact();

  const FindData = readDataJson.find(
    (readDataJson) => readDataJson.nama.toLowerCase() === nama.toLowerCase()
  );

  return FindData;
};

module.exports = { loadContact, findContact };
