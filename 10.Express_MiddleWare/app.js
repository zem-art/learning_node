// Belajar View Enggine
const express = require("express");
var expressLayouts = require("express-ejs-layouts");
var morgan = require("morgan");

const app = express();
const port = 3030;

// // Menggunakan view Enggine EJS
app.set("view engine", "ejs");

// // Thirt Party MiddleWare
app.use(expressLayouts);
app.use(morgan("dev")); // Morgan Untuk Memberi Tau Info Apa Saja Yang Sudh Kita Lakukan

// // Build in Middleware
app.use(express.static("public")); // Karna Default Dari Espress Memprivate File File Static Nya

// Aplication Level MidleWare
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next(); // Middleware agar routing nya paham dia akan kemana & kalo tidak di tambahkan maka akan hanging / blank
});

app.use((req, res, next) => {
  console.log("Ini Adalah MiddleWare");
  next(); // Middleware agar routing nya paham dia akan kemana & kalo tidak di tambahkan maka akan hanging / blank
});

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

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
