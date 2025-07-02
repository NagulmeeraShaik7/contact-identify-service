import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import identifyRouter from "./apps/routers/contact.route";
import errorMiddleware from "./middlewares/error.middleware";
import { setupSwagger, swaggerSpec } from "./infrastructure/swaggerConfig";
import { APP_CONSTANTS } from "./infrastructure/constants";

/**
 * Initializes environment variables from the .env file.
 */
dotenv.config();

/**
 * The main Express application instance.
 */
const app = express();

/**
 * Middleware to parse incoming JSON request bodies.
 */
app.use(express.json());

/**
 * Mounts the contact identification router.
 */
app.use(APP_CONSTANTS.ROUTES.API_PREFIX, identifyRouter);

/**
 * Sets up Swagger UI for API documentation.
 */
setupSwagger(app);

/**
 * Serves the raw Swagger specification JSON.
 */
app.get(APP_CONSTANTS.ROUTES.SWAGGER_JSON, (_req, res) => {
  res.status(APP_CONSTANTS.HTTP_STATUS.OK).json(swaggerSpec);
});

/**
 * Mounts the error-handling middleware.
 */
app.use(errorMiddleware);

/**
 * Retrieves MongoDB URI from environment variables.
 */
const mongoUri = process.env[APP_CONSTANTS.ENV.MONGO_URI_KEY];

/**
 * Throws error if Mongo URI is missing.
 */
if (!mongoUri) {
  throw new Error(APP_CONSTANTS.ERROR_MESSAGES.MONGO_URI_NOT_DEFINED);
}

/**
 * Connects to MongoDB and starts the server.
 */
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(APP_CONSTANTS.LOGS.MONGO_CONNECTED);

    const port = process.env[APP_CONSTANTS.ENV.PORT_KEY] || APP_CONSTANTS.DEFAULTS.PORT;
    app.listen(port, () =>
      console.log(`${APP_CONSTANTS.LOGS.SERVER_RUNNING_AT} ${APP_CONSTANTS.URL.HOST}:${port}`)
    );
  })
  .catch((err) => console.error(APP_CONSTANTS.LOGS.MONGO_CONNECTION_FAILED, err));
