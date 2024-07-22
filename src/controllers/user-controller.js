const fs = require("fs/promises");

const uploadService = require("../services/upload-service");
const userService = require("../services/user-service");
const eventService = require("../services/event-service");

const userController = {};

userController.updateProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Profile image is required" });
    }
    const profileImagePath = req.file.path;
    const url = await uploadService.upload(profileImagePath);

    const data = { profileImage: url };
    await userService.updateUserById(data, req.user.id);

    res.status(200).json(data);
  } catch (err) {
    console.error("Error updating profile image:", err);
    next(err);
  } finally {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
  }
};

userController.createEvent = async (req, res, next) => {
  try {
    const eventData = req.body;
    eventData.hostId = +req.user.id;
    const result = await eventService.createEvent(eventData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

userController.getUserEvent = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const userEventData = await eventService.getEventUserById(req.user.id);
    res.status(200).json(userEventData);
  } catch (error) {
    next(error);
  }
};

userController.deleteEvent = async (req, res, next) => {
  try {
    const eventId = parseInt(req.params.id, 10); // Parses the id from the path parameters
    const userId = req.user.id; // Gets the user ID from the authenticated user
    await eventService.deleteEvent(userId, eventId);
    res.status(204).send(); // Sends a 204 No Content response
  } catch (error) {
    next(error);
  }
};

userController.getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await eventService.getAllEvents();
    res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
