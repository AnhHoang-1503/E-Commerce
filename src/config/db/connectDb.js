import mongoose from "mongoose";
const uri =
    "mongodb+srv://hoang:AnhHoang1503@e-commerce.giaof8k.mongodb.net/E-Commerce?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected!!!");
    } catch (error) {
        console.log("Connect DB failure!!!", error);
    }
}

export default connect;
