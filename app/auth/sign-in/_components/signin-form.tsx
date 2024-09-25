"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { signInUser } from "@/actions/sign-in";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import CardWrapper from "@/app/auth/_components/auth-card-wrapper";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Password from "../../_components/password";
import { Lato } from "@/styles/fonts";

type LoginType = z.infer<typeof LoginSchema>;

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);
  const [showtwoFactor, setShowTwofactor] = useState<boolean>(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberme: false,
    },
  });

  const submit = (values: LoginType) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signInUser(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwofactor(data?.twoFactor);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back! Please enter your details to continue."
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
      headerTitle="Log in to your account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            {showtwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <div className="group relative">
                        <div className="flex items-center justify-center rounded-md space-x-2 shadow-sm border border-input focus-within:border-primary focus-within:shadow-sm">
                          <Input
                            type="number"
                            placeholder="123456"
                            disabled={isPending}
                            {...field}
                            className="border-none focus-visible:ring-0 focus-visible:outline-none shadow-none"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showtwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <div className="flex items-center justify-center rounded-md space-x-2 shadow-sm border border-input focus-within:border-primary focus-within:shadow-sm">
                            <Input
                              type="text"
                              placeholder="email@example.com"
                              disabled={isPending}
                              {...field}
                              className="border-none focus-visible:ring-0 focus-visible:outline-none shadow-none dark:bg-black"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Password isPending={isPending} field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 place-items-between space-x-2 py-4">
                  <FormField
                    control={form.control}
                    name="rememberme"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]: bg-gray-500 border-gray-500 dark:data-[state=checked]:bg-white dark:border-white"
                          />
                        </FormControl>
                        <FormLabel
                          className={cn(
                            "!m-0 text-xs md:text-sm font-normal",
                            Lato.className
                          )}
                        >
                          Remember for 30 days
                        </FormLabel>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className={cn(
                      "!m-0 text-xs md:text-sm px-0 flex justify-end",
                      Lato.className
                    )}
                  >
                    <Link href="/auth/reset">Forgot Password?</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            className="w-full  bg-gray-500 dark:bg-white dark:hover:bg-slate-200  hover:bg-primary/70 hover:text-primary-foreground"
            size="lg"
            type="submit"
            disabled={isPending}
          >
            {showtwoFactor ? "Confirm" : "Log In"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignInForm;
