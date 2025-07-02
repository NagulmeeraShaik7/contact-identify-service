import { ContactRepository } from "../../apps/repositories/contact.repository";
import { ContactModel } from "../../apps/models/contact.model";

// Mock the entire ContactModel module
jest.mock("../../apps/models/contact.model", () => ({
  ContactModel: {
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("ContactRepository", () => {
  const repo = new ContactRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findMatching", () => {
    it("should find by email", async () => {
      const mockResult = [{ _id: "1", email: "a@example.com" }];
      (ContactModel.find as jest.Mock).mockReturnValue({ lean: () => mockResult });

      const result = await repo.findMatching("a@example.com", undefined);

      expect(ContactModel.find).toHaveBeenCalledWith({ $or: [{ email: "a@example.com" }] });
      expect(result).toEqual(mockResult);
    });

    it("should find by phoneNumber", async () => {
      const mockResult = [{ _id: "2", phoneNumber: "1234567890" }];
      (ContactModel.find as jest.Mock).mockReturnValue({ lean: () => mockResult });

      const result = await repo.findMatching(undefined, "1234567890");

      expect(ContactModel.find).toHaveBeenCalledWith({ $or: [{ phoneNumber: "1234567890" }] });
      expect(result).toEqual(mockResult);
    });

    it("should find by both email and phoneNumber", async () => {
      const mockResult = [{ _id: "3", email: "a@example.com", phoneNumber: "1234567890" }];
      (ContactModel.find as jest.Mock).mockReturnValue({ lean: () => mockResult });

      const result = await repo.findMatching("a@example.com", "1234567890");

      expect(ContactModel.find).toHaveBeenCalledWith({
        $or: [{ email: "a@example.com" }, { phoneNumber: "1234567890" }],
      });
      expect(result).toEqual(mockResult);
    });

    it("should return empty array when neither email nor phoneNumber is provided", async () => {
      const result = await repo.findMatching();

      expect(result).toEqual([]);
      expect(ContactModel.find).not.toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should call ContactModel.create with data", async () => {
      const mockData = { email: "test@example.com" };
      const mockCreated = { _id: "abc123", ...mockData };

      (ContactModel.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await repo.create(mockData);

      expect(ContactModel.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockCreated);
    });
  });

  describe("update", () => {
    it("should call findByIdAndUpdate with id and data", async () => {
      const id = "abc123";
      const updateData = { linkedId: "def456" };
      const updatedDoc = { _id: id, ...updateData };

      (ContactModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedDoc);

      const result = await repo.update(id, updateData);

      expect(ContactModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(updatedDoc);
    });
  });

  describe("findAllLinked", () => {
    it("should find primary and linked contacts", async () => {
      const primaryId = "abc123";
      const mockResult = [{ _id: "abc123" }, { _id: "def456", linkedId: "abc123" }];

      (ContactModel.find as jest.Mock).mockReturnValue({ lean: () => mockResult });

      const result = await repo.findAllLinked(primaryId);

      expect(ContactModel.find).toHaveBeenCalledWith({
        $or: [{ _id: primaryId }, { linkedId: primaryId }],
      });
      expect(result).toEqual(mockResult);
    });
  });
});
