import { GetFormByFormUrl, GetFormById } from "@/actions/form";
import { FormElementInstance } from "@/app/(dashboard)/forms/builder/_components/form-elements";
import FormSubmit from "@/app/submit/_components/form-submit";
import React from "react";

async function SubmitPage({ params }: { params: { formUrl: string } }) {
  const { formUrl } = params;
  const form = await GetFormByFormUrl(formUrl);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  console.log({formContent})
  return <FormSubmit formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;
