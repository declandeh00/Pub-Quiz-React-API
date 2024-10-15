/**
 * @file This file will create the routes for Quizzes
 * @author Declan de Haas
 */

// This import router file from the express packages
import { Router } from "express"; // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.js";

const router = Router();

router.route("/").get(getQuizzes).post(createQuiz);
router.route("/:id").put(updateQuiz).delete(deleteQuiz).get(getQuiz);

export default router;
