const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('auth header:', authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token found"
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Access failed: unauthorized user'
    });
  }
};

module.exports = authMiddleware;
