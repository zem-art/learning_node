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
    // Cari Namanya Seteleh Ketemu Tampilkan Data nya
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

// DELETE CONTACT
const deleteContact = (nama) => {
  const readData = loadContact(); // data yang ada di dalam file JSON nya

  const filterContact = readData.filter((contact) => contact.nama !== nama);
  // Telusuri Semua Data Di dalam File Json Yg Tidak Sama Seperti Data di dalam Param nama

  saveContact(filterContact); // Data Baru Yang Di Save Di Dalam File Json nya
};

// UPDATE CONTACT
const updateContact = (ContactBaruForm) => {
  const readJSON = loadContact(); // Ambil Semua Data nya

  // HILANGKAN DATA CONTACT LAMA YANG NAMAN NYA SAMA DENGAN OLD NAME
  const filterContact = readJSON.filter(
    // Filter DATA JSON NYA
    (dataContact) => dataContact.nama !== ContactBaruForm.oldName
  );
  delete ContactBaruForm.oldName; // delete properti oldName Yang ada di object ContactBaru

  filterContact.push(ContactBaruForm); // PUSH DATA NYA CONTACT KE JSON NYA

  saveContact(filterContact); // Simpan Perubahan nya

  // DEBUG
  // console.log("CONTACK FILTER==> ", filterContact);
  // console.log("CONTACT BARU==> ", ContactBaruForm);
};

module.exports = {
  loadContact,
  findContact,
  addDataContact,
  CekDuplikat,
  deleteContact,
  updateContact,
};
