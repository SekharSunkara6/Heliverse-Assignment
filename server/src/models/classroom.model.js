import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      schedule: [{
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          required: true
        },
        startTime: {
          type: String,
          required: true
        },
        endTime: {
          type: String,
          required: true
        }
      }],
      enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
      assignedTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
},{timestamps: true})


export const Classroom = mongoose.model("Classroom",classroomSchema)