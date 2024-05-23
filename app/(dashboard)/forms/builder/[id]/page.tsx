import { GetFormById } from "@/actions/form";
import FormBuilder from "@/app/(dashboard)/forms/builder/_components/form-builder";
import React from "react";


async function Builder({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormById(id);

  if (!form) {
    throw new Error("Form not found");
  }



  return <FormBuilder form={form} />;
}

export default Builder;
