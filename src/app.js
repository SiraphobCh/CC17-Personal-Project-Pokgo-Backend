require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth-route");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/not-found");
const authenticate = require("./middlewares/authenticate");
const userRouter = require("./routes/user-route");
const eventRouter = require("./routes/event-route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", authenticate, userRouter);
app.use("/event", authenticate, eventRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`This server is running on port: ${PORT}`));
