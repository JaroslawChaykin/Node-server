import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
  }
)

const CategoriesModel = mongoose.model('Categories', CategoriesSchema)

export default CategoriesModel