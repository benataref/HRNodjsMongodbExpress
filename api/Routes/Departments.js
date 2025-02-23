const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
 const Department=require('../Models/Department');
router.get('/', (req, res, next)=>{
    Department.find().exec().then(docs=>{
        console.log(docs);
       
            res.status(200).json(docs);
     
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
 
});
router.post("/", (req, res, next)=>{

    const data=new Department({
       // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        company: req.body.company
       
    });
    data.save()
    .then(result=>{
        console.log(result);
res.status(201).json({
    message:"Handling POST request to a data",
    createdStudent:result
});
    })
    .catch(err=>{
         console.log(err);
    res.status(500).json({
       error:err 
    });
    });

});
router.get('/:_id',(req, res, next)=>{
    const id=req.params._id;
    Department.findById(id)
    .exec()
    .then(doc=>{
     console.log("success", doc);  
     res.status(200).json(doc);
    })
    .catch(err=>{console.log(err);
    res.status(500).json({error: err}) ;
 
});
});
router.patch("/:_id",(req, res, next)=>{
const id =req.params._id;
const updateOps={
    name: req.body.name
};
/* for(const ops of req.body){
    updateOps[ops.propName]=ops.value;
} */
Department.updateOne({ _id: id}, {$set: updateOps})
.exec().then(result=>{
    console.log(result);
    res.status(200).json(result);
})
.catch(err=> {
    console.log(err);
    res.status(500).json({
        
    });

});
});
router.delete("/:_id",(req, res, next)=>{
 
   const id=req.params._id;
   Department.deleteOne({ _id: id })
   .exec()
   .then(result=>{
    res.status(200).json(result);
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
   });

    });
module.exports=router;