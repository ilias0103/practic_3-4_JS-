const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Название товара обязательно"],
      trim: true,
      minlength: [2, "Название должно содержать минимум 2 символа"],
      maxlength: [100, "Название не должно превышать 100 символов"]
    },

    price: {
      type: Number,
      required: [true, "Цена обязательна"],
      min: [0, "Цена не может быть отрицательной"]
    },

    category: {
      type: String,
      enum: {
        values: ["computer", "phone", "other"],
        message: "Категория должна быть computer, phone или other"
      },
      default: "other"
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;