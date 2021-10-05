const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
})

// Membuat Folder Data Jika Belum Ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) { // Di Cek Dahulu Menggunakak Method existsSync() Apabila Tidak Ada Maka Jalan kan Perintah Ini 
    fs.mkdirSync(dirPath)
}
// Membuat File json nya Jika Belum Ada
const dirFile = './data/context.json';
if (!fs.existsSync(dirFile)){
    fs.writeFileSync(dirFile , '[]' , 'utf-8')
}


// // CARA PENULISAN YANG 1 
// const question = () => {
//     return new Promise((resolve , reject ) => { // resolve = apabila Promise nya Full Fields Dan Reject = Apabila Promise nya Gagal 
//         rl.question('Masukan Email Anda : ' , (email) => {
//             resolve(email)
//         })
//     })
// }

// CARA PENULISAN YANG KE 2 
const WriteQuestion = (Quest) => {
    return new Promise((resolve , reject ) => { // resolve = apabila Promise nya Full Fields Dan Reject = Apabila Promise nya Gagal 
        rl.question( Quest , (nama) => {
            resolve(nama)
        })
    })
}

const SaveData = (nama , email, NoHp) => {

    const data = {nama , email , NoHp};

    const readFile = fs.readFileSync('./data/context.json');
    
    const changeData = JSON.parse(readFile);

    changeData.push(data)
    
    fs.writeFileSync('./data/context.json', JSON.stringify(changeData));
    
    console.log("Terimakasih Sudah Memasukan Data Nya ^_^ ");

    rl.close()
}

module.exports = { WriteQuestion , SaveData } ;