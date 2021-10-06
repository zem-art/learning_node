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

const SaveData = (nama, email, NoHp) => {
  const data = { nama, email, NoHp };

  const readFile = fs.readFileSync("./data/context.json");

  const changeData = JSON.parse(readFile);

  // // CEK NAMA DUPLIKAT
  // // Cek Apakah Ada Nama Duplikat Di dalam Contact
  const duplikatName = changeData.find((data) => data.nama === nama); // data.nama => data yang ada di dalam file
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
    console.log(chalk.blue.inverse.bold("No Phone Tidak Validc !"));
    return false;
  }

  changeData.push(data);

  fs.writeFileSync("./data/context.json", JSON.stringify(changeData));

  console.log(
    chalk.green.inverse.bold("Terimakasih Sudah Memasukan Data Nya ^_^ ")
  );

  //   rl.close(); // sudah tidak di gunakan karna sudah menggunakan yargs
};

module.exports = { SaveData };
