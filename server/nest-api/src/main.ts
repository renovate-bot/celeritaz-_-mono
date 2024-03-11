import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "~/modules/app/app.module.js";
import { env } from "~/env.js";
import { envToLogger } from "~/logger.js";

import type { FastifyBaseLogger } from "fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: (envToLogger[env.NODE_ENV] ?? true) as FastifyBaseLogger | boolean,
    }),
  );
  await app.listen(env.PORT, "0.0.0.0");
}
bootstrap();
