import { type AppRouter } from "@backend/src/modules/trpc/trpc.router";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/trpc"
    }),
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error)
    })
  ]
});
