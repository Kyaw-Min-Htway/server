const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
        error: true,
      });
    }

    // Check if email is already in use
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Prepare user payload
    const userPayload = {
      name,
      email,
      profile_pic: profile_pic || "", // Default to an empty string if not provided
      password: hashedPassword,
    };

    // Save user to the database
    const newUser = new UserModel(userPayload);
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: savedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
    });
  }
}

module.exports = registerUser;
