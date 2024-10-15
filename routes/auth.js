/**
 * @file This file will create the routes for auth
 * @author Declan de Haas
 */

import { Router } from "express";

import { register, login } from "../controllers/auth.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
