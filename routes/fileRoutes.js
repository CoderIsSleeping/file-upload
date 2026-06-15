const express = require("express");

const router = express.Router();


const upload = require("../middleware/uploadMiddleware");

const { uploadFile,
    getAllFiles,
    getSingleFile
 } = require("../controllers/fileController");



router.post(
    "/upload",
    upload.single("file"),
    uploadFile
);

router.get(
    "/",
    getAllFiles
);



router.get(
    "/:id",
    getSingleFile
);



module.exports = router;