const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename:function (req, file, cb) {
    cb(null,  Date.now()+`user_${file.originalname}` );
  },
  fileFilter: (req, file, callBack)=> {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callBack(new Error('Please upload an image'))
    }
    callBack(undefined, true)
}
});

const uploadFile = multer({ storage: storage });
module.exports = uploadFile;