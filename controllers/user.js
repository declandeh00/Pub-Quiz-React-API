/**
 * @file This will allow users to create, get, update and delete the Users
 * @author Declan de Haas
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This will create a User instance
const createUser = async (req, res) => {
  try {
    await prisma.User.create({
      data: { ...req.body },
    });

    const newUser = await prisma.User.findMany();

    return res.status(201).json({
      msg: "User successfully created",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get all User in the database
const getUsers = async (req, res) => {
  try {
    const User = await prisma.User.findMany();

    if (User.length === 0) {
      return res.status(404).json({ msg: "No User found" });
    }

    return res.json({ data: User });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get a User instance by id
const getUser = async (req, res) => {
  try {
    const User = await prisma.User.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!User) {
      return res
        .status(404)
        .json({ msg: `No User with the id: ${req.params.id} found` });
    }

    return res.json({
      data: User,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will update a User instance by id
const updateUser = async (req, res) => {
  try {
    let User = await prisma.User.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!User) {
      return res
        .status(404)
        .json({ msg: `No User with the id: ${req.params.id} found` });
    }

    User = await prisma.User.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `User with the id: ${req.params.id} successfully updated`,
      data: User,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will delete a User instance by id
const deleteUser = async (req, res) => {
  try {
    const User = await prisma.User.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!User) {
      return res
        .status(404)
        .json({ msg: `No User with the id: ${req.params.id} found` });
    }

    await prisma.User.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `User with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
