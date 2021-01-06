const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('1', 10);
console.log(hash)