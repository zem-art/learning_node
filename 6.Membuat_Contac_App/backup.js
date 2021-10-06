const contect = require("./contect.js");

// const { WriteQuestion , SaveData } = require('./contect'); // Bisa Menggunakan Pemanggilan Menggunakan Object Distructuring

const Main = async () => {
  // Metode Async Await 'Harus Menunggu Terlebih Dahulu'
  // const nama = await question1(); // // Cara PEMANGGILAN DARI PENULISAN YANG KE 1

  // const nama = await contect.WriteQuestion('Masukan Nama Anda :'); // Bisa Menggunkana Cara Variabel Yang Di jadikan Inisial File nya

  const nama = await contect.WriteQuestion("Masukan Nama Anda :");
  const email = await contect.WriteQuestion("Masukan Email Anda :");
  const NoHp = await contect.WriteQuestion("Masukan No Hp Anda :");

  contect.SaveData(nama, email, NoHp); // Import File Dari Contect.js Dan Parameter nya juga
};

Main();

// // CARA PENULISAN MENGGUNAKAN CALBACK

// rl.question('Masukan Nama Anda : ' , (nama) => {
//     rl.question('Masukan Email Anda : ' , (email) => {
//         const data = {nama , email };
//         const readFile = fs.readFileSync('./data/context.json');
//         const changeData = JSON.parse(readFile);

//         changeData.push(data)
//         fs.writeFileSync('./data/context.json', JSON.stringify(changeData));
//         console.log("Terimakasih Sudah Memasukan Data Nya ^_^ ");

//         rl.close()
//     })
// })
