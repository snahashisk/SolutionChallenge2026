"use client";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type OTPFormProps = {
  userId: string;
  className?: string;
};

export function OTPForm({ className, userId, ...props }: OTPFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    try {
      await axiosInstance.post("/api/v1/user/verify", {
        userId,
        otp,
      });
      toast.success("OTP Verification Successful");

      // ✅ redirect after success
      router.push("/login");
    } catch (error) {
      console.log("OTP Verification Failed");
      toast.error("OTP Verification Failed");
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-3">
        <CardTitle className="text-center text-xl font-bold">Verify your email</CardTitle>
        <CardDescription className="text-center">
          Enter the verification code we sent to your email address: <span className="font-medium">{}</span>.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
              <Button variant="outline" size="xs">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <InputOTP maxLength={6} id="otp-verification" value={otp} onChange={setOtp} required>
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2" />
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10  *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription className="pb-2">
              <a href="#">I no longer have access to this email.</a>
            </FieldDescription>
          </Field>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit" className="w-full">
              Verify
            </Button>
            <div className="text-sm text-muted-foreground">
              Having trouble signing in?{" "}
              <a href="#" className="underline underline-offset-4 transition-colors hover:text-primary">
                Contact support
              </a>
            </div>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
