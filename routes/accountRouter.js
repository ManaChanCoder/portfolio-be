import express from "express";
import {
  registerAccount,
  editPassword,
  loginAccount,
} from "../controller/user.js";

const router = express.Router();
// Register account route
router.post("/register", registerAccount);

// Edit account route can be added here in the future
router.put("/edit-password", editPassword);

// for login route
router.post("/login", loginAccount);
export default router;
