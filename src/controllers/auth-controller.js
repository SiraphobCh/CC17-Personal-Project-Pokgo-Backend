const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input; // Using req.input

    // Check if character name or email already exists
    const [existUserByCharacterName, existUserByEmail] = await Promise.all([
      userService.findUserByCharacterName(data.characterName),
      userService.findUserByEmail(data.email),
    ]);

    if (existUserByCharacterName) {
      return next(
        createError({
          message: 'Character name already in use',
          statusCode: 400,
          field: 'characterName',
        })
      );
    }

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

module.exports = authController;
