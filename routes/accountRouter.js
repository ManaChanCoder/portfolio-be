import express from "express";
import {
  registerAccount,
  editPassword,
  loginAccount,
  contactFormEmail,
} from "../controller/user.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();
// Register account route
router.post("/register", registerAccount);

// Edit account route can be added here in the future
router.put("/edit-password", editPassword);

// for login route
router.post("/login", loginAccount);

// contact form (public)
router.post("/contact", contactFormEmail);

router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    success: true,
    username: req.user.username,
  });
});

export default router;
