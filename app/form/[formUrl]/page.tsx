import { GetFormByFormUrl, GetFormById } from "@/actions/form";
import { FormElementInstance } from "@/app/(dashboard)/forms/builder/_components/form-elements";
import React from "react";
import FormSubmit from "../_components/form-submit";

function isExpired(expiryDate: Date) {
  const now = new Date(); 
  const expiry = new Date(expiryDate);

  return now > expiry; // Returns true if the current date is past the expiry date
}

async function SubmitPage({ params }: { params: { formUrl: string } }) {
  const { formUrl } = params;
  const form = await GetFormByFormUrl(formUrl);
  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];


  const isFormExpired =  isExpired(form.expiryDate!)

  console.log({isFormExpired})

  return (
    <FormSubmit
      formUrl={formUrl}
      content={formContent}
      formName={form.name}
      description={form.description}
      formExipred={isFormExpired}
    />
  );
}

export default SubmitPage;
