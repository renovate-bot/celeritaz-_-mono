"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import { api } from "~/trpc/react";

import PhoneInputField from "~/shared/custom/form-fields/PhoneInput";
import { Button } from "~/shared/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/shadcn/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/shared/shadcn/ui/input-otp";
import { toast } from "sonner";

import { cn } from "~/lib/utils";

import type { SubmitHandler } from "react-hook-form";

// Define the zod schema
const loginSchema = z.object({
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Enter valid phone number" }),
  otp: z.string(),
});

type FormData = z.infer<typeof loginSchema>;

export default function PatientSignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setIsLoading] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [resendOtp, setResendOtp] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const router = useRouter();
  const formMethods = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "+91",
    },
  });
  const phoneNumberWatch = formMethods.watch("phoneNumber");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendOtp(true);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openOTP && resendOtp) {
      setCountdown(30);
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setResendOtp(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [openOTP, resendOtp]);

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex w-full flex-row items-end gap-2">
            <PhoneInputField
              control={formMethods.control}
              name={"phoneNumber"}
              disabled={loading}
              countryCode={"IN"}
              className="w-full"
              label={"Phone Number"}
              placeholder={"9874563214"}
            />
          </div>
          {openOTP && (
            <div className="w-full">
              <FormField
                control={formMethods.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>OTP</FormLabel>
                    <FormControl className="w-full">
                      <InputOTP maxLength={6} {...field} className="w-full">
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {!openOTP && (
            <Button
              variant="default"
              type="button"
              onClick={() => {
                toast.success("OTP sent successfully", {
                  description: "Please check your phone for the OTP",
                });
                setOpenOTP(true);
              }}
              disabled={!isValidPhoneNumber(phoneNumberWatch ?? "")}
              className={cn(
                "w-full text-xs sm:text-sm",
                !phoneNumberWatch && "hidden",
              )}
            >
              Generate OTP
            </Button>
          )}
          {openOTP && (
            <>
              <Button
                variant="outline"
                type="button"
                onClick={() => setResendOtp(true)}
                disabled={resendOtp}
                className={cn(
                  "w-full text-xs sm:text-sm",
                  !phoneNumberWatch && "hidden",
                )}
              >
                {resendOtp ? `Resend OTP (${countdown}s)` : "Resend OTP"}
              </Button>
              <Button
                type="submit"
                className={"w-full"}
                variant="default"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <>Logging In...</>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
