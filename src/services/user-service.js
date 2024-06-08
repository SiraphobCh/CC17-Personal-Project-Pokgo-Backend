const prisma = require('../models/prisma');

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByCharacterName = (characterName) =>
  prisma.user.findFirst({
    where: { characterName },
  });
userService.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: { email },
  });

module.exports = userService;
