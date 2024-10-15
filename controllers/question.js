/**
 * @file This will allow users to create, get, update and delete the Questions
 * @author Declan de Haas
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This will create a Question instance
const createQuestion = async (req, res) => {
  try {
    await prisma.Question.create({
      data: { ...req.body },
    });

    const newQuestion = await prisma.Question.findMany();

    return res.status(201).json({
      msg: "Question successfully created",
      data: newQuestion,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get all Question in the database
const getQuestions = async (req, res) => {
  try {
    const Question = await prisma.Question.findMany();

    if (Question.length === 0) {
      return res.status(404).json({ msg: "No Question found" });
    }

    return res.json({ data: Question });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get a Question instance by id
const getQuestion = async (req, res) => {
  try {
    const Question = await prisma.Question.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Question) {
      return res
        .status(404)
        .json({ msg: `No Question with the id: ${req.params.id} found` });
    }

    return res.json({
      data: Question,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will update a Question instance by id
const updateQuestion = async (req, res) => {
  try {
    let Question = await prisma.Question.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Question) {
      return res
        .status(404)
        .json({ msg: `No Question with the id: ${req.params.id} found` });
    }

    Question = await prisma.Question.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Question with the id: ${req.params.id} successfully updated`,
      data: Question,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will delete a Question instance by id
const deleteQuestion = async (req, res) => {
  try {
    const Question = await prisma.Question.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Question) {
      return res
        .status(404)
        .json({ msg: `No Question with the id: ${req.params.id} found` });
    }

    await prisma.Question.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Question with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
