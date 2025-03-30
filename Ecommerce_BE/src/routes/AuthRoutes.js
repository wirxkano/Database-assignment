import express from "express";
import passport from "../config/passport";

const router = express.Router();

// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/register",
    failureMessage: true,
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect("http://localhost:5173/register");
    }
    res.redirect("http://localhost:5173");
  }
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;
