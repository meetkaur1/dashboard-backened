const express = require("express");
const allData = require("../controllers/allData");
const userRegistration = require("../controllers/userRegistration");
const userLogin = require("../controllers/userLogin");
const checkUserAuth = require("../middlewares/auth-middleware");
const updateUser = require("../controllers/updateUser");
const uploadImg = require("../controllers/uploadImg");
const getOnlyUser = require("../controllers/getOnlyUser");
const softDeleteAndRestore = require("../controllers/softDelete");
const userDelete = require("../controllers/userDelete");
const uploadData = require("../controllers/uploadData");
const csvuploadData = require("../controllers/csvuploadData");
const csvisActiveUploadData = require("../controllers/csvisActiveUploadData");
const csvisInActiveUploadData = require("../controllers/csvisInActiveUploadData");
const multer = require("multer");
const uploadImagemul = require("../controllers/uploadImagemul");

const router = express.Router();

//authorization
router.use("/all-data", checkUserAuth);
router.use("/update", checkUserAuth);
router.use("/get-only-user", checkUserAuth);
router.use("/register", checkUserAuth);
router.use("/delete-restore", checkUserAuth);
router.use("/permanent-delete", checkUserAuth);
router.use("/inactive-user", checkUserAuth);
router.use("/active-user", checkUserAuth);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// const imgstorage = multer.memoryStorage();
const incomingfileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return cb(new Error("Please upload a CSV file"), false);
  }
  cb(null, true);
};
// const imageFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png/;
//   const mimetype = filetypes.test(file.mimetype);
//   if (mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"), false);
//   }
// };
// const uploadimgfile = multer({
//   storage: imgstorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 2000000 },
// });
const upload = multer({
  storage,
  fileFilter: incomingfileFilter,
});

router.get("/all-data", allData);
router.get("/get-only-user", getOnlyUser);
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/update?:id", updateUser);
router.put("/upload-img", uploadImg);
// router.put("/upload-image", uploadimgfile.single("file"), uploadImagemul);
router.put("/delete-restore", softDeleteAndRestore);
router.delete("/permanent-delete?:_id", userDelete);
router.post("/upload-data", upload.single("file"), uploadData);
router.get("/all-users", csvuploadData);
router.get("/active-user", csvisActiveUploadData);
router.get("/inactive-user", csvisInActiveUploadData);

module.exports = router;
