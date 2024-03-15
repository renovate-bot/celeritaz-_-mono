import { type AppRouter } from "@backend/src/modules/trpc/trpc.router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8080/trpc" // you should update this to use env variables
    })
  ]
});
