"use server";

import { db } from "@/lib/db";
import * as z from "zod";

import { ContactSchema } from "@/schemas";

type ContactType = z.infer<typeof ContactSchema>;

export const saveContactDetails = async (values: ContactType) => {
  try {
    const validatedFields = ContactSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    const { name, phone } = validatedFields.data;
    if (phone) {
      const existingPhone = await db.contacts.findUnique({ where: { phone } });
      if (existingPhone) {
        return { error: "Phone number already exists" };
      }
    }
    await db.contacts.create({
      data: {
        name,
        phone,
      },
    });
    return { success: "Phone number saved!" };
  } catch (error) {
    return { error: `An error has occured!` };
  }
};

export const getAllContact = async () => {
  try {
    const contacts = await db.contacts.findMany({
      select: { id: true, name: true, phone: true },
    });
    return { contacts };
  } catch (error) {
    console.log({ error });
    return { error: `An error has occured!` };
  }
};
