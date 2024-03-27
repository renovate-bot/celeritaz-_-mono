import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "~/modules/app/app.controller";
import { AppService } from "~/modules/app/app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });

  describe("this is test thing", () => {
    it('should return "This is an test response!"', () => {
      expect(appController.getTest("Valid Id")).toBe("This is an test response!");
    });

    it("should throw an error if id is too short", () => {
      const tooShort = () => appController.getTest("1234");
      expect(tooShort).toThrow(BadRequestException);
    });

    it("should throw an error if id is not provided", () => {
      const noId = () => appController.getTest("");
      expect(noId).toThrow(BadRequestException);
    });
  });
});
