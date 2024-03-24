import { Injectable } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";

import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import { z } from "zod";

import { TrpcService } from "./trpc.service.js";

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure.input(z.object({ name: z.string() })).query(({ input }) => {
      return `Hello ${input.name ? input.name : `Bilbo`}`;
    }),
  });

  async applyMiddleware(app: NestFastifyApplication) {
    // Added any due to the ongoing issue with the fastify plugin
    await app.register(fastifyTRPCPlugin as any, {
      prefix: "/trpc",
      trpcOptions: {
        router: this.appRouter,
        onError({ path, error }) {
          // report to error monitoring
          console.error(`Error in tRPC handler on path '${path}':`, error);
        },
      } satisfies FastifyTRPCPluginOptions<any>["trpcOptions"],
    });
  }
}

export type AppRouter = typeof TrpcRouter.prototype.appRouter;
