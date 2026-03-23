import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token;
  
  if(req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    const error = new Error("Not authorized, no token");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

export default protect;
