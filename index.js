/**
 * @file The index file that will run the api
 * @author Declan de Haas
 */

// Import the Express module
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Import the index routes module
import auth from "./routes/v1/auth.js";
import authRoute from "./middleware/authRoute.js";
// import User from "./controllers/user.js";
import Category from "./routes/category.js";
import Question from "./routes/question.js";
import Quiz from "./routes/quiz.js";
import UserParticipationQuiz from "./routes/userParticipationQuiz.js";
import UserQuestionAnswers from "./routes/userQuestionAnswers.js";
import UserQuizScore from "./routes/userQuizScore.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Create an Express application
const app = express();
const BASE_URL = "api";
const CURRENT_VERSION = "v1";

app.use(cors());
app.use(helmet());
app.use(limiter);

// Use the routes module
app.use(`/${BASE_URL}/${CURRENT_VERSION}/auth`, auth);
app.use(`/${BASE_URL}/${CURRENT_VERSION}/categories`, authRoute, Category);
app.use(`/${BASE_URL}/${CURRENT_VERSION}/questions`, authRoute, Question);
app.use(`/${BASE_URL}/${CURRENT_VERSION}/quizzes`, authRoute, Quiz);
app.use(
  `/${BASE_URL}/${CURRENT_VERSION}/userparticipationquizzes`,
  authRoute,
  UserParticipationQuiz,
);
app.use(
  `/${BASE_URL}/${CURRENT_VERSION}/userquestionanswers`,
  authRoute,
  UserQuestionAnswers,
);
app.use(
  `/${BASE_URL}/${CURRENT_VERSION}/userquizscores`,
  authRoute,
  UserQuizScore,
);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;
