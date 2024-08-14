import { User } from "../models/user.model.js";
import { Classroom } from "../models/classroom.model.js";

export const getStudentsFromSameClassroom = async (req,res) => {
    try {
        const teacherId = req.user.userId;
    
        // First, find the classroom assigned to the teacher
        const classroom = await Classroom.findOne({ assignedTeacher: teacherId });
    
        if (!classroom) {
          return res.status(404).json({ message: 'No classroom assigned to this teacher' });
        }
    
        // Then, fetch the students enrolled in this classroom
        const students = await User.find({
          _id: { $in: classroom.enrolledStudents },
          role: 'student'
        }).select('firstName lastName email -_id');

        console.log(students);
        
    
        res.status(200).json(students);
      } catch (error) {
        console.error('Error fetching teacher\'s students:', error);
        res.status(500).json({ message: 'Error fetching students', error: error.message });
      }
}


// for students 
export const getMyAllClassroom = async (req,res) => {
  try {
    const studentID = req.user.userId;

    const classrooms = await Classroom.find({ enrolledStudents: studentID });

    if (!classrooms) {
      return res.status(404).json({ message: 'Not enrolled in any Classroom.' });
    }

    console.log(classrooms);
    res.status(200).json(classrooms);


  } catch (error) {
    console.error('Error fetching student\'s classrooms:', error);
    res.status(500).json({ message: 'Error fetching classrooms', error: error.message });
  }
}