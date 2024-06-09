const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;

    // Check if character name or email already exists
    const existUser = await userService.findUserByCharacterNameOrEmail(data.characterName);
    if (existUser) {
      return next(
        createError({
          message: 'Character name already in use',
          statusCode: 400,
          field: 'characterName',
        })
      );
    }

    const existUserByEmail = await userService.findUserByCharacterNameOrEmail(data.email);
    if (existUserByEmail) {
      return next(
        createError({
          message: 'Email already in use',
          statusCode: 400,
          field: 'email',
        })
      );
    }

    // Hash the password
    data.password = await hashService.hash(data.password);
    // Create the user
    await userService.createUser(data);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByCharacterNameOrEmail(
      req.input.characterNameOrEmail
    );
    if (!existUser) {
      return next(
        createError({
          message: 'invalid credentials',
          statusCode: 400,
        })
      );
    }

    const isMatch = await hashService.compare(req.input.password, existUser.password);
    if (!isMatch) {
      return next(
        createError({
          message: 'invalid credentials',
          statusCode: 400,
        })
      );
    }

    res.status(200).json({ message: 'Login Successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
