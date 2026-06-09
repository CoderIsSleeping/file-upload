const express = require("express");
require("dotenv").config();

const app = express();


app.use(express.json());


app.get("/",(req,res)=>{

    res.send("File Upload API running");

})


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on ${PORT}`);

})