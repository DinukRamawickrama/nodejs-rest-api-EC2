const db = require("../firebase");
const User = db.collection("users");

const createNewUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400);
      return next(new Error("name & email fields are required"));
    }

    // Check if user already exists
    const userSnapshot = await User.where('email', '==', email).get();

    if (!userSnapshot.empty) {
      res.status(404);
      return next(new Error("User already exists"));
    }

    const userRef = await User.add({
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({
      success: true,
      user: { id: userRef.id, name, email },
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const userSnapshot = await User.get();
    const users = [];

    userSnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
};
