const { ObjectID } = require("bson"); // untuk memfilter ObjectID
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "db_testing";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

client.connect((err, result) => {
  if (err) {
    console.log("Koneksi Gagal !!");
  }
  //   console.log("Koneksi Berhasil ^_^");

  // Contact Adalah nama Collections nya di database

  const db = client.db(dbName); // Connect To Database

  //   // MENAMBAHKAN 1 DATA KE COLLECTION DATABASE
  //   db.collection("Contact").insertOne(
  //     { nama: "sayyid", email: "sayyid@mail.co.id" },
  //     (error, result) => {
  //       if (error) {
  //         console.log("Data Gagal Di Tambahkan !!");
  //       }

  //       console.log(result);
  //     }
  //   );

  //   // MENAMBAHKAN LEBIH DARI 1 DATA
  //   db.collection("Contact").insertMany(
  //     [
  //       { nama: "sayyid", email: "sayyid@mail.co.id" },
  //       { nama: "mon", email: "sayyid@mail.co.id" },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         console.log("Data Gagal Di Tambahkan !!");
  //       }

  //       console.log(result);
  //     }
  //   );

  //   // MENAMPILKAN SEMUA DATA DI COLLECTION DATABASES
  //   console.log(
  //     db
  //       .collection("Contact")
  //       .find()
  //       .toArray((error, result) => {
  //         // Menggunkanan method array untuk menampilkan data nya
  //         console.log(result);
  //       })
  //   );

  //   // MENAMPILKAN SEMUA DATA BERDASARKAN KRITERIA YG ADA DI COLLECTION DATABASES
  //   console.log(
  //     db
  //       .collection("Contact")
  //       .find({ _id: ObjectID("617acb9cc040687bb2442375") })
  //       .toArray((error, result) => {
  //         // Menggunkanan method array untuk menampilkan data nya
  //         console.log(result);
  //       })
  //   );

  // //   MENGUBAH 1 COLLECTIONS BERDASARKAN ID
  //   const updatePromise = db.collection("Contact").updateOne(
  //     { _id: ObjectID("617ada4bc3980fb6e82bbe56") }, // Properti yg membedakan dari collection yg lain = ID Nya
  //     { $set: { email: "neko@gmail.com" } } // Properti yg mau di ubah menggunkan $set:{}
  //   );

  //   updatePromise
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // // MENGUBAH DATA LEBIH DARI 1 DOCUMENT
  //   const updatePromise = db.collection("Contact").updateMany(
  //     { nama: "mon" }, // Properti yg membedakan dari collection yg lain
  //     { $set: { nama: "mundur" } } // Properti yg mau di ubah menggunkan $set:{}
  //   );

  //   updatePromise
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // MENGHAPUSH 1 COLLECTION DI DOCUMENT
  //   db.collection("Contact")
  //     .deleteOne({
  //       _id: ObjectID("617acb12c040687bb2442374"), // Properti yg membedakan dari collection yg lain = ID Nya
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // MENGHAPUSH LEBIH DARI 1 COLLECTION DI DOCUMENT
  //   db.collection("Contact")
  //     .deleteMany({
  //       nama: "mundur", // Properti yg membedakan dari collection yg lain
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
});
