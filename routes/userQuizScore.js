/**
 * @file This file will create the routes for UserQuizScore
 * @author Declan de Haas
 */

// This import router file from the express packages
import { Router } from "express"; // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  createUserQuizScore,
  getUserQuizScores,
  getUserQuizScore,
  updateUserQuizScore,
  deleteUserQuizScore,
} from "../controllers/userQuizScore.js";

const router = Router();

router.route("/").get(getUserQuizScores).post(createUserQuizScore);
router
  .route("/:id")
  .put(updateUserQuizScore)
  .delete(deleteUserQuizScore)
  .get(getUserQuizScore);

export default router;
