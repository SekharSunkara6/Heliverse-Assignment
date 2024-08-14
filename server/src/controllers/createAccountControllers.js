import bcrypt from "bcrypt"
import {User} from "../models/user.model.js"
import { Classroom } from "../models/classroom.model.js";

// Controller for creating teacher accounts
export const createTeacherAccount = async (req,res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        if (role !== 'teacher') {
            return res.status(400).json({ message: 'Invalid role for teacher account' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
          });

          await newUser.save();

          res.status(201).json({ message: 'Teacher account created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating teacher account', error: error.message });
    }
}

// Controller for creating student accounts
export const createStudentAccount = async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;
  
      // Validate role
      if (role !== 'student') {
        return res.status(400).json({ message: 'Invalid role for student account' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Student account created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating student account', error: error.message });
    }
  };


// Controller to fetch all teachers
export  const getAllTeachers = async (req, res) => {
  try {
    // Find all teachers and exclude the password field
    // console.log("Received cookies:", req.cookies);
    const teachers = await User.find({ role: 'teacher' }).select('-password');

    // Loop through each teacher and find their assigned classroom
    const teachersWithClassrooms = await Promise.all(
      teachers.map(async (teacher) => {
        // Find the classroom assigned to the teacher
        const classroom = await Classroom.findOne({ assignedTeacher: teacher._id }).select('name');
        // Add the classroom name to the teacher object
        return {
          ...teacher.toObject(),  // Convert the Mongoose document to a plain object
          classroomName: classroom ? classroom.name : 'No classroom assigned'
        };
      })
    );

    // Return the teachers along with their assigned classroom names
    res.status(200).json(teachersWithClassrooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error: error.message });
  }
};

export const getUnassignedTeachers = async (req,res) => {
  try {
    // Find all users with the role 'teacher'
    const allTeachers = await User.find({ role: 'teacher' });

    // Find all classrooms that have an assigned teacher
    const assignedClassrooms = await Classroom.find({ assignedTeacher: { $ne: null } });

    // Extract the IDs of assigned teachers
    const assignedTeacherIds = assignedClassrooms.map(classroom => classroom.assignedTeacher.toString());

    // Filter out the assigned teachers
    const unassignedTeachers = allTeachers.filter(teacher => !assignedTeacherIds.includes(teacher._id.toString()));

    // Return only necessary information
    const teacherData = unassignedTeachers.map(teacher => ({
      _id: teacher._id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email
    }));

    console.log(teacherData);
    

    res.status(200).json(teacherData);
  } catch (error) {
    console.error('Error fetching unassigned teachers:', error);
    res.status(500).json({ message: 'Error fetching unassigned teachers', error: error.message });
  }
}

// Controller to fetch all students
export const getAllStudents = async (req, res) => {
    try {
      const students = await User.find({ role: 'student' }).select('-password');
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
  };