import { Module } from "@nestjs/common";

import { TrpcRouter } from "./trpc.router.ts";
import { TrpcService } from "./trpc.service.ts";

@Module({
  imports: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
