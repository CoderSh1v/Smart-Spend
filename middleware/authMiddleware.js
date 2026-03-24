import "dotenv/config";

import jwt from "jsonwebtoken";

export function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  // 1. Check header Validation
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
          success: false,
          message: "Token Not found"
        });
    }
    
    // 2. Extract token
    const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);

    // 4. Attach identity
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    // 5. Invalid or expired token
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
}
