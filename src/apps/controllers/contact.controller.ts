import { Request, Response, NextFunction } from "express";
import { IdentifyUsecase } from "../usecases/contact.usecase";
import { ContactRepository } from "../repositories/contact.repository";

export class IdentifyController {
  private identifyUsecase = new IdentifyUsecase(new ContactRepository());

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
