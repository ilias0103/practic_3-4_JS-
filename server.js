const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.routes");
const errorMiddleware = require("./middleware/error.middleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/products", productRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Mongo Products API is working"
  });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "shop"
    });

    console.log("Mongoose подключён");
    console.log("База данных: shop");

    app.listen(PORT, () => {
      console.log(
        `Mongo Products API запущен на http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error);
    process.exit(1);
  }
}

startServer();