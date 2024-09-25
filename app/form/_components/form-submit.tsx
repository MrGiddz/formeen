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
import Image from "next/image";
import QRCode from "qrcode";

import html2canvas from "html2canvas";
import { cn } from "@/lib/utils";
import { Inter } from "@/styles/fonts";
import { Share2Icon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FormSubmitProps {
  formUrl: string;
  content: FormElementInstance[];
  formName: string;
  description?: string;
}

const FormSubmit = ({
  formUrl,
  content,
  formName,
  description,
}: FormSubmitProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [loading, startTransition] = useTransition();
  const imageRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [userImage, setuserImage] = useState("");
  const [userName, setuserName] = useState("");

  const [qrCodeUrl, setQrCodeUrl] = useState("");

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

  const AddQueryParam = useCallback(
    (key: string, value: string) => {
      const entries = Array.from(searchParams.entries());
      const paramsObject = Object.fromEntries(entries);
      paramsObject[key] = value;
      const queryString = new URLSearchParams(paramsObject).toString();

      router.push(`${pathname}?${queryString}`);
    },
    [searchParams, pathname]
  );

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
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
      AddQueryParam("submitted", "true");
      const formElements = content as FormElementInstance[];

      console.log({ formElements });

      formElements.forEach((elem) => {
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
            try {
              processField(
                elem,
                formElements,
                formValues.current,
                formName,
                (recipient, updatedMessage) => {
                  console.log({ recipient, updatedMessage });
                  sendSMS(updatedMessage, recipient);
                }
              );
            } catch (error) {
              console.log({ error });
            }
            break;

          case "TextField":
            const elementName = elem.extraAttributes.name;

            if (elementName === "fullname") {
              console.log({ elementName });
              const name = formValues.current[elem.id];
              setuserName(name);
            }

            break;

          case "ImageField":
            const image = formValues.current[elem.id];
            console.log(image);
            setuserImage(image);
            break;
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const generateQRCode = (formUrl: string) => {
    if (formUrl) {
      QRCode.toDataURL(formUrl, function (err, url) {
        if (err) {
          console.error(err);
          return;
        }
        setQrCodeUrl(url);
      });
    }
  };

  const handleDownload = () => {
    const imageCapture = imageRef.current;

    if (imageCapture) {
      // Ensure fonts are loaded before starting canvas rendering
      document.fonts.ready
        .then(() => {
          html2canvas(imageCapture, {
            useCORS: true,
            allowTaint: false,
            scrollY: -window.scrollY,
            foreignObjectRendering: false,
            onclone: (clonedDoc) => {
              clonedDoc.fonts.ready.then(() => {
                console.log("Fonts are ready inside onclone");
              });
            },
          }).then((canvas) => {
            // Convert the canvas to a data URL (base64 encoded PNG)
            const dataUrl = canvas.toDataURL();

            // Download the image
            const link = document.createElement("a");
            link.download = `${userName} | Super Sunday Africana 2.1.png`;
            link.href = dataUrl;
            link.click();

            // Check if the Web Share API is supported
            if (navigator.share) {
              // Convert the data URL to a Blob (required by Web Share API for files)
              fetch(dataUrl)
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], `${userName} | Super Sunday Africana 2.1.png`, {
                    type: blob.type,
                  });

                  navigator
                    .share({
                      title: "You are invited to the Special Afircan Praise Sunday",
                      text: "Super Sunday Africana 2.1",
                      files: [file],
                    })
                    .then(() => console.log("Image shared successfully"))
                    .catch((error) =>
                      console.error("Error sharing image", error)
                    );
                });
            } else {
              console.log("Web Share API is not supported on this browser.");
            }
          });
        })
        .catch((error) => {
          console.error("Font loading failed", error);
        });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Super Sunday Africana",
          text: "Check out this QR Code!",
          url: qrCodeUrl,
        });
        console.log("Successfully shared!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "flex justify-center w-full h-full items-center p-8 font-['Inter',sans-serif]"
        )}
      >
        <div className="max-w-3xl flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
          <h1 className="text-xl md:text-2xl font-bold z-50">Form Submitted</h1>
          <p className="text-muted-foreground z-50 text-xs md:text-sm">
            Thank you for submitting the form, you can close the form now
          </p>
          
          <div ref={imageRef} className="h-full w-full relative overflow-scroll">
            <div className="w-[600px] h-[410px] contain-size border border-gray-100 overflow-hidden">
              <div className="h-[410px] flex flex-col justify-start items-start bg-[#2E3192] relative">
                <div className="absolute w-full h-full bg-white rounded-t-[100px] rounded-b-[230px] top-[-20%] right-[-15%] -z-0">
                  <div className="w-full h-full relative">
                    <div className="absolute"></div>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-[55%] translate-y-[25%] w-56 h-56 opacity-10 bg-white flex justify-center items-center rounded-full object-contain -z-0">
                  <Image
                    src="/c9c58ffd46c83bc4ddfc3884012e4b7e-removebg-preview.png"
                    alt="user-image"
                    fill
                    sizes="auto"
                    className="rounded-full object-cover"
                  />
                </div>

                <div className="px-4 py-2 flex justify-start items-center gap-x-9 z-10">
                  <div className="w-16 h-16 relative rounded-full flex justify-center items-center">
                    <Image
                      src="/c9c58ffd46c83bc4ddfc3884012e4b7e-removebg-preview.png"
                      alt="rccg-logo"
                      fill
                      sizes="auto"
                      className="rounded-full"
                    />
                  </div>

                  <div className="z-20 pl-4 self-start">
                    <h1 className="text-[#2E3192] font-bold text-base relative">
                      RCCG CEASELESS JOY AREA HQ
                    </h1>
                    <h4 className="text-xs font-normal relative">
                      Makogi, Magboro Ogun State
                    </h4>
                  </div>
                </div>

                <div className="z-10 flex justify-center items-center px-8">
                  <div className="grid grid-cols-9 z-20">
                    <div className="col-span-3">
                      <div className="w-52 h-52 flex justify-center items-center rounded-full bg-white aspect-video relative before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:border-l-[30px] before:border-r-[30px] before:border-t-[30px] before:border-transparent before:border-t-white before:bottom-[-24.5px]">
                        <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full">
                          <Image
                            src={
                              userImage ||
                              "/0e613a909f2153262183be70fb312cc1.png"
                            }
                            alt="user-image"
                            width={400}
                            height={400}
                            sizes="auto"
                            className="rounded-full object-center object-scale-down center"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 relative">
                      <p className="text-center text-xs font-normal relative z-30">
                        I Will Be
                      </p>
                      <h1 className="relative z-30 text-lg text-center leading-7 font-medium text-[#2E3192]">
                        Attending Super <br /> Sunday Africana 2.1
                      </h1>
                      <div className="pl-5 py-4 flex justify-between items-center">
                        <div>
                          <h1 className="text-sm font-medium text-[#2E3192]">
                            {userName}
                          </h1>
                          <p className="text-xs font-light">Guest</p>
                        </div>

                        <div className="self-end text-end leading-8">
                          <h1 className="text-sm font-medium">
                            <span className="text-[#2E3192] pr-1">Tagged:</span>
                            <span>Jesus The Way Maker</span>
                          </h1>
                          <p className="text-xs font-normal">
                            <span className="pr-1">Date:</span>
                            <span>Nov 24th 2024</span>
                          </p>
                          <p className="text-xs font-normal">
                            <span className="pr-1">Phone Number:</span>
                            <span>+2349033442244</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-end items-center w-full px-2">
                  <div className="flex flex-col justify-center items-center self-end">
                    <div className="p-2 bg-white">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={qrCodeUrl || "/qrcode.png"}
                          alt="Generated QR Code"
                          fill
                          sizes="auto"
                        />
                      </div>
                    </div>
                    <p className="text-xs font-normal text-center text-white">
                      Scan QR code to register
                    </p>
                  </div>
                </div>

                <div className="text-center w-full">
                  <p className="text-center text-xs text-white self-center">
                    <span>Register: </span>{" "}
                    {`${window.location.origin}/form/${formUrl}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-1 w-full">
            <Button
              className="bg-[#2E3192] hover:text-white group text-xs font-light"
              onClick={handleDownload}
            >
              Share{" "}
              <Share2Icon className="w-4 h-4 pl-1 group-hover:text-white" />
            </Button>
            <Button
              variant="outline"
              className="border border-[#2E3192] text-[#2E3192] text-xs font-light"
            >
              Reregister
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-3xl justify-center w-full items-center p-8 mx-auto">
      <div
        key={renderKey}
        className="gap-4 flex-grow bg-background w-full overflow-y-auto [box-shadow:0px_0px_2px_0px_#00000026] rounded-md"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;

          return (
            <FormElement
              formDescription={
                element.type === "BannerField" ? description : undefined
              }
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
      </div>
      <div className="flex w-full justify-between items-center">
        <Button
          className="mt-8 bg-[#2E3192] font-sm font-light hover:bg-white hover:text-[#2E3192]"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={loading}
        >
          {!loading && "Submit"}
          {loading && <ImSpinner2 className=" animate-spin" />}
        </Button>
        <Button
          className="mt-8 border-[#2E3192] font-sm font-light text-[#2E3192]"
          variant="outline"
          disabled={loading}
        >
          Clear Form
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;