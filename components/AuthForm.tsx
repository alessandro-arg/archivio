"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signIn } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";
import { useRouter, useSearchParams } from "next/navigation";

const authFormSchema = (formType: FormType) => {
  return z.object({
    fullName:
      formType === "sign-up"
        ? z
            .string()
            .min(2, { message: "Name must be at least 2 characters" })
            .max(50)
        : z.string().optional(),
    email: z.email().min(2, {
      message: "Email must be valid",
    }),
  });
};

type FormType = "sign-in" | "sign-up";

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [cameFromSignIn, setCameFromSignIn] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res =
        type === "sign-up"
          ? await createAccount({
              fullName: data.fullName || "",
              email: data.email,
            })
          : await signIn({ email: data.email });

      if (
        type === "sign-in" &&
        (!res?.accountId || res?.error === "User not found")
      ) {
        router.push(`/sign-up?email=${encodeURIComponent(data.email)}`);
        return;
      }

      setAccountId(res.accountId);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (type !== "sign-up") return;

    const emailFromQuery = searchParams.get("email");
    if (!emailFromQuery) return;

    form.setValue("email", emailFromQuery, { shouldValidate: true });
    setCameFromSignIn(true);

    window.history.replaceState({}, "", "/sign-up");
  }, [type, searchParams, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign in" : "Sign up"}
          </h1>
          {cameFromSignIn && !form.formState.errors.fullName && (
            <p className="text-sm text-brand dark:text-brand/90 -mt-4">
              Please add your full name to create an account.
            </p>
          )}
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="rounded-2xl"
          >
            {!isLoading && (type === "sign-in" ? "Sign in" : "Sign up")}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100 dark:text-light-300">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </form>
      </Form>
      {/* OTP Verification */}
      {accountId && (
        <OTPModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
