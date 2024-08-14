import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../models/user.model.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
        
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2d' } // Token expires in 1 day
    );

    // Set HTTP-only cookie with the token
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000  // 1 day
    });

    // Send response
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

