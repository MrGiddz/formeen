"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

type ResetType = z.infer<typeof ResetSchema>;

export const reset = async (values: ResetType) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  const mail = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  if (mail.success) {
    return { success: mail.success };
  }
  return { error: mail.error };
};
