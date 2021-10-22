var validator = require('validator');
const chalk = require('chalk');

// const data =  validator.isEmail('adminmail.com');
// const mobile =  validator.isMobilePhone('08013242144','id-ID');
const mobile =  validator.isNumeric('08013242144');

// Templeate Literal Menggunakn Chalk Color
var static = 'Andi'
const lorem = `And nodemon ${chalk.red(static)} will be ${chalk.bold.bgRed('globally')} to your system path.`;

console.log(lorem);
console.log(mobile);


console.log(chalk.bold("Hello World"));