const express = require("express");
const { createNewUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

// Create a user
router.post("/", createNewUser);
// Get all users
router.get("/", getAllUsers);

module.exports = router;
