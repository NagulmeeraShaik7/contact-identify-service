import { ContactRepository } from "../repositories/contact.repository";

/**
 * Use case for identifying and consolidating contact information based on email or phone number.
 * @class
 */
export class IdentifyUsecase {
  /**
   * Creates an instance of IdentifyUsecase.
   * @param contactRepo - The repository instance for contact-related database operations.
   */
  constructor(private contactRepo: ContactRepository) {}

  /**
   * Identifies a contact by email and/or phone number, consolidating matching contacts.
   * Creates a new contact if no matches are found, or links existing contacts to a primary contact.
   * @param email - The email address to search for (optional).
   * @param phoneNumber - The phone number to search for (optional).
   * @returns A promise resolving to an object containing the primary contact ID, unique emails, phone numbers, and secondary contact IDs.
   */
  async execute(email?: string, phoneNumber?: string) {
    const existing = await this.contactRepo.findMatching(email, phoneNumber);

    if (existing.length === 0) {
      const newContact = await this.contactRepo.create({
        email,
        phoneNumber,
        linkPrecedence: "primary",
      });

      return {
        primaryContatctId: newContact._id,
        emails: [email].filter(Boolean),
        phoneNumbers: [phoneNumber].filter(Boolean),
        secondaryContactIds: [],
      };
    }

    let primary = existing.find((c) => c.linkPrecedence === "primary") || existing[0];
    for (const contact of existing) {
      if (
        contact.linkPrecedence === "primary" &&
        new Date(contact.createdAt) < new Date(primary.createdAt)
      ) {
        primary = contact;
      }
    }

    for (const contact of existing) {
      const isSameAsPrimary = contact._id.toString() === primary._id.toString();
      if (!isSameAsPrimary && contact.linkPrecedence === "primary") {
        await this.contactRepo.update(contact._id.toString(), {
          linkPrecedence: "secondary",
          linkedId: primary._id,
        });
      } else if (!isSameAsPrimary && contact.linkedId?.toString() !== primary._id.toString()) {
        await this.contactRepo.update(contact._id.toString(), {
          linkedId: primary._id,
        });
      }
    }

    let allLinked = await this.contactRepo.findAllLinked(primary._id.toString());

    const existsExact = allLinked.some((c) => {
      return c.email === email && c.phoneNumber === phoneNumber;
    });

    if (!existsExact) {
      await this.contactRepo.create({
        email,
        phoneNumber,
        linkPrecedence: "secondary",
        linkedId: primary._id,
      });

      allLinked = await this.contactRepo.findAllLinked(primary._id.toString());
    }

    const emails = Array.from(new Set(allLinked.map((c) => c.email).filter(Boolean)));
    const phones = Array.from(new Set(allLinked.map((c) => c.phoneNumber).filter(Boolean)));
    const secondaryIds = allLinked
      .filter((c) => c.linkPrecedence === "secondary")
      .map((c) => c._id);

    return {
      primaryContatctId: primary._id,
      emails,
      phoneNumbers: phones,
      secondaryContactIds: secondaryIds,
    };
  }
}