// const bcrypt = require('bcryptjs');
// const hash = bcrypt.hashSync("123", 10);
// console.log(hash);

// const d = new Date();
// console.log(d);

const {UserModel} = require('./src/models')

const usrData = {
    Wallet: 0,
    Avatar: "",
    Email: 'req.body.email',
    LastName: 'req.body.last_name',
    FirstName: 'req.body.first_name',
    Password: '123',
    DisplayName: "NoName",
    Role: 0,
    DateCreated: new Date(),
}

async function addUser(){
  const newUser = await UserModel.add(usrData);
  if (!newUser) return console.log("failed");
  return console.log('success');
}
addUser()