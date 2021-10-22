// Belajar Web Server Manual Menggunkan Core Module Dari Node js

const http = require("http");
const fs = require("fs");

// req => request ke server
// res => hasil nya

// // CARA PENULISAN 1

// const server = http.createServer((req, res) => {});

// server.listen(3000, () => {
//   console.log("Server Is Listening on Port 3000 ");
// });

// // CARA PENULISAN 2
// http
//   .createServer((req, res) => {
//     res.write("Hello World"); // Perintah Menampilkan Tulisan nya

//     res.end(); // Perintah Yang Mengakhirkan Untuk Server nya
//   })
//   .listen(3000, () => {
//     console.log("Server Is Listening on Port 3000 ");
//   });

// // CARA PENULISAN 3
const port = 3000;

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Eror : File Not Founds ");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const url = req.url;

    // // MENGGUNAKAN SWITCH CASE

    switch (url) {
      case "/about":
        renderHTML("./about.html", res);
        break;
      default:
        renderHTML("./index.html", res);
        break;
    }

    // // MENGGUNAKANA IF ELSE

    // if (url === "/login") {
    //   res.write("<h1>Hello Page Login</h1>"); // Perintah Menampilkan Tulisan nya
    //   res.end();
    // } else if (url === "/about") {
    //   renderHTML("./about.html", res);
    // } else {
    //   fs.readFile("./index.html", (err, data) => {
    //     if (err) {
    //       res.writeHead(404);
    //       res.write("Eror : File Not Founds ");
    //     } else {
    //       res.write(data);
    //     }
    //     res.end();
    //   });
    // }

    // res.end(); // Perintah Yang Mengakhirkan Untuk Server nya
  })
  .listen(port, () => {
    console.log(`Server Is Listening on Port ${port} `);
  });
