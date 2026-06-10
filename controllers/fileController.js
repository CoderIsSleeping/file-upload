const uploadFile = (req,res)=>{
    console.log(req.file);
    res.json({
        message:"File uploaded successfully",
        file:req.file
    })
}

module.exports={
    uploadFile
}