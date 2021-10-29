const {
  express,
  expressLayouts,
  flash,
  cookieParser,
  session,
} = require("./modules/modules");
require("./utils/db"); // Connect To DATABASES

const { Contact } = require("./models/contact");

// Express
const app = express();
const port = 3030;

// // Configurations View Enggine Exprress Layout
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`App Contact Is Running In http://localhost:${port}`);
});
