const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/global-middleware");

router.post("/register", (req, res, next) => {});

router.post("/login", (req, res, next) => {});

module.exports = router;
