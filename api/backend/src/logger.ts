import type { FastifyBaseLogger, FastifyLoggerOptions, PinoLoggerOptions } from "fastify/types/logger";

export const envToLogger: Record<
  string,
  FastifyBaseLogger | (FastifyLoggerOptions & PinoLoggerOptions) | boolean
> = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:yyyy-mm-dd hh:mm:ss TT Z",
        ignore: "pid,hostname",
        colorize: true,
      },
    },
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          params: req.params,
          query: req.query,
          hostname: req.hostname,
          remoteAddress: req.ip,
          remotePort: req.connection.remotePort,
        };
      },
    },
  },
  production: true,
  test: false,
};
