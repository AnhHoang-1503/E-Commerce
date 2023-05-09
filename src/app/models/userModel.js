import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: { type: String, required: true },
    },
    {
        collection: "users",
    }
);

export default mongoose.model("User", UserSchema);