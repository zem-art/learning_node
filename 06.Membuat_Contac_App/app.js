// MENGAMBIL ARGUMENT DARI COMMENT LINE

const yargs = require("yargs");
const contect = require("./contect");

// // Contoh Yargs Dengan Parameter Banyak Menggunakan Object

yargs
  .command({
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
      NoHp: {
        describe: "NoHp Anda",
        demandOption: true,
        type: "string",
      },
    },
    // untuk mengeksekusi fungsinya yang sudah di buat
    handler(argv) {
      // Menyatukan dengan File contect dan data nya akan di simpan di file JSON
      contect.SaveData(argv.nama, argv.email, argv.NoHp);

      // const data = {
      //   nama: argv.nama,
      //   email: argv.email,
      //   noHp: argv.noHp,
      // };
      // console.log(data);
    },
  })
  .demandCommand(); // untuk Menambahkan Warning

// Melihat Semua Data Di Dalam Contact
yargs.command({
  command: "list", // Perintah
  describe: "Melihat List Contact",
  handler() {
    contect.listContact();
  },
});

// Melihat Detail Contact Berdasarkan Nama
yargs.command({
  command: "detail",
  describe: "Detail Sebuah Contact Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contect.detailContact(argv.nama);
  },
});

// Menghapus Contact Berdasarkan Nama
yargs.command({
  command: "delete",
  describe: "Menghapus Contact Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contect.deleteContact(argv.nama);
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
