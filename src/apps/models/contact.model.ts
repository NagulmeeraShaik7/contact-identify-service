import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String },
    linkedId: { type: mongoose.Schema.Types.ObjectId, default: null },
    linkPrecedence: {
      type: String,
      enum: ["primary", "secondary"],
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const ContactModel = mongoose.model("Contact", contactSchema);
