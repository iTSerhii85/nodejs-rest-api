const multer = require("multer");

const path = require("path");

// const destination = path.join(__dirname, "../", "temp");
const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const limits = {
//   fileSize: 1024 * 1024,
// };

// const fileFilter = (req, file, cb) => {
//   cb(null, true);
// };

const upload = multer({
  storage: storage,
  //   limits: limits,
  //   fileFilter: fileFilter,
});

module.exports = upload;
