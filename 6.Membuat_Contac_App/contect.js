const fs = require("fs");
const chalk = require("chalk");
var validator = require("validator");
const readline = require("readline");

// // sudah tidak terpakai karna sudah memakai yargs
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

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

// // CARA PENULISAN YANG 1
// const question = () => {
//     return new Promise((resolve , reject ) => { // resolve = apabila Promise nya Full Fields Dan Reject = Apabila Promise nya Gagal
//         rl.question('Masukan Email Anda : ' , (email) => {
//             resolve(email)
//         })
//     })
// }

// // CARA PENULISAN YANG KE 2 // // Apabila Ada yargs maka fungsi readline nya tidak terpakai
// const WriteQuestion = (Quest) => {
//   return new Promise((resolve, reject) => {
//     // resolve = apabila Promise nya Full Fields Dan Reject = Apabila Promise nya Gagal
//     rl.question(Quest, (nama) => {
//       resolve(nama);
//     });
//   });
// };

const loadContact = () => {
  // // Fungsi Untuk Membaca File JSON nya
  const readFile = fs.readFileSync("./data/context.json");

  const changeData = JSON.parse(readFile);

  return changeData;
};

const SaveData = (nama, email, NoHp) => {
  const data = { nama, email, NoHp };
  // const readFile = fs.readFileSync("./data/context.json");
  // const changeData = JSON.parse(readFile);

  const readDataJson = loadContact(); // Memisahkan Fungsi Data Json Dan Mengubah Nya Menjadi Fungis Yang bisa di Pakai Terus Menerus

  // // CEK NAMA DUPLIKAT
  // // Cek Apakah Ada Nama Duplikat Di dalam Contact
  const duplikatName = readDataJson.find((data) => data.nama === nama); // data.nama => data yang ada di dalam file
  if (duplikatName) {
    console.log(
      chalk.blue.inverse.bold("Contact Sudah Terdaftar Gunakan Nama Lain !")
    );

    return false;
  }

  // // CEK EMAIL VALID
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.blue.inverse.bold("Email Tidak Validc !"));
      return false;
    }
  }

  // // CEK NO HP
  if (!validator.isMobilePhone(NoHp, "id-ID")) {
    console.log(chalk.blue.inverse.bold("No Phone Tidak Valid !"));
    return false;
  }

  readDataJson.push(data);

  fs.writeFileSync("./data/context.json", JSON.stringify(readDataJson));

  console.log(
    chalk.green.inverse.bold("Terimakasih Sudah Memasukan Data Nya ^_^ ")
  );

  //   rl.close(); // sudah tidak di gunakan karna sudah menggunakan yargs
};

const listContact = () => {
  const readDataJson = loadContact();

  console.log(chalk.blue.inverse.bold("Daftar Contact Anda :"));

  readDataJson.forEach((data, i) => {
    // Data Nya Di For Menggunakan ForEach Dan Di simpan Di parameter data dan id nya di i
    console.log(`${i + 1} . ${data.nama} - ${data.NoHp}`);
  });
};

const detailContact = (nama) => {
  const readDataJson = loadContact();

  const FindData = readDataJson.find(
    (readDataJson) => readDataJson.nama.toLowerCase() === nama.toLowerCase() // Mencari Nama Di dalam var dataJson
  ); // toLowerCase => itu tidak mempentingkan huruf kecil dan besar di dalam penulisan nya

  if (!FindData) {
    // Apabila Tidak Di temukan Datanya
    console.log(chalk.red.inverse.bold(`${nama} , Tidak Ditemukan !!`));
    return false;
  }

  console.log(chalk.blue.inverse.bold("Contact Di Temukan"));
  console.log(`Nama : ${FindData.nama}`);
  console.log(`No Hp : ${FindData.NoHp}`);
  if (FindData.email) {
    console.log(`Email : ${FindData.email}`);
    return false;
  }
};

const deleteContact = (nama) => {
  // Array lama
  const readDataJson = loadContact();
  // array baru yang nanti nya untuk mendelete berdasarkan nama , kenapa menggunakan filter karna filter tidak akan berhenti walupun sudah di temukan datanya
  const newDataJson = readDataJson.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  // Apabila Data Yang Di masukan sama apa tidak Dengan Data Yang Di dalam file.jsonnya
  if (readDataJson.length === newDataJson.length) {
    // Apabila Tidak Di temukan Datanya
    console.log(chalk.red.inverse.bold(`${nama} , Tidak Ditemukan !!`));
    return false;
  }

  // APabila Berhasil Di temukan
  fs.writeFileSync("./data/context.json", JSON.stringify(newDataJson));

  console.log(
    chalk.green.inverse.bold(`Data Contact ${nama} , Berhasil Dihapus`)
  );
};

module.exports = { SaveData, listContact, detailContact, deleteContact };
