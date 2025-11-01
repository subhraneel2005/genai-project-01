"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ActiveModal } from "./AuthModals";
import VerifyOtp from "./VerifyOtpModal";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const title = "Signup Form";

const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupProps {
  activeModal: ActiveModal | null;
  setActiveModal: (modal: ActiveModal | null) => void;
}

export default function Signup({ activeModal, setActiveModal }: SignupProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const email = watch("email");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "email-verification",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailHandler = async () => {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });
  };

  return (
    <Dialog
      open={activeModal === "signup"}
      onOpenChange={(open) => setActiveModal(open ? ActiveModal.SIGNUP : null)}
    >
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Enter your details below to create your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              placeholder="cheeseNugget"
              {...register("username")}
            />
            {errors.username && (
              <Alert className="w-full max-w-lg border-destructive/80 bg-destructive/5 text-destructive">
                <AlertTitle>Username error</AlertTitle>
                <AlertDescription className="text-destructive/80">
                  {errors.username.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="nugget@example.com"
              type="email"
            />
            {errors.email && (
              <Alert className="w-full max-w-lg border-destructive/80 bg-destructive/5 text-destructive">
                <AlertTitle>Email error</AlertTitle>
                <AlertDescription className="text-destructive/80">
                  {errors.email.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <VerifyOtp>
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isLoading}
            >
              Create Account
            </Button>
          </VerifyOtp>
          <div className="relative flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
              Or continue with
            </span>
            <Separator className="flex-1" />
          </div>
          <Button className="w-full" variant="outline">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </form>
        <DialogFooter className="sm:justify-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <button
              className="font-medium underline cursor-pointer"
              type="button"
              onClick={() => setActiveModal(ActiveModal.SIGNIN)}
            >
              Sign in
            </button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
