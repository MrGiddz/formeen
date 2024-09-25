import { GetFormByFormUrl, GetFormById } from "@/actions/form";
import { FormElementInstance } from "@/app/(dashboard)/forms/builder/_components/form-elements";
import React from "react";
import FormSubmit from "../_components/form-submit";

async function SubmitPage({ params }: { params: { formUrl: string } }) {
  const { formUrl } = params;
  const form = await GetFormByFormUrl(formUrl);
  if (!form) {
    throw new Error("Form not found");
  }

  console.log({ description: form.description });
  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmit
      formUrl={formUrl}
      content={formContent}
      formName={form.name}
      description={form.description}
    />
  );
}

export default SubmitPage;
