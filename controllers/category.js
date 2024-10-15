/**
 * @file This will allow users to create, get, update and delete the categories
 * @author Declan de Haas
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This will create a category instance
const createCategory = async (req, res) => {
  try {
    await prisma.Category.create({
      data: { ...req.body },
    });

    const newCategory = await prisma.Category.findMany();

    return res.status(201).json({
      msg: "Category successfully created",
      data: newCategory,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will create a category instance
const getCategories = async (req, res) => {
  try {
    const Category = await prisma.Catogory.findMany();

    if (Category.length === 0) {
      return res.status(404).json({ msg: "No Category found" });
    }

    return res.json({ data: Category });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will get a category instance by id
const getCategory = async (req, res) => {
  try {
    const Category = await prisma.Category.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Category) {
      return res
        .status(404)
        .json({ msg: `No Category with the id: ${req.params.id} found` });
    }

    return res.json({
      data: Category,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will update a category instance by id
const updateCategory = async (req, res) => {
  try {
    let Category = await prisma.Category.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Category) {
      return res
        .status(404)
        .json({ msg: `No Category with the id: ${req.params.id} found` });
    }

    Category = await prisma.Category.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Category with the id: ${req.params.id} successfully updated`,
      data: Category,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// This will delete a category instance by id
const deleteCategory = async (req, res) => {
  try {
    const Category = await prisma.Category.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!Category) {
      return res
        .status(404)
        .json({ msg: `No Category with the id: ${req.params.id} found` });
    }

    await prisma.Category.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Category with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
