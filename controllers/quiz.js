/**
 * @file This will allow users to create, get, update and delete the Quizzes
 * @author Declan de Haas
 */

import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quizSchema = Joi.object({
  // This will make the user input a quiz name with only alpha letters with a min of 5 and max of 30
  name: Joi.string()
    .min(5)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  // This will make it reqire a start date
  startDate: Joi.date().min(new Date()).required(),
  // This will make it reqire a end date that is 5 days after the end date
  endDate: Joi.date()
    .min(Joi.ref("startDate"))
    .max(Joi.date().min("now").add(5, "days"))
    .required(),
  // This will make it require 10 questions
  numberOfQuestions: Joi.number().valid(10).required(),
});
// This will create a Quiz instance
const createQuiz = async (req, res) => {
  try {
    await quizSchema.validateAsync(req.body);

    const newQuizzes = await prisma.Quizzes.findMany();

    const currentDate = new Date();
    const { startDate, endDate } = req.body;

    if (currentDate < new Date(startDate) || currentDate > new Date(endDate)) {
      throw new Error("Quiz is no longer active");
    }

    return res.status(201).json({
      msg: "Quiz successfully created",
      data: newQuizzes,
    });
  } catch (err) {
    return res.status(400).json({
      msg: err.message,
    });
  }
};

// This will get all Quiz in the database
const getQuizzes = async (req, res) => {
  try {
    const Quizzes = await prisma.Quizzes.findMany();

    if (Quizzes.length === 0) {
      return res.status(404).json({ msg: "No Quizzes found" });
    }

    return res.json({ data: Quizzes });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get a Quiz instance by id
const getQuiz = async (req, res) => {
  try {
    const Quizzes = await prisma.Quizzes.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Quizzes) {
      return res
        .status(404)
        .json({ msg: `No Quizzes with the id: ${req.params.id} found` });
    }

    return res.json({
      data: Quizzes,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will update a Quiz instance by id
const updateQuiz = async (req, res) => {
  try {
    let Quizzes = await prisma.Quizzes.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Quizzes) {
      return res
        .status(404)
        .json({ msg: `No Quizzes with the id: ${req.params.id} found` });
    }

    Quizzes = await prisma.Quizzes.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Quizzes with the id: ${req.params.id} successfully updated`,
      data: Quizzes,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will delete a Quiz instance by id
const deleteQuiz = async (req, res) => {
  try {
    const Quizzes = await prisma.Quizzes.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Quizzes) {
      return res
        .status(404)
        .json({ msg: `No Quizzes with the id: ${req.params.id} found` });
    }

    await prisma.Quizzes.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Quizzes with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createQuiz, getQuizzes, getQuiz, updateQuiz, deleteQuiz };
