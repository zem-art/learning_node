const {
  express,
  expressLayouts,
  flash,
  cookieParser,
  session,
  methodOverride,
} = require("./modules/modules");
require("./utils/db"); // Connect To DATABASES
const { body, validationResult, check } = require("express-validator"); // Validator Exprress

const { Contact } = require("./models/contact");

// Express
const app = express();
const port = 3030;

// // Configurations View Enggine Exprress Layout
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Override Method URL
app.use(methodOverride("_method"));

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

// Page Core (Home Page)
app.get("/", (req, res) => {
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

// PAGE ABOUT
app.get("/about", (req, res) => {
  // Tempat BASE DIREKTORI NYA
  res.render("page/about", {
    nama: "About",
    title: "About",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya
  });
});

// PAGE CONTACT
app.get("/contact", async (req, res) => {
  const getData = await Contact.find(); // GET ALL DATA

  // Tempat BASE DIREKTORI NYA
  res.render("page/contact", {
    nama: "Contact",
    title: "Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
    data: getData,
    msg: req.flash("msg"),
  });

  // // Ketika Ingin Menjalankan Tanpa Asyn Await
  //   Contact.find()
  //     .then((result) => {
  //       res.send(result);
  //     })
  //     .catch((err) => {
  //       res.send(err);
  //     });
});

// PAGE FORM CONTACT
app.get("/contact/add", (req, res) => {
  res.render("page/add-contact", {
    title: "Form Add Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
  });
});

// // PROGRESS FORM TAMBAH DATA CONTACT MENGGUNKANAN VALIDASI
app.post(
  "/contact",
  // THIS IS VALIDASI
  [
    body("nama").custom(async (input) => {
      const duplikat = await Contact.findOne({ nama: input });
      if (duplikat) {
        throw new Error("Nama Sudah Terdaftar !!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid !").isEmail(),
    check("nohp", "No Hp Tidak Valid !").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("page/add-contact", {
        title: "Form add Contact",
        layout: "base/base.ejs",
        eror: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (err, result) => {
        req.flash("msg", "Data Berhasil Di Tambahkan !");
        res.redirect("/contact");
      });
    }
  }
);

// PROSES DELETE DATA MENGGUNAKAN DATA PARAMS
app.get("/contact/delete/:id", async (req, res) => {
  let param = await Contact.findOne({ id: req.params.id }); // Cek Nama Yang Berada Di Dalam File Json Nya
  // JIKA KONTAK TIDAK ADA
  if (!param) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    Contact.deleteOne({ id: param._id }).then((result) => {
      req.flash("msg", "Contact Berhasil Di Hapus !");
      res.redirect("/contact"); // akan meredirect ke page contact
    });
  }
});

// PAGE EDIT CONTACT
app.get("/contact/edit/:id", async (req, res) => {
  let param = await Contact.findOne({ _id: req.params.id });

  res.render("page/edit-contact", {
    title: "Form Edit Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
    param,
  });
});

// // PROGRESS EDIT DATA CONTACT MENGGUNKANAN VALIDASI
app.put(
  "/contact",
  // THIS IS VALIDASI
  [
    body("nama").custom(async (input, { req }) => {
      const duplikat = await Contact.findOne({ nama: input });

      // kasus nya nama nya sama dengan oldName dan nama nya duplikat di DATABASES nya
      if (input !== req.body.oldName && duplikat) {
        throw new Error("Nama Sudah Terdaftar !!");
      }
      return true; // Jika Lolos Maka Akan Di Lewati
    }),
    check("email", "Email Tidak Valid !").isEmail(),
    check("nohp", "No Hp Tidak Valid !").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("page/edit-contact", {
        // Validasi Erorr nya akan tetap di page kontak
        title: "Form Edit Contact",
        layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
        eror: errors.array(),
        param: req.body,
      });
    } else {
      // res.send(req.body);
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            nohp: req.body.nohp,
            email: req.body.email,
          },
        }
      ).then((result) => {
        req.flash("msg", "Data Berhasil Di Update !");
        res.redirect("/contact"); // akan meredirect ke page contact
      });
    }
  }
);

// PAGE DETAIL CONTACT
app.get("/contact/:id", async (req, res) => {
  // NOTE => Tidak Boleh Menambahkan Route contact/... Karna Nanti akan di tangani oleh route nya params si /contact:nama
  let resultData = await Contact.findOne({ id: req.params.id });

  // Tempat BASE DIREKTORI NYA
  res.render("page/detail", {
    title: "Detail Contact",
    layout: "base/base.ejs", // Cara Mengakses Base Url Nya yang sudah di extend
    dataDetail: resultData,
  });
});

// PROSES DELETE DATA MENGGUNAKANA METHOD DELETE
app.delete("/contact", (req, res) => {
  // res.send(req.body)
  Contact.deleteOne({ id: req.body._id }).then((result) => {
    req.flash("msg", "Contact Berhasil Di Hapus !");
    res.redirect("/contact"); // akan meredirect ke page contact
  });
});

app.listen(port, () => {
  console.log(`App Contact Is Running In http://localhost:${port}`);
});
