const prisma = require('../models/prisma');

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByCharacterNameOrEmail = (characterNameOrEmail) =>
  prisma.user.findFirst({
    where: {
      OR: [{ characterName: characterNameOrEmail }, { email: characterNameOrEmail }],
    },
  });

userService.findUserById = (userId) => prisma.user.findUnique({ where: { id: userId } });

module.exports = userService;
