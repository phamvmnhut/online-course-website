const multer = require("multer");
const path = require('path');

let diskStorageImg = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../', '/public/img/product/'));
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file ${file.originalname} is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});
let diskStorageVid = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../', '/uploads/'));
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file ${file.originalname} is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});
const uploadImg = multer({ storage: diskStorageImg }).single("image");
const uploadVid = multer({ storage: diskStorageVid }).single("image");
module.exports = {
  uploadImg,
  uploadVid
}