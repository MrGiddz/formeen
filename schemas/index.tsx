import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum of 8 characters is required",
  }),
  code: z.optional(z.string().min(4)),
  rememberme: z.boolean().default(false),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum of 8 characters is required",
  }),
  firstname: z.string().min(2, {
    message: "First name is required",
  }),
  lastname: z.string().min(2, {
    message: "Last name is required",
  }),
  toc: z.literal(true, {
    errorMap: () => ({
      message: "Please accept terms and conditions",
    }),
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum of 8 characters is required",
  }),
});

export const CreateFormSchema = z.object({
  name: z.string().min(4, {
    message: "Minimum of 4 characters is required",
  }),
  description: z.string().optional(),
  expiryDate: z.date(),
  sendReminder: z.boolean().default(true),
  hasFlier: z.boolean().default(true),
  daysOfReminder: z.array(z.string()).default([]),
  banner: z.string().optional(),
});
export const PreviewFormSchema = z.object({
  name: z.string().min(4, {
    message: "Minimum of 4 characters is required",
  }),
  description: z.string().optional(),
});

export const ContactSchema = z.object({
  name: z.string(),
  phone: z.string(),
});
