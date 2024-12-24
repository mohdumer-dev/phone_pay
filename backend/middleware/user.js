const jwt = require("jsonwebtoken");
const JWT_LOGIN = "njkdnakjs-dd99asd-asdasd98avbbgnswrgs88";

function userMiddleware(req, res, next) {
  // Token from either localstorage or cookie
  const token = req.headers['token']
  if (!token) {
    return res.status(401).json({ msg: "Token is required for authentication" });
  }
  const decodedToken = jwt.verify(token, JWT_LOGIN);
  req.data=decodedToken.id
  next()
}

module.exports = userMiddleware;
