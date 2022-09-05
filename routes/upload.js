const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
  destination: "./public/files",
  filename: (req, file, fn) => {
    fn(
      null,
      `${new Date().getTime().toString()}-${file.fieldname}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 200000 },
  fileFilter: (req, file, callback) => {
    validateFile(file, callback);
  },
}).single("avatar");

const validateFile = (file, cb) => {
  let allowedFileTypes = /jpeg|jpg|png/;
  const extension = allowedFileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase(),
  );
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb("Invalid file type. Only jpeg|jpg|png file are allowed");
  }
};

module.exports = upload;
