import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const token = req.cookies.auth_token;

    // console.log(token);
    

    if(!token){
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        // console.log(decoded);
        
        req.user = {
            userId: decoded.userId,
            role: decoded.role
          };

          next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;