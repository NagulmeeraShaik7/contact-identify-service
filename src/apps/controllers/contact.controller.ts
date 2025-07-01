import { Request, Response, NextFunction } from "express";
import { IdentifyUsecase } from "../usecases/contact.usecase";
import { ContactRepository } from "../repositories/contact.repository";

/**
 * Controller for handling contact identification requests.
 * @class
 */
export class IdentifyController {
  /**
   * Instance of IdentifyUsecase to handle business logic for contact identification.
   * @private
   */
  private identifyUsecase = new IdentifyUsecase(new ContactRepository());

  /**
   * Handles the identification of a contact based on email and/or phone number.
   * @param req - Express request object containing email and phoneNumber in the body.
   * @param res - Express response object to send the identified contact data.
   * @param next - Express next function to pass control to the next middleware or error handler.
   * @returns A JSON response with the identified contact or passes errors to the error handler.
   */
  identify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, phoneNumber } = req.body;
      const result = await this.identifyUsecase.execute(email, phoneNumber);
      res.status(200).json({ contact: result });
    } catch (err) {
      next(err);
    }
  };
}