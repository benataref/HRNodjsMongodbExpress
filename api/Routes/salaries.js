const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
 const Salary=require('../Models/Salary');
router.get('/', (req, res, next)=>{
    Salary.find().exec().then(docs=>{
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

    const data=new Salary({
       // _id: new mongoose.Types.ObjectId(),
       amount:req.body.amount,
       effectiveDate:req.body.effectiveDate,
       GrossSalary:req.body.GrossSalary,
       NetSalary:req.body.NetSalary,
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
    Salary.findById(id)
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
    amount:req.body.amount,
       effectiveDate:req.body.effectiveDate,
       GrossSalary:req.body.GrossSalary,
       NetSalary:req.body.NetSalary,
};
/* for(const ops of req.body){
    updateOps[ops.propName]=ops.value;
} */
    Salary.updateOne({ _id: id}, {$set: updateOps})
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
   Salary.deleteOne({ _id: id })
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