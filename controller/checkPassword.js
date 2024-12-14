const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body;

        // Fetch user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
            });
        }

        // Verify password
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return response.status(400).json({
                message: "Please check password",
                error: true,
            });
        }

        // Prepare token data
        const tokenData = {
            id: user._id,
            email: user.email,
        };

        // Ensure the secret key is retrieved correctly
        const secretKey = process.env.JWT_SECRET_KEY; // Fix the typo in the key name

        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        // Generate JWT
        const token = jwt.sign(tokenData, secretKey, { expiresIn: "1d" });

        // Cookie options
        const cookieOptions = {
            httpOnly: true, // Fix `http` to `httpOnly`
            secure: process.env.NODE_ENV === "production", // Use `secure` in production
        };

        // Set cookie and send response
        return response
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                message: "Login successfully",
                token: token,
                success: true,
            });

    } catch (error) {
        // Handle errors
        return response.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
}

module.exports = checkPassword;
