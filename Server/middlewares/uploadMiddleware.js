const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "HealthMateReports",       // Folder name on Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "pdf"],
        resource_type: "auto",             // to allow both images & pdf
        public_id: (req, file) => Date.now() + "-" + file.originalname.split('.')[0],
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only images and PDFs are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
