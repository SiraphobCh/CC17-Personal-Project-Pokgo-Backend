const eventService = require("../services/event-service");

const eventController = {};

eventController.joinEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    await eventService.joinEvent(userId, parseInt(eventId, 10));

    res.status(200).json({ message: "User successfully joined the event" });
  } catch (error) {
    next(error);
  }
};

eventController.cancelEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    await eventService.cancelEvent(userId, parseInt(eventId, 10));

    res.status(200).json({ message: "User successfully canceled the event participation" });
  } catch (error) {
    next(error);
  }
};

eventController.getEventRelation = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "Ok" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = eventController;
