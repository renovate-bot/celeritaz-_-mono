import { type AppRouter } from "@backend/src/modules/trpc/trpc.router.ts";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

import { env } from "~/env.ts";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.NEXT_PUBLIC_API_ENDPOINT + "/trpc"
    }),
    loggerLink({
      enabled: (op) =>
        env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error)
    })
  ]
});
