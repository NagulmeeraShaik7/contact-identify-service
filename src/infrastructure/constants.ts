
/**
 * Constants for the Contact Identify Service
 * @module constants
 * @description This module defines constants used throughout the contact identify service, including model names, link precedence types, and default values.
 */
export const CONTACT_MODEL_NAME = "Contact";

/**
 * Link precedence types for contacts
 * @constant
 * @type {Object}
 * @property {string} PRIMARY - Indicates a primary contact link.
 * @property {string} SECONDARY - Indicates a secondary contact link.
 * @description These constants are used to determine the relationship between contacts, where a primary contact can have multiple secondary contacts linked to it.
 */

export const LINK_PRECEDENCE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
} as const;

/**
 * Default values for contact fields
 * @constant
 * @type {Object}
 * @property {null} DELETED_AT - Default value for the deletedAt field, indicating that the contact is not deleted.
 * @description This constant is used to initialize the deletedAt field in contact documents, allowing for soft deletion functionality.
 */
export const DEFAULTS = {
  DELETED_AT: null,
};


/**
 * Constants for Swagger documentation
 * @constant
 * @type {Object}
 * @property {string} OPENAPI_VERSION - The OpenAPI version used in the documentation.
 * @property {string} LOCALHOST - The base URL for the local development server.
 * @property {string} DEFAULT_PORT - The default port for the local server.
 * @property {string} SERVER_DESCRIPTION - A description of the local server.
 * @property {string} API_DOCS_PATH - The path to the API documentation.
 * @property {string} API_GLOBS - The glob pattern for API files to be documented.
 * @property {Object} INFO - Information about the API, including title, version, and description.
 * @property {string} SCHEMA_NAME - The name of the contact schema used in the API documentation.
 * @property {string} SCHEMA_TYPE - The type of the contact schema (always "object").
 * @property {Object} TYPES - Data types used in the API documentation, such as string
 * @property {Object} FORMATS - Formats for specific data types, such as date-time.
 * @property {Array<string>} LINK_PRECEDENCE_ENUM - An array of possible values for the linkPrecedence field in the contact schema.
 * @property {Object} PROPS - Properties of the contact schema, including ID, phone, email, linkedId, linkPrecedence, deletedAt, createdAt, and updatedAt.
 * @property {Object} DESCRIPTIONS - Descriptions for each property in the contact schema.
 * @property {Object} EXAMPLES - Example values for each property in the contact schema.
 * @description These constants are used to configure Swagger documentation for the Contact Identification API, providing a structured way to describe the API endpoints, request and response formats, and data models.
 */

export const SWAGGER_CONSTANTS = {
  OPENAPI_VERSION: "3.0.0",
  LOCALHOST: "http://localhost",
  DEFAULT_PORT: "3000",
  SERVER_DESCRIPTION: "Local development server",
  API_DOCS_PATH: "/api-docs",
  API_GLOBS: "./src/apps/routers/*.ts",

  INFO: {
    TITLE: "Contact Identification API",
    VERSION: "1.0.0",
    DESCRIPTION:
      "API for identifying and consolidating contact information based on email or phone number.",
  },

  SCHEMA_NAME: "Contact",
  SCHEMA_TYPE: "object",

  TYPES: {
    STRING: "string",
  },

  FORMATS: {
    DATE_TIME: "date-time",
  },

  LINK_PRECEDENCE_ENUM: ["primary", "secondary"],

  PROPS: {
    ID: "_id",
    PHONE: "phoneNumber",
    EMAIL: "email",
    LINKED_ID: "linkedId",
    LINK_PRECEDENCE: "linkPrecedence",
    DELETED_AT: "deletedAt",
    CREATED_AT: "createdAt",
    UPDATED_AT: "updatedAt",
  },

  DESCRIPTIONS: {
    ID: "The unique identifier for the contact.",
    PHONE: "The phone number of the contact (optional).",
    EMAIL: "The email address of the contact (optional).",
    LINKED_ID: "The ID of the primary contact this contact is linked to (null if primary).",
    LINK_PRECEDENCE: "Indicates whether the contact is primary or secondary.",
    DELETED_AT: "The date and time when the contact was soft-deleted (null if not deleted).",
    CREATED_AT: "The date and time when the contact was created.",
    UPDATED_AT: "The date and time when the contact was last updated.",
  },

  EXAMPLES: {
    ID: "60f7b3b7c8e3b1234567890a",
    PHONE: "1234567890",
    EMAIL: "example@domain.com",
    LINKED_ID: "60f7b3b7c8e3b1234567890b",
    LINK_PRECEDENCE: "primary",
    DELETED_AT: "2025-07-01T17:43:00.000Z",
    CREATED_AT: "2025-07-01T17:43:00.000Z",
    UPDATED_AT: "2025-07-01T17:43:00.000Z",
  },
};

/**
 * Constants for error handling
 * @constant
 * @type {Object}
 * @property {number} STATUS_CODE - The HTTP status code for internal server errors.
 * @property {string} RESPONSE_FIELD - The field name in the response containing the error message.
 * @property {string} MESSAGE - The default error message for internal server errors.
 * @description These constants are used to standardize error responses across the API, ensuring consistent error handling and messaging.
 */

export const ERROR_CONSTANTS = {
  STATUS_CODE: 500,
  RESPONSE_FIELD: "error",
  MESSAGE: "Internal Server Error",
};

/**
 * Application constants for the Contact Identify Service
 * @constant
 * @type {Object}
 * @property {Object} ENV - Environment variable keys used in the application.
 * @property {Object} DEFAULTS - Default values for various configurations.
 * @property {Object} URL - Base URL for the application.
 * @property {Object} ROUTES - API routes and paths.
 * @property {Object} HTTP_STATUS - Common HTTP status codes used in responses.
 * @property {Object} ERROR_MESSAGES - Custom error messages for specific scenarios.
 * @property {Object} LOGS - Log messages for various application events.
 */

export const APP_CONSTANTS = {
  ENV: {
    MONGO_URI_KEY: "MONGO_URI",
    PORT_KEY: "PORT",
  },

  DEFAULTS: {
    PORT: "3000",
  },

  URL: {
    HOST: "http://localhost",
  },

  ROUTES: {
    API_PREFIX: "/api",
    SWAGGER_JSON: "/api-docs/json",
  },

  HTTP_STATUS: {
    OK: 200,
  },

  ERROR_MESSAGES: {
    MONGO_URI_NOT_DEFINED: "MONGO_URI environment variable is not defined",
  },

  LOGS: {
    MONGO_CONNECTED: "MongoDB connected",
    MONGO_CONNECTION_FAILED: "MongoDB connection failed",
    SERVER_RUNNING_AT: "Server running at",
  },
};

/**
 * Constants for the Contact Identify Service
 * @constant
 * @type {Object}
 * @property {string} IDENTIFY_PATH - The API path for identifying contacts.
 * @description This module defines constants used throughout the contact identify service, including API paths, schema properties, example values, and error messages.
 * 
 */

export const CONSTANTS = {
  // API paths
  IDENTIFY_PATH: "/identify",

};

