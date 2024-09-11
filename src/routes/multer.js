var multer = require("multer");
const { v4: uuidv4 } = require('uuid');
var serverpath = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/images");
  },
  filename: (req, file, path) => {
    
   // var extension=file.originalname.substring(file.originalname.indexOf("."))
   //uuidv4()+extension
    path(null, uuidv4()+".jpg");
  },
});
var upload = multer({ storage: serverpath });
module.exports = upload;
