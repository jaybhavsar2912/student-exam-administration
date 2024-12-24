const Exam = require("../Model/exam");

exports.createExam = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Only admins can create exams' });
    }

    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Bad request: Title and questions are required' });
    }

    const exam = new Exam({ title, questions });
    await exam.save();

    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    next(error);
  }
};


exports.getExams = async (req, res, next) => {
  try {
    const exams = await Exam.find({}, 'title questions');

    if (!exams || exams.length === 0) {
      return res.status(404).json({ message: 'No exams found' });
    }

    res.status(200).json({ message: 'Exams retrieved successfully', exams });
  } catch (error) {
    next(error);
  }
};

