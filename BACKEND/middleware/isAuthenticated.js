import jwt from "jsonwebtoken";
const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({message:"Unauthorized access, no token",success: false,});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({message:"invalid token",success: false,});
        }
        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        return res.status(500).json({message:"Invalid token",success: false,});
    }
};

export default authenticateToken;