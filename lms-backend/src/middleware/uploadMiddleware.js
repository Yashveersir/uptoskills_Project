import multer from "multer";

<<<<<<< HEAD
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "video/mp4"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, PNG, PDF and MP4 files are allowed"
            ),
            false
        );
    }
};

const upload = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },

    fileFilter
});
=======
const  storage=multer.diskStorage({});


const upload=multer({
    storage,
    limits:{
        fileSize: 10 * 1024 * 1024     // 10MB
    }
})
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a

export default upload;