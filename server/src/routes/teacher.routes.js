import express from "express";
import authorizeRoles from "../middlewares/authrizeRoles.js";
import authMiddleware from "../middlewares/auth.js";
import { getTeacherClassroom } from "../controllers/classroomControllers.js";
import { getStudentsFromSameClassroom } from "../controllers/studentsControllers.js";


const teacherRouter = express.Router();

teacherRouter.get('/myclassroom',authMiddleware,authorizeRoles('teacher'),getTeacherClassroom)

teacherRouter.get('/mystudents',authMiddleware,authorizeRoles('teacher'),getStudentsFromSameClassroom)

export default teacherRouter;
