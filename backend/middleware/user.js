const jwt = require("jsonwebtoken");
const JWT_LOGIN = "njkdnakjs-dd99asd-asdasd98avbbgnswrgs88";

function userMiddleware(req, res, next) {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res.status(401).json({ redirectTo: "/signin" });
    }

    const decodedToken = jwt.verify(token, JWT_LOGIN);
    req.data = decodedToken.id;

    if (req.originalUrl === "/signup" || req.originalUrl === "/signin") {
      return res.status(403).json({ redirectTo: "/dashboard" });
    }

    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);

    return res.status(401).json({ redirectTo: "/signin" });
  }
}

module.exports = userMiddleware;
