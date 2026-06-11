const multer = require("multer");


// storage configuration
const storage = multer.diskStorage({


    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{


        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});



// file validation
const fileFilter = (req,file,cb)=>{


    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "application/pdf"

    ];


    if(allowedTypes.includes(file.mimetype)){


        cb(null,true);


    }

    else{


        cb(
            new Error("Invalid file type"),
            false
        );


    }


};





const upload = multer({

    storage:storage,


    limits:{

        fileSize: 5 * 1024 * 1024

    },


    fileFilter:fileFilter


});



module.exports = upload;