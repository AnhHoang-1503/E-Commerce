import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LoginSchema = new Schema(
    {
        email: { type: String, required: true },
        salt: { type: String, required: true },
        hash: { type: String, required: true },
    },
    {
        collection: "login",
        timestamps: true,
    }
);

export default mongoose.model("Login", LoginSchema);
