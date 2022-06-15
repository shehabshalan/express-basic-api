const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // is refreshToken in usersDB.users?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // remove refreshToken from usersDB.users
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = {
    ...foundUser,
    refreshToken: "",
  };
  usersDB.setUsers([...otherUsers, currentUser]);
  // save usersDB.users to file
  const filePath = path.join(__dirname, "../model/users.json");
  await fsPromises.writeFile(filePath, JSON.stringify(usersDB.users));
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204);
};

module.exports = { handleLogout };
