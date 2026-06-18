const { fileTypeFromFile } = require("file-type");


const validateFile = async(filePath)=>{


    const type = await fileTypeFromFile(
        filePath
    );


    if(!type){

        return false;

    }



    const allowedTypes = [

        "image/png",

        "image/jpeg",

        "application/pdf"

    ];



    return allowedTypes.includes(
        type.mime
    );


};



module.exports = validateFile;