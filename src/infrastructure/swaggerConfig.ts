import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import { SWAGGER_CONSTANTS } from "../infrastructure/constants";

/**
 * Swagger configuration options for generating the OpenAPI specification.
 */
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: SWAGGER_CONSTANTS.OPENAPI_VERSION,
    info: {
      title: SWAGGER_CONSTANTS.INFO.TITLE,
      version: SWAGGER_CONSTANTS.INFO.VERSION,
      description: SWAGGER_CONSTANTS.INFO.DESCRIPTION,
    },
    servers: [
      {
        url: `${SWAGGER_CONSTANTS.LOCALHOST}:${process.env.PORT || SWAGGER_CONSTANTS.DEFAULT_PORT}`,
        description: SWAGGER_CONSTANTS.SERVER_DESCRIPTION,
      },
      {
        url: SWAGGER_CONSTANTS.PRODUCTION_URL,
        description: SWAGGER_CONSTANTS.PRODUCTION_DESCRIPTION,
      }
    ],
    components: {
      schemas: {
        [SWAGGER_CONSTANTS.SCHEMA_NAME]: {
          type: SWAGGER_CONSTANTS.SCHEMA_TYPE,
          properties: {
            [SWAGGER_CONSTANTS.PROPS.ID]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.ID,
              example: SWAGGER_CONSTANTS.EXAMPLES.ID,
            },
            [SWAGGER_CONSTANTS.PROPS.PHONE]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.PHONE,
              example: SWAGGER_CONSTANTS.EXAMPLES.PHONE,
              nullable: true,
            },
            [SWAGGER_CONSTANTS.PROPS.EMAIL]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.EMAIL,
              example: SWAGGER_CONSTANTS.EXAMPLES.EMAIL,
              nullable: true,
            },
            [SWAGGER_CONSTANTS.PROPS.LINKED_ID]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.LINKED_ID,
              example: SWAGGER_CONSTANTS.EXAMPLES.LINKED_ID,
              nullable: true,
            },
            [SWAGGER_CONSTANTS.PROPS.LINK_PRECEDENCE]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              enum: SWAGGER_CONSTANTS.LINK_PRECEDENCE_ENUM,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.LINK_PRECEDENCE,
              example: SWAGGER_CONSTANTS.EXAMPLES.LINK_PRECEDENCE,
            },
            [SWAGGER_CONSTANTS.PROPS.DELETED_AT]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              format: SWAGGER_CONSTANTS.FORMATS.DATE_TIME,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.DELETED_AT,
              example: SWAGGER_CONSTANTS.EXAMPLES.DELETED_AT,
              nullable: true,
            },
            [SWAGGER_CONSTANTS.PROPS.CREATED_AT]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              format: SWAGGER_CONSTANTS.FORMATS.DATE_TIME,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.CREATED_AT,
              example: SWAGGER_CONSTANTS.EXAMPLES.CREATED_AT,
            },
            [SWAGGER_CONSTANTS.PROPS.UPDATED_AT]: {
              type: SWAGGER_CONSTANTS.TYPES.STRING,
              format: SWAGGER_CONSTANTS.FORMATS.DATE_TIME,
              description: SWAGGER_CONSTANTS.DESCRIPTIONS.UPDATED_AT,
              example: SWAGGER_CONSTANTS.EXAMPLES.UPDATED_AT,
            },
          },
          required: [SWAGGER_CONSTANTS.PROPS.LINK_PRECEDENCE],
        },
      },
    },
  },
  apis: [SWAGGER_CONSTANTS.API_GLOBS],
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
  app.use(SWAGGER_CONSTANTS.API_DOCS_PATH, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { swaggerSpec };
