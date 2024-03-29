import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import { AppController } from "~/modules/app/app.controller.ts";
import { AppService } from "~/modules/app/app.service.ts";
import { LoggerMiddleware } from "~/middlewares/logger.middleware.ts";

import { TrpcModule } from "../trpc/trpc.module.ts";

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
