const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    resume: String,
    status: String,
});

module.exports = mongoose.model('Candidate', CandidateSchema);