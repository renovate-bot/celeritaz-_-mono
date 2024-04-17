import { SignIn } from "@clerk/nextjs";

import { buttonVariants } from "~/shared/shadcn/ui/button";
import { inputVariants } from "~/shared/shadcn/ui/input";

import { cn } from "~/lib/utils";

export default function Page() {
  return (
    <div className={"flex h-screen items-center justify-center"}>
      <SignIn
        appearance={{
          variables: {},
          elements: {
            card: "px-8 pt-10",
            // Hiding the sign-up link for now.
            footer: "hidden",
            headerTitle: "text-lg lg:text-xl text-left font-semibold duration-150",
            headerSubtitle: "lg:text-md text-left duration-150",
            footerActionLink: "text-primary hover:text-foreground duration-150",
            footerActionText: "text-muted-foreground",
            formFieldAction: "text-primary",
            formFieldErrorText: "text-destructive",
            formFieldInput: cn(
              inputVariants({ variant: "default" }),
              "w-full focus-visible:ring-2 shadow-none"
            ),
            formButtonPrimary: cn(
              buttonVariants({ variant: "default", size: "default" }),
              "w-full bg-blue-600 hover:bg-blue-700 border-0 !shadow-none !isolation-auto"
            )
          }
        }}
      />
    </div>
  );
}
