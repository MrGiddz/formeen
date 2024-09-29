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
import Confetti from "react-confetti";

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
  const imageRef = useRef<HTMLDivElement | null>(null);
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
                    try {
                      sendmail({
                        to: recipient,
                        fromName: formName,
                        subject: "Registration Successful",
                        text: updatedMessage,
                        html: `<p>${updatedMessage}</p>`,
                      });
                    } catch (error) {
                      console.log("error sending mail", error);
                    }
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
                  try {
                    sendSMS(updatedMessage, recipient);
                  } catch (error) {
                    console.log("error sending sms", error);
                  }
                }
              );
            } catch (error) {
              console.log({ error });
            }
            break;

          case "TextField":
            const elementName = elem.extraAttributes.name;

            if (elementName === "fullname") {
              const name = formValues.current[elem.id];
              setuserName(name);
            }

            break;

          case "ImageField":
            const image = formValues.current[elem.id];
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

    if (!imageCapture) {
      console.error("Image reference is null or undefined.");
      return;
    }

    // Ensure fonts are loaded before starting canvas rendering
    document.fonts.ready
      .then(() => {
        html2canvas(imageCapture, {
          useCORS: true,
          allowTaint: false,
          scrollY: -window.scrollY,
          windowWidth: imageCapture.scrollWidth,
          windowHeight: imageCapture.scrollHeight,
          foreignObjectRendering: false,
          onclone: (clonedDoc) => {
            // Wait for fonts to be ready inside the cloned document
            clonedDoc.fonts.ready
              .then(() => {
                console.log("Fonts are ready inside onclone");
              })
              .catch((error) => {
                console.error("Error waiting for fonts inside onclone", error);
              });
          },
        })
          .then((canvas) => {
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
                  const file = new File(
                    [blob],
                    `${userName} | Super Sunday Africana 2.1.png`,
                    {
                      type: blob.type,
                    }
                  );

                  navigator
                    .share({
                      title:
                        "You are invited to the Special African Praise Sunday",
                      text: "Super Sunday Africana 2.1",
                      files: [file],
                    })
                    .then(() => console.log("Image shared successfully"))
                    .catch((error) =>
                      console.error("Error sharing image", error)
                    );
                })
                .catch((error) => {
                  console.error("Error converting image to blob", error);
                });
            } else {
              console.log("Web Share API is not supported on this browser.");
            }
          })
          .catch((error) => {
            console.error("Error generating canvas", error);
          });
      })
      .catch((error) => {
        console.error("Font loading failed", error);
      });
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
      <>
        <Confetti
          recycle={false}
          numberOfPieces={3000}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div
          className={cn(
            "flex flex-col justify-center w-full h-full items-center p-4 font-['Inter',sans-serif]"
          )}
        >
          <div className="max-w-3xl flex flex-col gap-4 flex-grow bg-background w-full p-8 md:border md:shadow-xl rounded">
            <div className="overflow-hidden">
              <h1 className="text-xl md:text-2xl font-bold z-50">
                Form Submitted
              </h1>
              <p className="text-muted-foreground z-50 text-sm md:text-base">
                Thank you for submitting the form, you can close the form now
              </p>

              <div className="w-full relative flex justify-center items-start overflow-hidden max-h-[300px]  md:max-h-[460px]">
                <div
                  ref={imageRef}
                  className="min-w-[500px] w-[600px] min-h-[450px] h-[450px] origin-center contain-size border scale-[.35] sm:scale-[0.65] md:scale-75 lg:scale-90 border-gray-100 overflow-hidden"
                >
                  <div className="h-[450px] flex flex-col justify-start items-start bg-[#2E3192] relative">
                    <div className="absolute w-full h-full bg-white rounded-t-[585px] rounded-b-[345px] top-[-20%] right-[-15%] -z-0 bg-[url('/bgpattern.jpg')] before:absolute before:w-full before:h-full before:top-0 before:right-0 before:bg-white/75  before:rounded-t-[585px] before:rounded-b-[345px] "></div>

                    <div className="relative px-4 py-2 flex justify-start items-center gap-x-9 z-10">
                      <div className="w-20 h-8 md:w-28 md:h-12 relative flex justify-center items-center">
                        <Image
                          src="/RCCGCJPOBS4.png"
                          alt="rccg-logo"
                          fill
                          sizes="auto"
                          className=""
                        />
                      </div>

                      <div className="z-20 pl-4 self-start">
                        <h1 className="text-[#2E3192] font-bold text-lg relative">
                          RCCG CEASELESS JOY AREA HQ
                        </h1>
                        <h4 className="text-base font-normal relative">
                          Makogi, Magboro Ogun State
                        </h4>
                      </div>
                    </div>

                    <div className="z-10 flex justify-center items-center px-8">
                      <div className="grid grid-cols-9 z-20 pt-12">
                        <div className="col-span-3">
                          <div className="w-40 h-40 flex justify-center items-center rounded-full bg-white aspect-video relative before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:border-l-[30px] before:border-r-[30px] before:border-t-[30px] before:border-transparent before:border-t-white before:bottom-[-24.5px] z-10">
                            <div className="w-[150px] h-[150px] flex justify-center items-center rounded-full">
                              <Image
                                src={userImage || "/avatar.png"}
                                alt="user-image"
                                width={400}
                                height={400}
                                sizes="auto"
                                className="rounded-full object-cover center"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-span-6 relative">
                          <div className="absolute left-1/2 -translate-x-[55%] -translate-y-[25%] w-64 h-48 opacity-10 flex justify-center items-center rounded-full object-contain -z-1">
                            <div className="w-64 h-48  relative">
                              <Image
                                src="/RCCGCJPOBS4.png"
                                alt="RCCGCJ"
                                fill
                                sizes="auto"
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <p className="text-center text-base font-normal relative z-30">
                            I Will Be
                          </p>
                          <h1 className="relative z-30 text-2xl text-center leading-7 font-semibold text-[#2E3192]">
                            Attending Super <br /> Sunday Africana 2.1
                          </h1>
                          <div className="pl-5 py-4 flex flex-col justify-start items-start">
                            <div className="self-start text-end leading-8 col-span-1">
                              <h1 className="text-base font-semibold text-[#2E3192]">
                                Olaniyi Gideon Olamide
                              </h1>
                              <p className="text-sm font-normal text-start">
                                Guest
                              </p>
                            </div>

                            <div className="self-end text-end leading-8 col-span-1">
                              <h1 className="text-base font-medium flex justify-end items-center">
                                <span className="text-[#2E3192] font-semibold pr-1">
                                  Tagged:
                                </span>
                                <span>Jesus The Way Maker</span>
                              </h1>
                              <p className="text-sm font-normal flex justify-end items-center">
                                <span className="pr-1">Date:</span>
                                <span className="self-start">
                                  Nov 24th 2024
                                </span>
                              </p>
                              <p className="text-sm font-normal flex justify-end items-center">
                                <span className="pr-1">Phone Number:</span>
                                <span>+2349033442244</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex justify-end items-center w-full px-1">
                      <div className="flex flex-col justify-center items-center self-end">
                        <div className="p-[2px] bg-white">
                          <div className="w-16 h-16 relative">
                            <Image
                              src="/code.png"
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

                    <div className="text-center w-full self-end">
                      <p className="text-center text-xs text-white self-center">
                        <span>Register: </span>{" "}
                        <a href="https://bit.ly/SuperSundayAfricana2-1">
                          https://bit.ly/SuperSundayAfricana2-1
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 w-full">
              <Button
                className="bg-[#2E3192] col-span-1 hover:text-white group text-base font-normal w-full"
                onClick={handleDownload}
              >
                Share{" "}
                <Share2Icon className="w-4 h-4 pl-1 group-hover:text-white" />
              </Button>
              <Button
                variant="outline"
                className="border col-span-1 w-full border-[#2E3192] text-[#2E3192] text-base font-normal"
              >
                Reregister
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col max-w-3xl justify-center w-full items-center px-2 py-6 mx-auto">
      <div
        key={renderKey}
        className="gap-4 flex-grow bg-background w-full [box-shadow:0px_0px_2px_0px_#00000026] rounded-md"
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
      <div className="flex w-full justify-between gap-4 items-center">
        <Button
          className="mt-8 w-full bg-[#2E3192] font-sm font-light hover:bg-white hover:text-[#2E3192]"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={loading}
        >
          {!loading && "Submit"}
          {loading && <ImSpinner2 className=" animate-spin" />}
        </Button>
        <Button
          className="mt-8 w-full border-[#2E3192] font-sm font-light text-[#2E3192]"
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
