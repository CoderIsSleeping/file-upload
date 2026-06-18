const File = require("../models/File");
const path= require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadFile = async(req,res)=>{


    if(!req.file){

        return res.status(400).json({

            success:false,

            message:"No file uploaded"

        });

    }


    // upload to cloudinary
    const result = await cloudinary.uploader.upload(
        req.file.path
    );


    // remove local temporary file
    fs.unlinkSync(req.file.path);



    // save metadata
    const savedFile = await File.create({

        filename:req.file.filename,

        originalName:req.file.originalname,

        path:req.file.path,

        url:result.secure_url,

        publicId:result.public_id,

        mimetype:req.file.mimetype,

        size:req.file.size,

        owner:req.body.owner

    });



    res.status(201).json({

        success:true,

        message:"File uploaded successfully",

        file:savedFile

    });


};

const getAllFiles = async(req,res)=>{


    const files = await File.find()
    .populate("owner");


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

const downloadFile = async(req,res)=>{


    const file = await File.findById(
        req.params.id
    );


    if(!file){


        return res.status(404).json({

            success:false,

            message:"File not found"

        });

    }



    res.redirect(file.url);


};

const deleteFile = async(req,res)=>{


    const file = await File.findById(
        req.params.id
    );


    if(!file){


        return res.status(404).json({

            success:false,

            message:"File not found"

        });


    }



    // delete from cloudinary

    await cloudinary.uploader.destroy(
        file.publicId
    );



    // delete from mongodb

    await File.findByIdAndDelete(
        req.params.id
    );



    res.status(200).json({

        success:true,

        message:"File deleted successfully"

    });


};

module.exports={
    uploadFile,
    getAllFiles,
    getSingleFile,
    downloadFile,
    deleteFile
};