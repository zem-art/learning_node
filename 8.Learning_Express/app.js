// // BELAJAR EXPRESS JS
const express = require("express");
const app = express();
const port = 3000;

// req => apa yang di kirim kan ke express
// res => apa yang di keluarkan dari express

// MENCOBA res

app.get("/", (req, res) => {
  // RES = JSON
  res.json({
    id: 1,
    nama: "ujang",
    email: "admin@Gamil.com",
  });
});

app.get("/about", (req, res) => {
  res.sendFile("./index.html", { root: __dirname }); // Kenapa Menggunakan root karna dirrektori project nya
});

app.get("/contact", (req, res) => {
  res.send("Hello Contact Page");
});

// MENCOBA req

app.get("/product/:id/categori/:idCtg", (req, res) => {
  // // http://localhost:3000/product/1/categori/2
  res.send(
    `Product ID : ${req.params.id} <br> Categori ID : ${req.params.idCtg}`
  );
}); // Mencoba Menangkap req parameter

app.get("/product/:id", (req, res) => {
  // // http://localhost:3000/product/1?categori=2
  res.send(
    `Product ID : ${req.params.id} <br> Categori ID : ${req.query.categori}`
  );
}); // Mencoba Menangkap req query

// // USE TIDAK BOLEH DI TARUNG PALING ATAS KARNA APABILA DI TARUH PALING ATAS NANTI SEMUA app Yang sebelum nya tidak akan di anggap oleh USE
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
}); // Biasa nya use di tangani untuk menangani page Eror

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
