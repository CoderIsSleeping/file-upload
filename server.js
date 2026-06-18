const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
require("./models/User");
const fileRoutes = require("./routes/fileRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();


app.use(express.json());


app.get("/", (req, res) => {

    res.send("File Upload API running");

});


app.use("/api/files", fileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(
            `Server running at http://localhost:${PORT}`
        );
    });
};

startServer();