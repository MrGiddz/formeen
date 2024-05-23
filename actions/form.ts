"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateFormSchema } from "@/schemas";
import { Form, FormSubmissions } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

class UserNotFoundError extends Error {
  constructor() {
    super("Invalid user, user not found");

    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export async function GetFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await db.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0,
    bounceRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  if (visits > 0) {
    bounceRate = 100 - submissionRate;
  }

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function GetFormStatsById(id: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await db.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0,
    bounceRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  if (visits > 0) {
    bounceRate = 100 - submissionRate;
  }

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: z.infer<typeof CreateFormSchema>) {
  const validation = CreateFormSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Form entries must be valid");
  }

  const user = await currentUser();

  console.log({ user });

  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;

  const nameExists = await db.form.findFirst({
    where: {
      userId: user.id,
      name,
    },
  });

  console.log({ nameExists });

  if (nameExists) {
    console.log("object");
    throw new Error("Form name already exists");
  }

  console.log({ userId: user.id, name, description, content: "" });

  try {
    const form = await db.form.create({
      data: {
        userId: user.id,
        name,
        description,
        content: "[]",
      },
    });
    return form.id;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function GetForms(): Promise<Form[] | null> {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await db.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return form;
}

export async function GetFormById(id: string): Promise<Form | null> {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await db.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });

  return form;
}

export async function GetFormByFormUrl(formUrl: string) {
  const form = await db.form.update({
    where: {
      shareURL: formUrl,
    },
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return form;
}

export async function UpdateFormContent(
  id: string,
  jsonContent: string
): Promise<Form | null> {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await db.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });

  return form;
}

export async function publishForm(
  id: string,
  jsonContent: string
): Promise<Form | null> {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await db.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
      content: jsonContent,
    },
  });

  return form;
}

export async function SubmitForm(
  formUrl: string,
  jsonContent: string
): Promise<Form | null> {
  const form = await db.form.update({
    where: {
      shareURL: formUrl,
      published: true,
    },
    data: {
      submissions: {
        increment: 1,
      },
      formSubmissions: {
        create: {
          content: jsonContent,
        },
      },
    },
  });

  return form;
}

export async function GetFormWithSubmissions(id: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await db.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      formSubmissions: true,
    }
  });

  return form;
}
