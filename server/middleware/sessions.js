// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.admin === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
};

export { isAdmin, isAuthenticated };
