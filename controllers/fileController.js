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

const getAllFiles = async(req,res)=>{


    const files = await File.find();


    res.status(200).json({


        success:true,


        count:files.length,


        files:files


    });


};



const getSingleFile = async(req,res)=>{


    const file = await File.findById(
        req.params.id
    );


    if(!file){


        return res.status(404).json({

            success:false,

            message:"File not found"

        });

    }



    res.status(200).json({


        success:true,


        file:file


    });


};


module.exports={
    uploadFile,
    getAllFiles,
    getSingleFile
};