import { ContactModel } from "../models/contact.model";

/**
 * Repository class for handling contact-related database operations.
 * @class
 */
export class ContactRepository {
  /**
   * Finds contacts matching the provided email or phone number.
   * @param email - The email to search for (optional).
   * @param phoneNumber - The phone number to search for (optional).
   * @returns A promise resolving to an array of matching contact documents, or an empty array if no criteria are provided.
   */
  async findMatching(email?: string, phoneNumber?: string) {
    const query: any = { $or: [] };
    if (email) query.$or.push({ email });
    if (phoneNumber) query.$or.push({ phoneNumber });

    return query.$or.length === 0 ? [] : ContactModel.find(query).lean();
  }

  /**
   * Creates a new contact in the database.
   * @param data - The contact data to be created.
   * @returns A promise resolving to the created contact document.
   */
  async create(data: any) {
    return ContactModel.create(data);
  }

  /**
   * Updates an existing contact by ID.
   * @param id - The ID of the contact to update.
   * @param data - The updated contact data.
   * @returns A promise resolving to the updated contact document.
   */
  async update(id: string, data: any) {
    return ContactModel.findByIdAndUpdate(id, data);
  }

  /**
   * Finds all contacts linked to a primary contact ID, including the primary contact itself.
   * @param primaryId - The ID of the primary contact.
   * @returns A promise resolving to an array of linked contact documents.
   */
  async findAllLinked(primaryId: string) {
    return ContactModel.find({
      $or: [
        { _id: primaryId },
        { linkedId: primaryId },
      ],
    }).lean();
  }
}