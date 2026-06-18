const File = require("../models/File");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const validateFile = require("../utils/validateFile");

const uploadFile = async(req,res)=>{


    if(!req.file){

        return res.status(400).json({

            success:false,

            message:"No file uploaded"

        });

    }


    let cloudFile;


    try{


        cloudFile = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder:"file-upload-service"
            }
        );



        fs.unlinkSync(req.file.path);



        const savedFile = await File.create({

            filename:req.file.filename,

            originalName:req.file.originalname,

            url:cloudFile.secure_url,

            publicId:cloudFile.public_id,

            mimetype:req.file.mimetype,

            size:req.file.size,

            owner:req.body.owner

        });



        res.status(201).json({

            success:true,

            file:savedFile

        });


    }


    catch(error){


        if(cloudFile){


            await cloudinary.uploader.destroy(
                cloudFile.public_id
            );


        }


        if(req.file.path && fs.existsSync(req.file.path)){


            fs.unlinkSync(req.file.path);


        }



        throw error;


    }


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

const getUserFiles = async(req,res)=>{


    const files = await File.find({

        owner:req.params.userId

    })
    .populate("owner");



    res.status(200).json({


        success:true,

        count:files.length,

        files:files


    });


};


module.exports={
    uploadFile,
    getAllFiles,
    getSingleFile,
    downloadFile,
    deleteFile,
    getUserFiles
};