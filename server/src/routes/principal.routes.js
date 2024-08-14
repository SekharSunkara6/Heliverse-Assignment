import express from "express";
import authorizeRoles from "../middlewares/authrizeRoles.js";
import authMiddleware from "../middlewares/auth.js";
import { createStudentAccount, createTeacherAccount, getAllStudents, getAllTeachers, getUnassignedTeachers } from "../controllers/createAccountControllers.js";
import { createClassroom, getAllClassrooms } from "../controllers/classroomControllers.js";


const principalRouter = express.Router();

// /dashborad/create/
principalRouter.get("/get-all-students",authMiddleware, authorizeRoles('principal','teacher'),getAllStudents);


principalRouter.get("/get-all-teachers",authMiddleware, authorizeRoles('principal'),getAllTeachers);

principalRouter.get("/get-all-free-teachers",authMiddleware, authorizeRoles('principal'),getUnassignedTeachers);

principalRouter.get("/get-all-classrooms",authMiddleware, authorizeRoles('principal'),getAllClassrooms);


principalRouter.post("/create-teacher",authMiddleware, authorizeRoles('principal'),createTeacherAccount);

principalRouter.post("/create-student",authMiddleware, authorizeRoles('principal','teacher'),createStudentAccount);

principalRouter.post("/create-classroom",authMiddleware, authorizeRoles('principal'),createClassroom);





export default principalRouter;
