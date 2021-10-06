// MENGAMBIL ARGUMENT DARI COMMENT LINE

const yargs = require("yargs");
const contect = require("./contect");

// // Contoh Yargs Dengan Parameter Banyak Menggunakan Object

yargs.command({
  command: "add", // Perintah
  describe: "Menambahkan Contact Baru", // Describsi
  // Fields Yang Di Inginkan nya
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email Anda",
      demandOption: false,
      type: "string",
    },
    noHp: {
      describe: "NoHp Anda",
      demandOption: true,
      type: "string",
    },
  },
  // untuk mengeksekusi fungsinya yang sudah di buat
  handler(argv) {
    // Menyatukan dengan File contect dan data nya akan di simpan di file JSON
    contect.SaveData(argv.nama, argv.email, argv.noHp);

    // const data = {
    //   nama: argv.nama,
    //   email: argv.email,
    //   noHp: argv.noHp,
    // };
    // console.log(data);
  },
});

yargs.parse(); // Untuk Memanggil Yargs Nya

// // Contoh Yargs Dengan Parameter Satuan

// yargs.command(
//   "add",
//   "Membuat Contact App",
//   () => {},
//   (argv) => {
//     console.log(argv.nama);
//   }
// );
