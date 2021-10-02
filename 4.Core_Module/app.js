const fs = require('fs'); // core Module

// cara menggunakan string ke file (syncrhonus)
// Biasa nya Apabila Menggunakan Method Syncrhonus Menaganninya Menggunakan Try Catch dan kalo Asyncrhnus tidak menggunakan nya

// try{
//     fs.writeFileSync('data/text.txt' , 'Hello World Secara Synchnus');
// }catch(e){
//     console.log(e);
// }


// Menuliskan Data File Menggunakan Asynchronous
// Biasa nya Ini Menerima Call back 
// fs.writeFile('data/text_2.txt' , 'Hello World Secara Asynchronous' , (err) => {
//     console.log(err);
// })


// // Membaca Isi File (synchronous)
// const data = fs.readFileSync('data/text_2.txt', 'utf-8'); // apabila data di dalam txt itu masih buffer maka harus di tambahkan encoding = 'utf-8'
// console.log(data); // bisa menggunkan method di js yg toString()


// Membaca Secara Isi File (Asynchronous)
// fs.readFile('data/text.txt', 'utf-8' , (err, data )=>{
//     if (err) throw err; //  kenapa menggunakan thorw karna sifat nya sama kaya return langsung keluar dari fungsi  
//     console.log(data);
// })


// // READLINE MEMBUAT QUESTION
const readline = require('readline'); // Modules

// Interface Input Dan Output nya 
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
})

// // Membuat Sistem Sederhana Dengan Memasukan Data Ke Dalam File.txt
// rl.question('Siapa Nama Anda : ' , (nama) => {
//     rl.question('Masukan Umur Anda : ', (umur) => {
//         fs.writeFile('data/multi.txt' , `Terimakasih ${nama} Dan Umur Anda ${umur} , Sudah Memasukan Data nya` , (err) => {
//             if (!err) {
//                 console.log("Sucsses !!");
//             } else{
//                 console.log('Eroro',err);
//             }
//         })
//         rl.close() // Untuk Menghentikan Proses nyac
//     })
// })


// Membuat Aplikasi Sederhan Post Ke File.json
rl.question('Siapa Nama Anda : ' , (nama) => {
    rl.question('Masukan Umur Anda : ', (umur) => {
        const SaveData = { nama, umur }; // Menampung Semua data Callback / Yang Di Inputkan User melalu Terminal
        
        const file = fs.readFileSync('data/data.json', 'utf-8'); // Untuk Membaca Isi FIle Json nya 
        
        const contacts = JSON.parse(file); // Ubah Data nya menjadi JSON Pake JSON.parse
        
        contacts.push(SaveData) // Mengirim Data JSON nya ke dalam JSON
        
        // console.log(contacts);

        fs.writeFileSync('data/data.json', JSON.stringify(contacts)); // Mengubah data yang tadi nya DATA JSON MENJADI string dan Di Masukan ke Cetak File.json

        console.log("Terimakasih Sudah Memasukan Data Nya ^_^ ");

        rl.close() // Untuk Menghentikan Proses nyac
    })
})


