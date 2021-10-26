// // BELAJAR NODE JS

// MODULES REQUIRE
const {
  express,
  expressLayouts,
  flash,
  cookieParser,
  session,
} = require("./modules/modules");

const { body, validationResult, check } = require("express-validator"); // Validator Exprress

const {
  loadContact,
  findContact,
  addDataContact,
  CekDuplikat,
} = require("./utils/contect"); // Modul-Modul CRUD(CONTACT)

const app = express();
const port = 3030;

// CONFIGURATIONS FLASS SESSIONS
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// // Menggunakan view Enggine EJS
app.set("view engine", "ejs");

// // Thirt Party MiddleWare
app.use(expressLayouts);

// // Build in Middleware
app.use(express.static("public")); // Karna Default Dari Espress Memprivate File File Static Nya
app.use(express.urlencoded({ extended: true })); // Middleware Untuk Parsing Data POST

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
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
  });
});

// PAGE CONTACT
app.get("/contact", (req, res) => {
  const getData = loadContact();
  // Tempat BASE DIREKTORI NYA
  res.render("page/contact", {
    nama: "Contact",
    title: "Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
    data: getData,
    msg: req.flash("msg"),
  });
});

// // PROGRESS FORM DATA CONTACT MENGGUNKANAN VALIDASI
app.post(
  "/contact",
  // THIS IS VALIDASI
  [
    body("nama").custom((input) => {
      const duplikat = CekDuplikat(input);
      if (duplikat) {
        throw new Error("Nama Sudah Terdaftar !!"); // Kenapa Menggunkan thowrn Eror Supaya Bisa Di Tangkap Oleh ValidatorResult
      }
      return true; // Jika Lolos Maka Akan Di Lewati
    }),
    check("email", "Email Tidak Valid !").isEmail(),
    check("nohp", "No Hp Tidak Valid !").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("page/add-contact", {
        // Validasi Erorr nya akan tetap di page kontak
        nama: "Contact",
        title: "Contact",
        layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
        eror: errors.array(),
      });
    } else {
      addDataContact(req.body);
      req.flash("msg", "Data Berhasil Di Tambahkan !");
      res.redirect("/contact"); // akan meredirect ke page contact
    }
  }
);

// PAGE FORM CONTACT
app.get("/contact/add", (req, res) => {
  res.render("page/add-contact", {
    title: "Form Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
  });
});

// PAGE DETAIL CONTACT
app.get("/contact/:name", (req, res) => {
  // NOTE => Tidak Boleh Menambahkan Route contact/... Karna Nanti akan di tangani oleh route nya params si /contact:nama
  let resultData = findContact(req.params.name);

  // Tempat BASE DIREKTORI NYA
  res.render("page/detail", {
    nama: "Contact",
    title: "Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
    dataDetail: resultData,
  });
});

// PAGE ABOUT
app.get("/about", (req, res) => {
  // Tempat BASE DIREKTORI NYA
  res.render("page/about", {
    nama: "About",
    title: "About",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya
  });
});

// STATUS EROR NOT FOUNDS
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
