const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = req.roles;
    /// The some() method tests whether at least one element in the array passes the test implemented by the provided function.
    const result = rolesArray.some((role) => allowedRoles.includes(role));
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
