import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        image: { type: String },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number },
        amount: { type: Number },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        collection: "products",
        timestamps: true,
    }
);

mongoose.plugin(slug);

export default mongoose.model("Product", ProductSchema);
