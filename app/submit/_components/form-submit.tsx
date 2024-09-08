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
import { sendmail, sendSMS } from "@/actions/send-notification";

interface FormSubmitProps {
  formUrl: string;
  content: FormElementInstance[];
  formName: string;
}

const FormSubmit = ({ formUrl, content, formName }: FormSubmitProps) => {
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

  const processField = (
    elem: FormElementInstance,
    formElements: FormElementInstance[],
    formValues: { [key: string]: string },
    formName: string,
    sendFunction: (
      recipient: string,
      updatedMessage: string,
      formName?: string
    ) => void
  ) => {
    const pointer = elem.extraAttributes.pointerVariable;
    const pointerObject = formElements.find(
      (e) => e.extraAttributes.name === pointer
    );

    if (pointerObject) {
      const pointerValue = formValues[pointerObject.id];
      console.log({ pointerValue });
      const updatedMessage = elem.extraAttributes.message.replace(
        `#${pointer}#`,
        pointerValue
      );

      sendFunction(formValues[elem.id], updatedMessage, formName);
    }
  };

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    console.log({ content });

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
      console.log(formValues.current);
      const jsonElements = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonElements);
      setSubmitted(true);
      const formElements = content as FormElementInstance[];

      formElements.forEach((elem) => {
        console.log({ type: elem.type });
        switch (elem.type) {
          case "EmailField":
            try {
              processField(
                elem,
                formElements,
                formValues.current,
                formName,
                (recipient, updatedMessage, formName) => {
                  if (formName) {
                    sendmail({
                      to: recipient,
                      fromName: formName,
                      subject: "Registration Successful",
                      text: updatedMessage,
                      html: `<p>${updatedMessage}</p>`,
                    });
                  }
                }
              );
            } catch (error) {
              console.log({ error });
            }
            break;

          case "PhoneField":
            console.log("here");
            try {
              processField(
                elem,
                formElements,
                formValues.current,
                formName,
                (recipient, updatedMessage) => {
                  sendSMS(updatedMessage, recipient);
                }
              );
            } catch (error) {
              console.log({ error });
            }
            break;
        }
      });
      console.log({ formElements });
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
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close the form now
          </p>
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
