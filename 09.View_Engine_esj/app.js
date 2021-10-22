// Belajar View Enggine
const express = require("express");
var expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3030;

// // Gunakan Ejs
app.set("view engine", "ejs");
// //
app.use(expressLayouts);

// Page Core (Home Page)
app.get("/", (req, res) => {
  // res.send("Hello World!");

  const mhs = [
    { id: 1, nama: "ujang", status: "semester 2" },
    { id: 2, nama: "asep", status: "semester akhir" },
    { id: 3, nama: "Dodi", status: "semester 4" },
  ];
  // Tempat BASE DIREKTORI NYA
  res.render("page/index", {
    nama: "Dunia",
    title: "Home",
    mhs,
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya
  });
});

// Page Contact
app.get("/contact", (req, res) => {
  // Tempat BASE DIREKTORI NYA
  res.render("page/contact", {
    nama: "Contact",
    title: "Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya
  });
});

// Page Contact
app.get("/about", (req, res) => {
  // Tempat BASE DIREKTORI NYA
  res.render("page/about", {
    nama: "About",
    title: "About",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya
  });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
