/**
 * @file Will allow users to be created and login
 * @author Declan de Haas
 */

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = Joi.object({
  // This makes sure that first name has a minimum length of two characters,
  // a maximum length of 50 characters and alpha characters only
  firstName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  // This makes sure that last name has a minimum length of two characters,
  // a maximum length of 50 characters and alpha characters only
  lastName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  // this creates a username with a min of 5 and a max of 10 characters
  username: Joi.string().alphanum().min(5).max(10).required(),
  // This makes sure tht there is a email
  email: Joi.string().email().required(),
  // This makes sure that a Password has a minimum length of eight characters,
  // maximum length of 16 characters and contains one numeric character and one special character
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
    .required(),
  // This make the user put in the password twice
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

// allows the user to be created
const register = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { username, email, password, firstName, lastName, role } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }

    /**
     * A salt is random bits added to a password before it is hashed. Salts
     * create unique passwords even if two UserParticipationQuiz have the same passwords
     */
    const salt = await bcryptjs.genSalt();

    /**
     * Generate a hash for a given string. The first argument
     * is a string to be hashed, i.e., Pazzw0rd123 and the second
     * argument is a salt, i.e., E1F53135E559C253
     */
    const hashedPassword = await bcryptjs.hash(password, salt);

    user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        role,
        password: hashedPassword,
        create: {
          avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${firstName}${lastName}`,
          email: `${username}@email.com`,
        },
      },
    });

    /**
     * Delete the password property from the user object. It
     * is a less expensive operation than querying the User
     * table to get only user's email and name
     */
    delete user.password;

    return res.status(201).json({
      msg: "User successfully registered",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// allows the user to login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ msg: "Invalid username" });
    }

    /**
     * Compare the given string, i.e., Pazzw0rd123, with the given
     * hash, i.e., user's hashed password
     */
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    /**
     * Return a JWT. The first argument is the payload, i.e., an object containing
     * the authenticated user's id and name, the second argument is the secret
     * or public/private key, and the third argument is the lifetime of the JWT
     */
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME },
    );

    return res.status(200).json({
      msg: "User successfully logged in",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { register, login };
