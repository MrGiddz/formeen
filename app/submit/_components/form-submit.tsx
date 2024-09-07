"use client";
import { Button } from "@/components/ui/button";
import {
  FormElementInstance,
  FormElements,
} from "../../(dashboard)/forms/builder/_components/form-elements";
import { HiCursorClick } from "react-icons/hi";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

interface FormSubmitProps {
  formUrl: string;
  content: FormElementInstance[];
}

const FormSubmit = ({ formUrl, content }: FormSubmitProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [loading, startTransition] = useTransition();

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      console.log("object");

      toast({
        title: "Error",
        description: "Please check your form for errors",
        variant: "destructive",
      });

      return;
    }
    try {
      const jsonElements = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonElements);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-3xl flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">Thank you for submitting the form, you can close the form now</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-3xl flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8 dark:bg-zinc-200 dark:hover:text-primary-foreground dark:hover:bg-zinc-100"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={loading}
        >
          {!loading && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {loading && <ImSpinner2 className=" animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
