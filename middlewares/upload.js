const multer = require("multer");

const path = require("path");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    const { id } = req.user;
    const { originalname } = file;
    const extension = originalname.split(".").pop();
    const newName = `${id}.${extension}`;
    cb(null, newName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
