const prisma = require('../models/prisma');

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByCharacterNameOrEmail = (characterNameOrEmail) =>
  prisma.user.findFirst({
    where: {
      OR: [{ characterName: characterNameOrEmail }, { email: characterNameOrEmail }],
    },
  });

module.exports = userService;
