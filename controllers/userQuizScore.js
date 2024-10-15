/**
 * @file This will allow users to create, get, update and delete the UserQuizScores
 * @author Declan de Haas
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This will create a UserQuizScore instance
const createUserQuizScore = async (req, res) => {
  try {
    await prisma.UserQuizScore.create({
      data: { ...req.body },
    });

    const newUserQuizScore = await prisma.UserQuizScore.findMany();

    return res.status(201).json({
      msg: "UserQuizScore successfully created",
      data: newUserQuizScore,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get all UserQuizScore in the database
const getUserQuizScores = async (req, res) => {
  try {
    const UserQuizScore = await prisma.UserQuizScore.findMany();

    if (UserQuizScore.length === 0) {
      return res.status(404).json({ msg: "No UserQuizScore found" });
    }

    return res.json({ data: UserQuizScore });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get a UserQuizScoreinstance by id
const getUserQuizScore = async (req, res) => {
  try {
    const UserQuizScore = await prisma.UserQuizScore.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!UserQuizScore) {
      return res
        .status(404)
        .json({ msg: `No UserQuizScore with the id: ${req.params.id} found` });
    }

    return res.json({
      data: UserQuizScore,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will update a UserQuizScore instance by id
const updateUserQuizScore = async (req, res) => {
  try {
    let UserQuizScore = await prisma.UserQuizScore.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!UserQuizScore) {
      return res
        .status(404)
        .json({ msg: `No UserQuizScore with the id: ${req.params.id} found` });
    }

    UserQuizScore = await prisma.UserQuizScore.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `UserQuizScore with the id: ${req.params.id} successfully updated`,
      data: UserQuizScore,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will delete a UserQuizScore instance by id
const deleteUserQuizScore = async (req, res) => {
  try {
    const UserQuizScore = await prisma.UserQuizScore.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!UserQuizScore) {
      return res
        .status(404)
        .json({ msg: `No UserQuizScore with the id: ${req.params.id} found` });
    }

    await prisma.UserQuizScore.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `UserQuizScore with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createUserQuizScore,
  getUserQuizScores,
  getUserQuizScore,
  updateUserQuizScore,
  deleteUserQuizScore,
};
