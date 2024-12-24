const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: String,
    questions: [
        {
            text: String,
            options: [String],
            correctAnswer: Number,
        },
    ],
});

module.exports = mongoose.model('Exam', examSchema);