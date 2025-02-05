const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
 const Candidate=require('../Models/Candidate ');
router.get('/', (req, res, next)=>{
    Candidate.find().exec().then(docs=>{
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

    const data=new Candidate({
       // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body. email,
        resume: req.body.resume,
        status: req.body.status,
       
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
    Candidate.findById(id)
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
    Candidate.updateOne({ _id: id}, {$set: updateOps})
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
   Candidate.deleteOne({ _id: id })
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