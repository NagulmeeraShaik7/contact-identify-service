import { IdentifyUsecase } from "../../apps/usecases/contact.usecase";
import { ContactRepository } from "../../apps/repositories/contact.repository";
import { LINK_PRECEDENCE } from "../../infrastructure/constants";

// Mocks
const mockRepo: jest.Mocked<ContactRepository> = {
  findMatching: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAllLinked: jest.fn(),
};

const usecase = new IdentifyUsecase(mockRepo);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("IdentifyUsecase.execute", () => {
  const email = "test@example.com";
  const phoneNumber = "1234567890";

  it("should create a new primary contact when no matches found", async () => {
    mockRepo.findMatching.mockResolvedValue([]);
    mockRepo.create.mockResolvedValue({ _id: "1" } as any);

    const result = await usecase.execute(email, phoneNumber);

    expect(mockRepo.create).toHaveBeenCalledWith({
      email,
      phoneNumber,
      linkPrecedence: LINK_PRECEDENCE.PRIMARY,
    });

    expect(result).toEqual({
      primaryContatctId: "1",
      emails: [email],
      phoneNumbers: [phoneNumber],
      secondaryContactIds: [],
    });
  });

  it("should consolidate contacts with one primary and return aggregated info", async () => {
    const primary = {
      _id: "1",
      email,
      phoneNumber,
      linkPrecedence: LINK_PRECEDENCE.PRIMARY,
      createdAt: new Date("2022-01-01"),
    } as any;

    const secondary = {
      _id: "2",
      email: "alt@example.com",
      phoneNumber: "9876543210",
      linkPrecedence: LINK_PRECEDENCE.SECONDARY,
      linkedId: "1",
      createdAt: new Date("2022-01-02"),
    };

    mockRepo.findMatching.mockResolvedValue([primary, secondary]);
    mockRepo.findAllLinked.mockResolvedValue([primary, secondary]);

    const result = await usecase.execute(email, phoneNumber);

    expect(result.primaryContatctId).toBe("1");
    expect(result.emails).toContain(email);
    expect(result.emails).toContain("alt@example.com");
    expect(result.phoneNumbers).toContain(phoneNumber);
    expect(result.phoneNumbers).toContain("9876543210");
    expect(result.secondaryContactIds).toContain("2");
  });

  it("should update secondaries to link to the correct (oldest) primary", async () => {
    const olderPrimary = {
      _id: "1",
      email,
      phoneNumber,
      linkPrecedence: LINK_PRECEDENCE.PRIMARY,
      createdAt: new Date("2021-01-01"),
    } as any;

    const newerPrimary = {
      _id: "2",
      email: "another@example.com",
      phoneNumber: "9999999999",
      linkPrecedence: LINK_PRECEDENCE.PRIMARY,
      createdAt: new Date("2023-01-01"),
    };

    mockRepo.findMatching.mockResolvedValue([olderPrimary, newerPrimary]);
    mockRepo.findAllLinked.mockResolvedValue([olderPrimary, newerPrimary]);

    await usecase.execute(email, phoneNumber);

    expect(mockRepo.update).toHaveBeenCalledWith("2", {
      linkPrecedence: LINK_PRECEDENCE.SECONDARY,
      linkedId: "1",
    });
  });

  it("should create a secondary contact if exact match does not exist", async () => {
    const primary = {
      _id: "1",
      email: "a@example.com",
      phoneNumber: "111",
      linkPrecedence: LINK_PRECEDENCE.PRIMARY,
      createdAt: new Date("2022-01-01"),
    } as any;

    mockRepo.findMatching.mockResolvedValue([primary]);
    mockRepo.findAllLinked.mockResolvedValueOnce([primary]); // Before creating secondary
    mockRepo.findAllLinked.mockResolvedValueOnce([primary, {
      _id: "2",
      email,
      phoneNumber,
      linkPrecedence: LINK_PRECEDENCE.SECONDARY,
    }]); // After creating secondary

    mockRepo.create.mockResolvedValue({ _id: "2" } as any);

    const result = await usecase.execute(email, phoneNumber);

    expect(mockRepo.create).toHaveBeenCalledWith({
      email,
      phoneNumber,
      linkPrecedence: LINK_PRECEDENCE.SECONDARY,
      linkedId: "1",
    });

    expect(result.primaryContatctId).toBe("1");
    expect(result.emails).toContain(email);
    expect(result.secondaryContactIds).toContain("2");
  });

  it("should not create a secondary if exact match already exists", async () => {
    const primary = {
      _id: "1",
      email: "a@example.com",
      phoneNumber: "111",
      linkPrecedence: LINK_PRECEDENCE.PRIMARY,
      createdAt: new Date("2022-01-01"),
    } as any;

    const exact = {
      _id: "2",
      email,
      phoneNumber,
      linkPrecedence: LINK_PRECEDENCE.SECONDARY,
      linkedId: "1",
    };

    mockRepo.findMatching.mockResolvedValue([primary]);
    mockRepo.findAllLinked.mockResolvedValue([primary, exact]);

    const result = await usecase.execute(email, phoneNumber);

    expect(mockRepo.create).not.toHaveBeenCalledWith({
      email,
      phoneNumber,
      linkPrecedence: LINK_PRECEDENCE.SECONDARY,
      linkedId: "1",
    });

    expect(result.secondaryContactIds).toContain("2");
  });
});
