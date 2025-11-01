import ConfirmEmail from "@/components/email/verify-otp-template";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  // ... other config options
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        const subjectMap = {
          "sign-in": "Sign in to your account",
          "email-verification": "Verify your email address",
          "forget-password": "Reset your password",
        };

        try {
          await resend.emails.send({
            from: "Subhraneel <no-reply@poplu.store>",
            to: email,
            subject: subjectMap[type],
            react: ConfirmEmail({
              validationCode: otp,
            }),
          });
        } catch (error) {
          console.error("Resend email error:", error);
          throw new Error("Failed to send OTP email");
        }
      },
    }),
  ],
});
