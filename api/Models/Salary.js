const mongoose = require('mongoose');

const SalarySchema=new mongoose.Schema({
    amount:Number,
    effectiveDate:Date,
    GrossSalary:Number,
    NetSalary:Number
});

module.exports = mongoose.model('Salary', SalarySchema);
