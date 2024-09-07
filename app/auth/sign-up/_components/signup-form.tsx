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
import { SignupSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { signUp } from "@/actions/sign-up";
import PasswordStrength from "../../_components/password-strength";
import CardWrapper from "../../_components/auth-card-wrapper";
import Password from "../../_components/password";

type SignUpType = z.infer<typeof SignupSchema>;

const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isPasswordError, setPasswordError] = useState(false);

  const form = useForm<SignUpType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      toc: undefined,
    },
  });

  const submit = (values: SignUpType) => {
    if (!isPasswordError) {
      startTransition(() => {
        signUp({ values }).then((data) => {
          setSuccess(data.success);
          setError(data.error);
          if (data.success) {
            form.reset();
          }
        });
      });
    } else {
      form.setError("password", {
        type: "manual",
        message: "Password does not meet the requirements",
      });
    }
  };

  return (
    <CardWrapper
      headerLabel="Fill In Your Details Below."
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/sign-in"
      headerTitle="Let's Get You Started"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <div className="group relative">
                      <div className="flex items-center justify-center rounded-md space-x-2 shadow-sm border border-input focus-within:border-primary dark:bg-black focus-within:shadow-sm">
                        <Input
                          type="text"
                          placeholder="First Name"
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
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <div className="group relative">
                      <div className="flex items-center justify-center rounded-md space-x-2 shadow-sm border border-input focus-within:border-primary focus-within:shadow-sm dark:bg-black">
                        <Input
                          type="text"
                          placeholder="Last Name"
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="group relative">
                      <div className="flex items-center justify-center rounded-md space-x-2 shadow-sm border border-input focus-within:border-primary dark:bg-black focus-within:shadow-sm">
                        <Input
                          type="text"
                          placeholder="email@example.com"
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
                  <PasswordStrength
                    showSteps={true}
                    password={form.getValues("password")}
                    validate={(error) => {
                      setPasswordError(error);
                    }}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toc"
              render={({ field }) => (
                <>
                  <FormItem className="flex items-center gap-x-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]: bg-gray-500 border-gray-500 dark:data-[state=checked]:bg-white dark:border-white"
                      />
                    </FormControl>
                    <FormLabel className="!m-0 cursor-pointer">
                      I agree to the terms and conditions
                    </FormLabel>
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className="w-full  bg-gray-500 dark:bg-white hover:bg-primary/70 hover:text-primary-foreground"
            size="lg"
            type="submit"
            disabled={isPending}
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUpForm;
