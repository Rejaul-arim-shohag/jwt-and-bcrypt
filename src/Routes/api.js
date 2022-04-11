const express = require('express');
const router = express.Router();
const usersController = require("../Controllers/usersController");
const checkLogin = require("../Middleware/checkLogin")
//all routes endpoint
router.post("/insertUser", usersController.userInsert);
router.get("/readData",checkLogin, usersController.readData)
router.get("/userLogin", usersController.loginUser)

module.exports = router;