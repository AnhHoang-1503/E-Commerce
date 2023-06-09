import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, required: true },
        deleted: { type: Boolean, default: false },
        purchaseHistory: { type: Array, default: [] },
    },
    {
        collection: "users",
    }
);

export default mongoose.model("User", UserSchema);
