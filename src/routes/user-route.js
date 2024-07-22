const express = require("express");
const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");
const { validateUpdateProfile } = require("../middlewares/validator");

const userRouter = express.Router();

userRouter.post("/create-event", userController.createEvent);
userRouter.get("/event", userController.getUserEvent);
userRouter.delete("/delete-event/:id", userController.deleteEvent);
userRouter.patch(
  "/",
  upload.single("profileImage"),
  validateUpdateProfile,
  userController.updateProfileImage
);
userRouter.get("/all-event", userController.getAllEvents);

module.exports = userRouter;
