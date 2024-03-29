import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import { AppController } from "~/modules/app/app.controller.js";
import { AppService } from "~/modules/app/app.service.js";
import { LoggerMiddleware } from "~/middlewares/logger.middleware.js";

import { TrpcModule } from "../trpc/trpc.module.js";

@Module({
  imports: [TrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
