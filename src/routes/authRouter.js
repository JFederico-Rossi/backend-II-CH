import { Router } from "express";
import passport from "passport";
import authController from "../controllers/authController.js";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/login-error",
  }),
  authController.login
);

router.get("/login-error", authController.loginError);

router.post("/register", authController.register);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  authController.current
);

router.get("/logout", authController.logout);

export default router;
