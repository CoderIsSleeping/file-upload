const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

const fileRoutes = require("./routes/fileRoutes");
const errorHandler = require("./middleware/errorMiddleware");


const app = express();


// middleware
app.use(express.json());
app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);


// test route
app.get("/", (req, res) => {

    res.send("File Upload API running");

});


// file routes
app.use("/api/files", fileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`🚀 Server running at http://localhost:${PORT}`);

});