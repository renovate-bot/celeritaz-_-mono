"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import FormDatePicker from "~/shared/custom/form-fields/FormDatePicker";
import FormInput from "~/shared/custom/form-fields/FormInput";
import FormOtp from "~/shared/custom/form-fields/FormOtp";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
import PhoneInputField from "~/shared/custom/form-fields/PhoneInput";
import { Button } from "~/shared/shadcn/ui/button";
import { Form } from "~/shared/shadcn/ui/form";

import { authClient, useSession } from "~/lib/auth-client";
import { nationalities } from "~/lib/constants";
import { cn } from "~/lib/utils";

import type { SubmitHandler } from "react-hook-form";

const signUpSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required"
    })
    .min(4, "First name cannot be less than 4 characters")
    .max(20, "First name cannot be longer than 20 characters"),
  lastName: z
    .string({
      required_error: "Last name is required"
    })
    .min(4, "Last name cannot be less than 4 characters")
    .max(20, "Last name cannot be longer than 20 characters"),
  email: z.string().optional(),
  phone: z.string().refine(isValidPhoneNumber, { message: "Enter valid phone number" }),
  dob: z.coerce.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Please provide a valid date of birth"
  }),
  gender: z.string().trim().min(1, { message: "Required" }),
  nationality: z.string().trim().min(1, { message: "Required" }),
  otp: z.string()
});

type FormData = z.infer<typeof signUpSchema>;

export default function PatientSignUpForm() {
  const { data } = useSession();
  const router = useRouter();
  const formMethods = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema)
  });
  const [loading, setLoading] = useState(false); // State for loading
  const [openOTP, setOpenOTP] = useState(false); // State for loading
  const [resendOtp, setResendOtp] = useState(true); // State for loading
  const [countdown, setCountdown] = useState(0); // State for loading
  const phoneNumberWatch = formMethods.watch("phone");

  const handleGenerateOTP = async () => {
    setLoading(true);
    await authClient.phoneNumber.sendOtp(
      {
        phoneNumber: phoneNumberWatch
      },
      {
        onSuccess: () => {
          toast.success("OTP sent successfully", {
            description: "Please check your phone for the OTP"
          });
          setOpenOTP(true);
        },
        onError: () => {
          toast.error("Failed to send OTP", {
            description: "User does not exist with this phone number",
            duration: 5000
          });
        }
      }
    );
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setResendOtp(true);
    await authClient.phoneNumber.sendOtp(
      {
        phoneNumber: phoneNumberWatch
      },
      {
        onSuccess: () => {
          toast.success("OTP sent successfully", {
            description: "Please check your phone for the OTP"
          });
          setOpenOTP(true);
        },
        onError: () => {
          toast.error("Failed to send OTP", {
            description: "User does not exist with this phone number",
            duration: 5000
          });
        }
      }
    );
  };

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    await authClient.phoneNumber.verify(
      {
        phoneNumber: data.phone,
        code: data.otp
      },
      {
        onSuccess: async () => {
          toast.success("OTP verified successfully", {
            description: "Account created successfully"
          });

          await authClient.signUp.email({
            email: data.email ?? data.phone,
            password: data.otp,
            name: `${data.firstName} ${data.lastName}`,
            phoneNumber: data.phone,
            callbackURL: "/profile"
          });
        },
        onError: () => {
          toast.error("Failed to verify OTP", {
            description: "Please try again",
            duration: 5000,
            className: "bg-destructive"
          });
        }
      }
    );
  };

  useEffect(() => {
    if (data) {
      void router.push("/profile");
    }

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
  }, [data, openOTP, resendOtp, router]);

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput<FormData>
              control={formMethods.control}
              labelClassName="text-xs sm:text-sm"
              inputClassName="text-xs sm:text-sm"
              name={"firstName"}
              placeholder={"John"}
              label={"First Name"}
              required
            />
            <FormInput<FormData>
              control={formMethods.control}
              labelClassName="text-xs sm:text-sm"
              inputClassName="text-xs sm:text-sm"
              name={"lastName"}
              placeholder={"Doe"}
              label={"Last Name"}
              required
            />
          </div>
          <PhoneInputField
            control={formMethods.control}
            labelClassName="text-xs sm:text-sm"
            label="Phone Number"
            placeholder="9012345678"
            name="phone"
            required
          />
          <FormInput<FormData>
            control={formMethods.control}
            labelClassName="text-xs sm:text-sm"
            inputClassName="text-xs sm:text-sm"
            name={"email"}
            placeholder={"johndoe@example.com"}
            label={"Email Address"}
          />
          <FormDatePicker
            control={formMethods.control}
            labelClassName="text-xs sm:text-sm"
            className="text-xs sm:text-sm"
            label="Date of Birth"
            name="dob"
            required
          />
          <FormSelect
            control={formMethods.control}
            labelClassName="text-xs sm:text-sm"
            selectClassName="text-xs sm:text-sm"
            optionClassName="text-xs sm:text-sm"
            label="Gender"
            placeholder="Select Gender"
            name="gender"
            selectOptions={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" }
            ]}
            required
          />
          <FormSelect
            control={formMethods.control}
            labelClassName="text-xs sm:text-sm"
            selectClassName="text-xs sm:text-sm"
            optionClassName="text-xs sm:text-sm"
            label="Nationality"
            name="nationality"
            placeholder="Select Nationality"
            selectOptions={nationalities.map((item) => ({
              name: item,
              value: item
            }))}
            required
          />
          {openOTP && (
            <FormOtp
              control={formMethods.control}
              name="otp"
              label="OTP"
              labelClassName="text-xs sm:text-sm"
              className="text-xs sm:text-sm"
              maxLength={6}
              step={0}
              required
            />
          )}
          {!openOTP && (
            <Button
              variant="default"
              type="button"
              disabled={!isValidPhoneNumber(phoneNumberWatch ?? "")}
              className={cn("w-full text-xs sm:text-sm", !phoneNumberWatch && "hidden")}
              onClick={handleGenerateOTP}>
              Generate OTP
            </Button>
          )}
          {openOTP && (
            <>
              <Button
                variant="outline"
                type="button"
                onClick={handleResendOtp}
                disabled={resendOtp}
                className={cn("w-full text-xs sm:text-sm", !phoneNumberWatch && "hidden")}>
                {resendOtp ? `Resend OTP (${countdown}s)` : "Resend OTP"}
              </Button>
              <Button type="submit" className="w-full text-xs sm:text-sm">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <>Creating account...</>
                  </>
                ) : (
                  "Create an account"
                )}
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
