"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import CardWrapper from "./auth-card-wrapper";
import { newVerification } from "@/actions/new-verification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/sign-in"
      headerTitle="Verify your Email"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {!success && <FormError message={error} />}

        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
