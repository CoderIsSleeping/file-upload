const File = require("../models/File");



const uploadFile = async(req,res)=>{


    if(!req.file){


        return res.status(400).json({

            success:false,
            message:"No file uploaded"

        });


    }



    const savedFile = await File.create({


        filename:req.file.filename,


        originalName:req.file.originalname,


        path:req.file.path,


        mimetype:req.file.mimetype,


        size:req.file.size


    });



    res.status(201).json({


        success:true,


        message:"File uploaded successfully",


        file:savedFile


    });



};



module.exports={
    uploadFile
};