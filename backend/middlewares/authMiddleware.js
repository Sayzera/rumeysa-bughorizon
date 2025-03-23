import { verifyToken } from "../utils/jwtUtils.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    res.status(403).json({
      message: "Token bulunamadı",
    });
  }

  if (!verifyToken(token)) {
    res.status(401).json({
      message: "Token geçersiz",
    });
  }

  next();
};

export default authMiddleware;
