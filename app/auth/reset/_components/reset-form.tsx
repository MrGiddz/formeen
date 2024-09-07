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
import { Input } from "@/components/ui/input";
import { ResetSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import CardWrapper from "@/app/auth/_components/auth-card-wrapper";
import { reset } from "@/actions/reset";

type ResetType = z.infer<typeof ResetSchema>;

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const submit = (values: ResetType) => {
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter the email address you registered with"
      backButtonLabel="Back to Sign In"
      backButtonHref="/auth/sign-in"
      headerTitle="Reset password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
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
                          className="border-none focus-visible:ring-0 focus-visible:outline-none shadow-none"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
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
            disabled={isPending}
          >
            Continue
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
