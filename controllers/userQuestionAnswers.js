/**
 * @file This will allow users to create, get, update and delete the UserQuestionAnswer
 * @author Declan de Haas
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This will create a UserQuestionAnswer instance
const createUserQuestionAnswer = async (req, res) => {
  try {
    await prisma.UserQuestionAnswer.create({
      data: { ...req.body },
    });

    const newUserQuestionAnswer = await prisma.UserQuestionAnswer.findMany();

    return res.status(201).json({
      msg: "UserQuestionAnswer successfully created",
      data: newUserQuestionAnswer,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will create a UserQuestionAnswer instance
const getUserQuestionAnswers = async (req, res) => {
  try {
    const UserQuestionAnswer = await prisma.UserQuestionAnswer.findMany();

    if (UserQuestionAnswer.length === 0) {
      return res.status(404).json({ msg: "No UserQuestionAnswer found" });
    }

    return res.json({ data: UserQuestionAnswer });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get a UserQuestionAnswer instance by id
const getUserQuestionAnswer = async (req, res) => {
  try {
    const UserQuestionAnswer = await prisma.UserQuestionAnswer.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!UserQuestionAnswer) {
      return res.status(404).json({
        msg: `No UserQuestionAnswer with the id: ${req.params.id} found`,
      });
    }

    return res.json({
      data: UserQuestionAnswer,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will update a UserQuestionAnswer instance by id
const updateUserQuestionAnswer = async (req, res) => {
  try {
    let UserQuestionAnswer = await prisma.UserQuestionAnswer.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!UserQuestionAnswer) {
      return res.status(404).json({
        msg: `No UserQuestionAnswer with the id: ${req.params.id} found`,
      });
    }

    UserQuestionAnswer = await prisma.UserQuestionAnswer.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `UserQuestionAnswer with the id: ${req.params.id} successfully updated`,
      data: UserQuestionAnswer,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will delete a UserQuestionAnswer instance by id
const deleteUserQuestionAnswer = async (req, res) => {
  try {
    const UserQuestionAnswer = await prisma.UserQuestionAnswer.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!UserQuestionAnswer) {
      return res.status(404).json({
        msg: `No UserQuestionAnswer with the id: ${req.params.id} found`,
      });
    }

    await prisma.UserQuestionAnswer.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `UserQuestionAnswer with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createUserQuestionAnswer,
  getUserQuestionAnswers,
  getUserQuestionAnswer,
  updateUserQuestionAnswer,
  deleteUserQuestionAnswer,
};
