/**
 * @file This file will create the routes for UserParticipationQuiz
 * @author Declan de Haas
 */

// This import router file from the express packages
import { Router } from "express"; // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  createUserParticipationQuiz,
  getUserParticipationQuizzes,
  getUserParticipationQuiz,
  updateUserParticipationQuiz,
  deleteUserParticipationQuiz,
} from "../controllers/userParticipationQuiz.js";

const router = Router();

router
  .route("/")
  .get(getUserParticipationQuizzes)
  .post(createUserParticipationQuiz);
router
  .route("/:id")
  .put(updateUserParticipationQuiz)
  .delete(deleteUserParticipationQuiz)
  .get(getUserParticipationQuiz);

export default router;
