/**
 * @file This file will create the routes for Questions
 * @author Declan de Haas
 */

// This import router file from the express packages
import { Router } from "express"; // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.js";

const router = Router();

router.route("/").get(getQuestions).post(createQuestion);
router
  .route("/:id")
  .put(updateQuestion)
  .delete(deleteQuestion)
  .get(getQuestion);

export default router;
