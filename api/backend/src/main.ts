import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "~/modules/app/app.module.ts";
import { TrpcRouter } from "~/modules/trpc/trpc.router.ts";
import { env } from "~/env.ts";
import { envToLogger } from "~/logger.ts";

import type { FastifyBaseLogger } from "fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: (envToLogger[env.NODE_ENV] ?? true) as FastifyBaseLogger | boolean,
    }),
  );

  app.enableCors();

  const trpc = app.get(TrpcRouter);

  await trpc.applyMiddleware(app);

  await app.listen(env.PORT, "0.0.0.0");
}
bootstrap();
