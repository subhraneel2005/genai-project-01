import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  // ... other config options
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          // Send the OTP for sign in
        } else if (type === "sign-in") {
        }
      },
    }),
  ],
});
