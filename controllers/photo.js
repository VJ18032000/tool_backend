const Img=require('../models/photo')
const image = (req, res, next) => {
      // const images=[]
    // if(Array.isArray(req.file.path)){
    //     for(let a=0;a<req.file.path.length;a++){
    //         images.push(req.file.path[a])
    //     }
    // }else{
    //     image.push(req.file.path)
    // }
    const user = new Img({
       img : req.file.path
    })
    user.save()
        .then(user => {
            const resdata = {
                "status": "OK",
                "result": {
                    "inserted_id": `${user.id}`,
                    "img":`${user.img}`
                },
                "error": {}
            }
            res.json(resdata)
        })
        .catch(err => {
            const resdata = {
                "status": "OK",
                "message": "",
                "result": {},
                "errors": {
                    "errors": {
                        "message": `${err.message}`,
                        "type": `${err.name}`
                    }
                }
            }
            res.json(resdata)
        })
}

const getImage=(req,res,next)=>{
    Img.find()
    .then(img=>{
        res.send(img)
    })
}

const updateImage=(req,res,next)=>{
    const id=req.params.id;
    const user = new Img({
        img : req.file.path
     })
    Img.findByIdAndUpdate({_id:id},{img:user.img})
     .then(image=>{
       res.send("success")
   })
   .catch(err=>{
       res.send(err)
   })
}

module.exports={image,getImage,updateImage}