/**
 * @file This will allow users to create, get, update and delete the UserParticipationQuiz
 * @author Declan de Haas
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This will create a UserParticipationQuiz instance
const createUserParticipationQuiz = async (req, res) => {
  try {
    await prisma.UserParticipationQuiz.create({
      data: { ...req.body },
    });

    const newUserParticipationQuiz =
      await prisma.UserParticipationQuiz.findMany();

    return res.status(201).json({
      msg: "UserParticipationQuiz successfully created",
      data: newUserParticipationQuiz,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get all UserParticipationQuiz in the database
const getUserParticipationQuizzes = async (req, res) => {
  try {
    const UserParticipationQuiz = await prisma.UserParticipationQuiz.findMany();

    if (UserParticipationQuiz.length === 0) {
      return res.status(404).json({ msg: "No UserParticipationQuiz found" });
    }

    return res.json({ data: UserParticipationQuiz });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get a UserParticipationQuiz instance by id
const getUserParticipationQuiz = async (req, res) => {
  try {
    const UserParticipationQuiz = await prisma.UserParticipationQuiz.findUnique(
      {
        where: { id: Number(req.params.id) },
      },
    );

    if (!UserParticipationQuiz) {
      return res.status(404).json({
        msg: `No UserParticipationQuiz with the id: ${req.params.id} found`,
      });
    }

    return res.json({
      data: UserParticipationQuiz,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will update a UserParticipationQuiz instance by id
const updateUserParticipationQuiz = async (req, res) => {
  try {
    let UserParticipationQuiz = await prisma.UserParticipationQuiz.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!UserParticipationQuiz) {
      return res.status(404).json({
        msg: `No UserParticipationQuiz with the id: ${req.params.id} found`,
      });
    }

    UserParticipationQuiz = await prisma.UserParticipationQuiz.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `UserParticipationQuiz with the id: ${req.params.id} successfully updated`,
      data: UserParticipationQuiz,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will delete a UserParticipationQuiz instance by id
const deleteUserParticipationQuiz = async (req, res) => {
  try {
    const UserParticipationQuiz = await prisma.UserParticipationQuiz.findUnique(
      {
        where: { id: Number(req.params.id) },
      },
    );

    if (!UserParticipationQuiz) {
      return res.status(404).json({
        msg: `No UserParticipationQuiz with the id: ${req.params.id} found`,
      });
    }

    await prisma.UserParticipationQuiz.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `UserParticipationQuiz with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createUserParticipationQuiz,
  getUserParticipationQuizzes,
  getUserParticipationQuiz,
  updateUserParticipationQuiz,
  deleteUserParticipationQuiz,
};
