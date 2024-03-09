import { Controller, Get, Query } from "@nestjs/common";

import { AppService } from "~/modules/app/app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  getTest(@Query("id") id: string): string {
    return this.appService.getTest(id);
  }
}
