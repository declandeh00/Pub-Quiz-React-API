/**
 * @file This file will seed data to the database
 * @author Declan de Haas
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    // Will create these bit of data
    await prisma.user.createMany({
      data: [
        {
          email: "johndoe123@email.com",
          firstName: "John",
          lastName: "Doe",
          password: "P@ssw0rd",
          avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=JohnDoe",
          username: "johndoe123",
          role: "SUPER_ADMIN_USER",
        },
        {
          email: "janedoe01@email.com",
          firstName: "Jane",
          lastName: "Doe",
          password: "Eevee01!",
          avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=JaneDoe",
          username: "janedoe01",
          role: "SUPER_ADMIN_USER",
        },
        {
          email: "Lilo2002@email.com",
          firstName: "Lilo",
          lastName: "Pelekai",
          password: "LiloRulz02!",
          avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=LiloPelekai",
          username: "Lilo2002",
          role: "SUPER_ADMIN_USER",
        },
        {
          email: "nanip57@email.com",
          firstName: "Nani",
          lastName: "Pelekai",
          password: "J7m#p9@L!s2",
          avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=NaniPelekai",
          username: "nanip57",
          role: "SUPER_ADMIN_USER",
        },
        {
          email: "exp626@email.com",
          firstName: "Jumba",
          lastName: "Jookiba",
          password: "Experiment626!",
          avatar:
            "https://api.dicebear.com/7.x/pixel-art/svg?seed=JumbaJookiba",
          username: "exp626",
          role: "SUPER_ADMIN_USER",
        },
      ],
    });

    console.log("Database successfully seeded");

    await prisma.$disconnect(); // Disconnect from the database
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1); // Exit the process
  }
};

main();
