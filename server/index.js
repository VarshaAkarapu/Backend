const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../server/confiq/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const couponRoutes = require("./routes/couponRoutes");
const brandRoutes = require("./routes/brandRoutes");
const { swaggerUi, swaggerSpec } = require("./confiq/swagger");
const cors = require("cors");
require("./jobs/expireCoupons");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // OR restrict to specific origins like 'http://192.168.x.x'
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/brands",brandRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
