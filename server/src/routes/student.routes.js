import express from "express";
import authorizeRoles from "../middlewares/authrizeRoles.js";
import authMiddleware from "../middlewares/auth.js";
import { getMyAllClassroom, getStudentsFromSameClassroom } from "../controllers/studentsControllers.js";


const studentRouter = express.Router()

studentRouter.get('/classmates',authMiddleware,authorizeRoles('student'),getStudentsFromSameClassroom);

studentRouter.get('/myclassrooms',authMiddleware,authorizeRoles('student'),getMyAllClassroom);



export default studentRouter;