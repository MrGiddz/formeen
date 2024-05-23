"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import * as z from "zod";

import { SignupSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerficationEmail } from "@/lib/mail";



type SignUpType = z.infer<typeof SignupSchema>;


export const signUp = async ({ values }: { values: SignUpType }) => {
  try {
    const validatedFields = SignupSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
  
    const { email, password, firstname, lastname } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }
  
  
    await db.user.create({
      data: {
        email,
        name: `${firstname} ${lastname}`,
        firstname,
        lastname,
        password: hashedPassword,
      },
    });
  
    // TODO : send verification token email
    const verificationToken  = await generateVerificationToken(email);

    await sendVerficationEmail(verificationToken.email, verificationToken.token)

  
    return { success: "Confirmation Email sent!" };
    
  } catch (error) {
    console.log({error})
    return { error: `An error has occured!` };
  }
};
