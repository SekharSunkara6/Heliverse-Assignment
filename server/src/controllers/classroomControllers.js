import { User } from "../models/user.model.js";
import { Classroom } from "../models/classroom.model.js";

export const createClassroom = async (req, res) => {
  try {
    const { name, schedule, assignedTeacher } = req.body;

    // Validate input
    if (!name || !schedule || schedule.length === 0) {
      return res.status(400).json({ message: 'Name and schedule are required' });
    }

    // Check if the assigned teacher exists and is a teacher
    if (assignedTeacher) {
      const teacher = await User.findOne({ _id: assignedTeacher, role: 'teacher' });
      if (!teacher) {
        return res.status(400).json({ message: 'Invalid teacher assigned' });
      }
    }

    // Create new classroom
    const newClassroom = new Classroom({
      name,
      schedule,
      assignedTeacher
    });

    await newClassroom.save();

    res.status(201).json({ message: 'Classroom created successfully', classroom: newClassroom });
  } catch (error) {
    console.error('Error creating classroom:', error);
    res.status(500).json({ message: 'Error creating classroom', error: error.message });
  }
};

export const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('assignedTeacher', 'firstName lastName');
    res.status(200).json(classrooms);
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ message: 'Error fetching classrooms', error: error.message });
  }
};

export const getTeacherClassroom = async (req,res) => {
  try {

    const teacherId = req.user.userId;
    // console.log(teacherId);
    

    const classroom = await Classroom.findOne({ assignedTeacher: teacherId })
      .select('-enrolledStudents -__v');

    if (!classroom) {
      return res.status(404).json({ message: 'No classroom assigned to this teacher' });
    }
console.log(classroom);

    res.status(200).json(classroom);
  } catch (error) {
    console.error('Error fetching teacher\'s classroom:', error);
    res.status(500).json({ message: 'Error fetching classroom', error: error.message });
  }
};