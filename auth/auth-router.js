const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const {
  generateToken,
  restrictedUser,
} = require("../middlware/global-middleware");

router.post("/register", (req, res, next) => {
  const credentials = req.body;
  hashedPassword = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hashedPassword;
  Users.registerUser(credentials)
    .then((user) => {
      const token = generateToken(user);
      res.json({ user, token });
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  Users.loginUser({ username: credentials.username })
    .then((user) => {
      const token = generateToken(user);

      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        res.cookie("token", token);
        res.json({ success: `welcome ${user.username} have a token!`, token });
      } else {
        res.json({ message: "please validate login" });
      }
    })
    .catch((err) => next(err));
});

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token").end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
