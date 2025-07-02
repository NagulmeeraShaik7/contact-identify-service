import { IdentifyController } from "../../apps/controllers/contact.controller";
import { Request, Response, NextFunction } from "express";
import { IdentifyUsecase } from "../../apps/usecases/contact.usecase";

// Mock the execute method on the prototype
jest.spyOn(IdentifyUsecase.prototype, "execute");

describe("IdentifyController", () => {
  let controller: IdentifyController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    controller = new IdentifyController();

    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    mockReq = {
      body: {
        email: "test@example.com",
        phoneNumber: "1234567890",
      },
    };

    mockRes = {
      status: statusMock,
    };

    mockNext = jest.fn();
  });

  it("should return 200 and identified contact on success", async () => {
    const resultMock = {
      primaryContatctId: "abc123",
      emails: ["test@example.com"],
      phoneNumbers: ["1234567890"],
    };

    (IdentifyUsecase.prototype.execute as jest.Mock).mockResolvedValue(resultMock);

    await controller.identify(mockReq as Request, mockRes as Response, mockNext);

    expect(IdentifyUsecase.prototype.execute).toHaveBeenCalledWith(
      "test@example.com",
      "1234567890"
    );
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ contact: resultMock });
  });

  it("should call next with error if usecase throws", async () => {
    const error = new Error("Something went wrong");

    (IdentifyUsecase.prototype.execute as jest.Mock).mockRejectedValue(error);

    await controller.identify(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
