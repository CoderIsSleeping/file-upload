const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const { uploadFile,
    getAllFiles,
    getSingleFile,
    downloadFile,
    deleteFile,
    getUserFiles
 } = require("../controllers/fileController");



router.post(
    "/upload",
    upload.single("file"),
    uploadFile
);

router.get(
    "/files",
    getAllFiles
);

router.get(
    "/user/:userId",
    getUserFiles
);

router.get(
    "/files/:id",
    getSingleFile
);

router.get(
    "/download/:id",
    downloadFile
);

router.delete(
    "/delete/:id",
    deleteFile
);




module.exports = router;