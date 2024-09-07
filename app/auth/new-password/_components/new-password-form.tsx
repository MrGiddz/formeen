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
import { NewPasswordSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import CardWrapper from "@/app/auth/_components/auth-card-wrapper";
import PasswordStrength from "@/app/auth/_components/password-strength";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
import Password from "@/app/auth/_components/password";

type NewPasswordType = z.infer<typeof NewPasswordSchema>;

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isPasswordError, setPasswordError] = useState(false);

  const form = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const submit = (values: NewPasswordType) => {
    if (!isPasswordError) {
      startTransition(() => {
        newPassword(values, token).then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
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
      headerLabel="Enter a secure password"
      backButtonLabel="Back to Sign In"
      backButtonHref="/auth/sign-in"
      headerTitle="Create your new password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
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
                    showSteps={false}
                    password={form.getValues("password")}
                    validate={(error) => {
                      setPasswordError(error);
                    }}
                  />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className="w-full  bg-gray-500 hover:bg-primary/70 hover:text-primary-foreground"
            size="lg"
            type="submit"
            disabled={isPending || isPasswordError}
          >
            Continue
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
