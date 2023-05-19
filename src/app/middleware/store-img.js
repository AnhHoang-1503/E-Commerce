import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { ObjectId } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// store image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/productsImg"));
    },
    filename: function (req, file, cb) {
        cb(null, `${req.objectId}.png`);
    },
});
const upload = multer({ storage: storage });

export default upload.single("image");
