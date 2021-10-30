const { mongoose } = require("../modules/modules");

// Connect To Database Local => mongodb://IPADRESS:PORT/databaseName
mongoose.connect("mongodb://127.0.0.1:27017/db_testing");

// // MEMBUAT DATA YANG AKAN DI MASUKAN TERLEBIH DAHULU // MEMBUAT DATA PERMANEN
// const contact1 = new Contact({
//   nama: "kasep",
//   nohp: "081234512323",
//   email: "kasep123@yahoo.com",
// });

// // SIMPAN KE COLLECTIONS
// contact1
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
