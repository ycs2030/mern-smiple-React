import express from "express";
import dotenv from "dotenv";
import path from "path";
import {createConnection} from "./config/DB.js";
import productRoutes from "./routes/product.route.js";

const app = express();

dotenv.config();

// allow us to accept json data in the request body
app.use(express.json());

// get all products
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
console.log("PORT : " + process.env.NODE_ENV);
const __dirname = path.resolve();
//app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (request, response) => {
        response.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
} else {
    app.get("/", (request, response) => {
        response.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    createConnection();
    console.log(`Server started at http://localhost:${PORT} `);
});