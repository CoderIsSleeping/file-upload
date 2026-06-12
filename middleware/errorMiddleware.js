const multer = require("multer");


const errorHandler = (err,req,res,next)=>{


    if(err instanceof multer.MulterError){


        return res.status(400).json({

            success:false,

            message:err.message

        });


    }



    res.status(500).json({

        success:false,

        message:err.message || "Server Error"

    });



}


module.exports = errorHandler;