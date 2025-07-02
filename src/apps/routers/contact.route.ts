import { Router } from "express";
import { IdentifyController } from "../controllers/contact.controller";
import { CONSTANTS } from "../../infrastructure/constants";

const router = Router();
const controller = new IdentifyController();

/**
 * @swagger
 * /api/identify:
 *   post:
 *     summary: Identify a contact by email or phone number
 *     description: Identifies a contact based on provided email and/or phone number, consolidating contact information if matches are found.
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the contact (optional).
 *                 example: example@domain.com
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the contact (optional).
 *                 example: 1234567890
 *             required: []
 *     responses:
 *       200:
 *         description: Successfully identified contact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   type: object
 *                   properties:
 *                     primaryContactId:
 *                       type: string
 *                       description: The ID of the primary contact.
 *                       example: 60f7b3b7c8e3b1234567890a
 *                     emails:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of email addresses associated with the contact.
 *                       example:
 *                         - example@domain.com
 *                     phoneNumbers:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of phone numbers associated with the contact.
 *                       example:
 *                         - 1234567890
 *                     secondaryContactIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of IDs for secondary contacts linked to the primary contact.
 *                       example:
 *                         - 60f7b3b7c8e3b1234567890b
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or phone number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post(CONSTANTS.IDENTIFY_PATH, controller.identify);

export default router;