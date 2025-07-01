import { ContactModel } from "../models/contact.model";

export class ContactRepository {
  async findMatching(email?: string, phoneNumber?: string) {
    const query: any = { $or: [] };
    if (email) query.$or.push({ email });
    if (phoneNumber) query.$or.push({ phoneNumber });

    return query.$or.length === 0 ? [] : ContactModel.find(query).lean();
  }

  async create(data: any) {
    return ContactModel.create(data);
  }

  async update(id: string, data: any) {
    return ContactModel.findByIdAndUpdate(id, data);
  }

  async findAllLinked(primaryId: string) {
    return ContactModel.find({
      $or: [
        { _id: primaryId },
        { linkedId: primaryId },
      ],
    }).lean();
  }
}
