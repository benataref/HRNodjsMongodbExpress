const mongoose = require('mongoose');

const EmployeeSchema=new mongoose.Schema({
    name: String,
    email: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref:'Department'},
    salary: { type: mongoose.Schema.Types.ObjectId, ref:'Salary'},
});

module.exports = mongoose.model('Employee', EmployeeSchema);