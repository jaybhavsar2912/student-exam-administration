const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    examId: mongoose.Schema.Types.ObjectId,
    answers: [Number],
    score: Number,
    pass: Boolean,
});

module.exports = mongoose.model('Result', resultSchema);