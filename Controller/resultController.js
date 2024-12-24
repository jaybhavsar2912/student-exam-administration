const Exam = require("../Model/exam");
const Result = require("../Model/Result");

exports.submitExam = async (req, res, next) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Forbidden: Only students can submit exams' });
        }

        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const { answers } = req.body;
        if (!answers || answers.length !== exam.questions.length) {
            return res.status(400).json({ message: 'Invalid answers: Ensure all questions are answered.' });
        }

        const score = exam.questions.reduce((acc, question, index) => {
            return acc + (question.correctAnswer === answers[index] ? 1 : 0);
        }, 0);

        const pass = score / exam.questions.length >= 0.5;

        const result = new Result({
            studentId: req.user.userId,
            examId: exam._id,
            answers,
            score,
            pass,
        });

        await result.save();

        res.status(200).json({ message: 'Exam submitted successfully', score, pass });
    } catch (error) {
        next(error);
    }
};
