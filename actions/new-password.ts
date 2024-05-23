"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

type NewPasswordType = z.infer<typeof NewPasswordSchema>;

export const newPassword = async (
  values: NewPasswordType,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if(!existingToken) {
    return {error: "Invalid token!"}
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if(hasExpired) {
    return {error: "Expired token!"}
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if(!existingUser) {
    return {error: "Email does not exist!"}
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.update({
    where: {
        id: existingUser.id,
    },
    data: {
        password: hashedPassword
    }
  })

  await db.passwordresetToken.delete({
    where: {
        id: existingToken.id
    }
  })

  return {success: "Password updated!"}

};
