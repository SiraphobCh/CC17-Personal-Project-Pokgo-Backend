const express = require("express");
const eventController = require("../controllers/even-controller");

const eventRouter = express.Router();

eventRouter.post("/join-event/:eventId", eventController.joinEvent);
eventRouter.patch("/cancel-event/:eventId", eventController.cancelEvent);
eventRouter.get("/event-relation", eventController.getEventRelation);

module.exports = eventRouter;
