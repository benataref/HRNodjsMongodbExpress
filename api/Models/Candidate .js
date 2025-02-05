const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    resume: String,
    status: { type: String, default: 'applied' },
});

module.exports = mongoose.model('Candidate', CandidateSchema);