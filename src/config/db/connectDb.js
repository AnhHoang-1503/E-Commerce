import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Blog_dev");
        console.log("Successfully connected!!!");
    } catch (error) {
        console.log(error);
    }
}

export default connect;
