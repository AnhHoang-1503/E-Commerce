import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        image: { type: String },
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        amount: { type: Number },
        slug: { type: String, slug: "name", unique: true },
        deleted: { type: Boolean, default: false },
    },
    {
        collection: "products",
        timestamps: true,
    }
);

mongoose.plugin(slug);

export default mongoose.model("Product", ProductSchema);
