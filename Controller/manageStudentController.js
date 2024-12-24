const User = require("../Model/User");
const bcrypt = require('bcrypt');

exports.getAllStudents = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can view students" });
    }

    const students = await User.find(
      { role: "student" },
      "username email role"
    );
    res
      .status(200)
      .json({ message: "Students retrieved successfully", students });
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can view student details" });
    }

    const student = await User.findById(req.params.id, "username email role");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student details retrieved successfully", student });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can update student details" });
    }

    const { username, email, password, role } = req.body;
    console.log("req.body", req.body);
    

    const student = await User.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
    }

    student.username = username || student.username;
    student.email = email || student.email;
    student.role = role || student.role;

    await student.save();

    res
      .status(200)
      .json({ message: "Student details updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error while updating student details",
    });
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can delete students" });
    }

    const student = await User.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};
