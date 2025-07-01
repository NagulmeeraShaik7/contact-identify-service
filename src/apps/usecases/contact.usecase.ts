import { ContactRepository } from "../repositories/contact.repository";

export class IdentifyUsecase {
  constructor(private contactRepo: ContactRepository) {}

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
        emails: [email],
        phoneNumbers: [phoneNumber],
        secondaryContactIds: [],
      };
    }

    let primary = existing.find((c) => c.linkPrecedence === "primary") || existing[0];
    for (const contact of existing) {
      if (
        contact.linkPrecedence === "primary" &&
        contact.createdAt < primary.createdAt
      ) {
        primary = contact;
      }
    }

    for (const contact of existing) {
      if (
        contact._id.toString() !== primary._id.toString() &&
        contact.linkPrecedence === "primary"
      ) {
        await this.contactRepo.update(contact._id.toString(), {
          linkPrecedence: "secondary",
          linkedId: primary._id,
        });
      }
    }

    const allLinked = await this.contactRepo.findAllLinked(primary._id.toString());

    const emails = Array.from(new Set(allLinked.map((c) => c.email).filter(Boolean)));
    const phones = Array.from(new Set(allLinked.map((c) => c.phoneNumber).filter(Boolean)));
    const secondaryIds = allLinked
      .filter((c) => c.linkPrecedence === "secondary")
      .map((c) => c._id);

    const existsExact = existing.some(
      (c) => c.email === email && c.phoneNumber === phoneNumber
    );

    if (!existsExact) {
      await this.contactRepo.create({
        email,
        phoneNumber,
        linkPrecedence: "secondary",
        linkedId: primary._id,
      });
    }

    return {
      primaryContatctId: primary._id,
      emails,
      phoneNumbers: phones,
      secondaryContactIds: secondaryIds,
    };
  }
}
