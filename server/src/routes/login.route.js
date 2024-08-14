import express from "express"
import { loginController } from "../controllers/loginController.js" 


const loginRouter = express.Router()

loginRouter.post("/login", loginController);

loginRouter.post('/logout',  (req, res) => {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });


export default loginRouter;