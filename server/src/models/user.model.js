import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      role: {
        type: String,
        required: true,
        enum: ['principal', 'teacher', 'student']
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      }
},{timestamps: true})


export const User = mongoose.model("User",userSchema); 