const multer = require("multer");
const path = require('path');

let diskStorageImg = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../', '/public/img/'));
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
    callback(null, path.join(__dirname, '../', '/public/vid/'));
  },
  filename: (req, file, callback) => {
    let math = ["video/mp4", "video/mpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file ${file.originalname} is invalid. Only allowed to upload mp4 or mpeg.`;
      return callback(errorMess, null);
    }
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});
let diskStorageAva = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../', '/public/img/ava/'));
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
const uploadVid = multer({ storage: diskStorageVid }).single("video");
const uploadAva = multer({ storage: diskStorageAva }).single("image");
module.exports = {
  uploadImg,
  uploadVid,
  uploadAva
}