import mongoose from "mongoose";
import { CONTACT_MODEL_NAME, LINK_PRECEDENCE, DEFAULTS } from "../../infrastructure/constants";

const contactSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String },
    linkedId: { type: mongoose.Schema.Types.ObjectId, default: null },
    linkPrecedence: {
      type: String,
      enum: [LINK_PRECEDENCE.PRIMARY, LINK_PRECEDENCE.SECONDARY],
      required: true,
    },
    deletedAt: { type: Date, default: DEFAULTS.DELETED_AT },
  },
  { timestamps: true }
);

export const ContactModel = mongoose.model(CONTACT_MODEL_NAME, contactSchema);
