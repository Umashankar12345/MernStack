 const  dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send({ message: "Welcome to the Product API" });
});

app.use("/api/products", require("./routes/ProductRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
