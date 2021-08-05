const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./data/images/uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//Filter files uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Unsuported file"), false);
  }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1*10
    },
    fileFilter: fileFilter
});

module.exports = {
    upload: upload
}
