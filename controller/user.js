import { Account } from "../model/accountSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAccount = async (req, res) => {
  const { username, password, role, email } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({
      success: false,
      message: "Username, password, role, and email are required",
    });
  }
  const userData = {
    username: username,
    password: password,
    role: role,
    email: email,
  };

  try {
    const newUser = await Account.create(userData);

    const token = jwt.sign(
      { id: newUser._id }, // payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } //1 day expiration
    );

    res.status(201).json({
      success: true,
      message: "Account registered successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// edit password
export const editPassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// login
export const loginAccount = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    // find user by username
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id }, // payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } //1 day expiration
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.username,
      token: token,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// not necessary for now!
// export const forgotPassword = async (req, res) => {
//   const { gmail, newPassword } = req.body

//   if(!gmail || !newPassword){
//     return res.status(400).json({
//       success: false,
//       message: "Gmail and new password are required"
//     })
//   }

//   try {

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Internal server error: ${error.message}`
//     })
//   }
// }
