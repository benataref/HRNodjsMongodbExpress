const mongoose =require('mongoose');
const department=mongoose.Schema({

    name:String,
    Company: { type:mongoose.Schema.Types.ObjectId, ref:'Company'},

});
module.exports=mongoose.model('Department' ,department); 