/**
 * @file This file will create the routes for UserQuestionAnswer
 * @author Declan de Haas
 */

// This import router file from the express packages
import { Router } from "express"; // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  createUserQuestionAnswer,
  getUserQuestionAnswers,
  getUserQuestionAnswer,
  updateUserQuestionAnswer,
  deleteUserQuestionAnswer,
} from "../controllers/userQuestionAnswers.js";

const router = Router();

router.route("/").get(getUserQuestionAnswers).post(createUserQuestionAnswer);
router
  .route("/:id")
  .put(updateUserQuestionAnswer)
  .delete(deleteUserQuestionAnswer)
  .get(getUserQuestionAnswer);

export default router;
