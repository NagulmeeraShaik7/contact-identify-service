import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import identifyRouter from "./apps/routers/contact.route";
import errorMiddleware from "./middlewares/error.middleware";
import { setupSwagger, swaggerSpec } from "./infrastructure/swaggerConfig";

/**
 * Initializes environment variables from the .env file.
 */
dotenv.config();

/**
 * The main Express application instance.
 * @type {express.Express}
 */
const app = express();

/**
 * Middleware to parse incoming JSON request bodies.
 */
app.use(express.json());

/**
 * Mounts the contact identification router under the /api prefix.
 */
app.use("/api", identifyRouter);

/**
 * Sets up Swagger UI for API documentation and serves the raw Swagger specification.
 */
setupSwagger(app);

/**
 * Serves the raw Swagger specification JSON at /api-docs/json.
 */
app.get("/api-docs/json", (_req: express.Request, res: express.Response) => {
  res.status(200).json(swaggerSpec);
});

/**
 * Mounts the error-handling middleware to catch and process errors.
 */
app.use(errorMiddleware);

/**
 * MongoDB connection URI retrieved from environment variables.
 * @type {string | undefined}
 */
const mongoUri = process.env.MONGO_URI;

/**
 * Validates the MongoDB URI and throws an error if not defined.
 */
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

/**
 * Connects to MongoDB and starts the Express server.
 * Logs connection status and server startup details.
 */
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    /**
     * Starts the Express server on the specified port.
     * @type {string | undefined}
     */
    const port = process.env.PORT || "3000";
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed", err));