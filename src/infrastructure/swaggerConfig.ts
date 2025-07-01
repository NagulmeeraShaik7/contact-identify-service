import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";

/**
 * Swagger configuration options for generating the OpenAPI specification.
 */
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contact Identification API",
      version: "1.0.0",
      description: "API for identifying and consolidating contact information based on email or phone number.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || "3000"}`,
        description: "Local development server",
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the contact.",
              example: "60f7b3b7c8e3b1234567890a",
            },
            phoneNumber: {
              type: "string",
              description: "The phone number of the contact (optional).",
              example: "1234567890",
              nullable: true,
            },
            email: {
              type: "string",
              description: "The email address of the contact (optional).",
              example: "example@domain.com",
              nullable: true,
            },
            linkedId: {
              type: "string",
              description: "The ID of the primary contact this contact is linked to (null if primary).",
              example: "60f7b3b7c8e3b1234567890b",
              nullable: true,
            },
            linkPrecedence: {
              type: "string",
              enum: ["primary", "secondary"],
              description: "Indicates whether the contact is primary or secondary.",
              example: "primary",
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the contact was soft-deleted (null if not deleted).",
              example: "2025-07-01T17:43:00.000Z",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the contact was created.",
              example: "2025-07-01T17:43:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the contact was last updated.",
              example: "2025-07-01T17:43:00.000Z",
            },
          },
          required: ["linkPrecedence"],
        },
      },
    },
  },
  apis: ["./src/apps/routers/*.ts"], // Path to files containing Swagger JSDoc comments
};

/**
 * The generated OpenAPI specification for the Contact Identification API.
 */
const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * Sets up Swagger UI for the Express application.
 * @param app - The Express application instance.
 */
export function setupSwagger(app: Express): void {
  const swaggerUi = require("swagger-ui-express");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { swaggerSpec };