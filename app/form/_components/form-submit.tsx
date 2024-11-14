"use client";
import { Button } from "@/components/ui/button";
import {
  FormElementInstance,
  FormElements,
} from "../../(dashboard)/forms/builder/_components/form-elements";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";
import { sendmail, sendSMS } from "@/actions/send-notification";
import Image from "next/image";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { cn } from "@/lib/utils";
import { ArrowDown, Share2Icon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import { useModal } from "@/hooks/use-modal";

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
  const [userStatus, setuserStatus] = useState("");
  const { onOpen } = useModal();
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

          case "RadioField":
            const fieldValue = formValues.current[elem.id];
            setuserStatus(fieldValue);
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
          windowWidth: 2048,
          windowHeight: 1152,
          scale: 3,
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
          })
          .catch((error) => {
            console.error("Error generating canvas", error);
          });
      })
      .catch((error) => {
        console.error("Font loading failed", error);
      });
  };

  const handleShare = () => {
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
          windowWidth: 2048,
          windowHeight: 1152,
          scale: 3,
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

  if (submitted) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
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
                  <div className="h-[450px] flex flex-col justify-start items-start bg-[#2E3192] relative overflow-hidden">
                    <div className="absolute w-full h-full bg-white rounded-t-[700px] rounded-b-[600px] top-[-20%] right-[-15%] -z-0 bg-[url('/bgpattern.jpg')] before:absolute before:w-full before:h-full before:top-0 before:right-0 before:bg-white/75  before:rounded-t-[700px] before:rounded-b-[600px] "></div>

                    <div className="relative px-4 pt-2 flex justify-start items-center gap-x-9 z-10">
                      <div className="w-20 h-8 md:w-24 md:h-10 relative flex justify-center items-center object-contain">
                        <Image
                          src="/RCCGCJPOBS4.png"
                          alt="rccg-logo"
                          width={90}
                          height={40}
                          sizes="auto"
                          className="object-contain"
                        />
                      </div>
                      <div className="z-20 self-start flex flex-col justify-start items-start">
                        <h1 className="text-[#2E3192] font-bold text-lg relative m-0 p-0">
                          RCCG CEASELESS JOY AREA HQ
                        </h1>
                        <h4 className="text-base font-normal relative">
                          Makogi, Magboro Ogun State
                        </h4>
                      </div>
                    </div>

                    <div className="z-10 flex justify-center items-center px-8">
                      <div className="grid grid-cols-9 z-20 pt-2">
                        <div className="col-span-3 flex flex-col justify-end relative">
                          <div className="w-40 h-40 flex justify-center items-center rounded-full bg-white aspect-video relative before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:border-l-[40px] before:border-r-[40px] before:border-t-[40px] before:border-transparent before:border-t-white before:bottom-[-28px] before:-z-[5] z-10">
                            <div className="w-[155px] h-[155px] p-[2px] flex justify-center items-center rounded-full overflow-hidden">
                              <Image
                                src={
                                  userImage ||
                                  "/avatar.png"
                                }
                                alt="user-image"
                                width={400}
                                height={400}
                                sizes="auto"
                                className="rounded-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-6 relative">
                          <div className="absolute left-1/2 -translate-x-[55%] -translate-y-0 w-[28rem] h-[10rem] opacity-10 flex justify-center items-center rounded-full object-contain -z-1">
                            <div className="w-[32rem] h-[11rem] relative aspect-video flex justify-center items-center">
                              <Image
                                src="/RCCGCJPOBS4.png"
                                alt="RCCGCJ"
                                width={400}
                                height={225}
                                sizes="auto"
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <p className="text-center text-sm font-normal relative z-30 mt-3">
                            I Will Be Attending
                          </p>
                          <h1 className="relative z-30 text-xl text-center leading-7 font-semibold text-[#2E3192]">
                            Super Sunday Africana 2.1
                          </h1>
                          <div className="pl-5 pt-4 flex flex-col justify-start items-start">
                            <div className="self-start text-end leading-8 col-span-1">
                              <h1 className="text-lg font-semibold text-[#2E3192]">
                                {userName}
                              </h1>
                              <p className="text-sm font-normal text-start">
                                {userStatus || "Guest"}
                              </p>
                            </div>
                            <div className="self-end text-end leading-8 px-[2px] py-3 col-span-1">
                              <h1 className="text-sm font-medium flex justify-end items-center">
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
                                <span className="pr-1">
                                  For more Info, call{" "}
                                </span>
                                <span>+2349033442244</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-end items-center w-full mt-2">
                      <div className="flex flex-col justify-center items-center self-end">
                        <div className="w-28 h-28 relative grid grid-cols-1 grid-rows-1 p-[1px] rounded bg-white">
                          <Image
                            src="https://res.cloudinary.com/dwks1ttmv/image/upload/v1730669484/New_QRCode_y472uc.png"
                            alt="Generated QR Code"
                            fill
                            className="col-span-1 object-cover"
                            sizes="auto"
                          />
                        </div>

                        <p className="text-xs font-normal text-center text-white px-1">
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
            <div className="grid md:grid-cols-3 gap-3 w-full">
              <Button
                className="bg-[#2E3192] col-span-1 hover:text-white group text-base font-normal w-full"
                onClick={handleDownload}
              >
                Download{" "}
                <ArrowDown className="w-4 h-4 pl-1 group-hover:text-white" />
              </Button>
              <Button
                className="bg-[#2E3192] col-span-1 hover:text-white group text-base font-normal w-full"
                onClick={handleShare}
              >
                Share{" "}
                <Share2Icon className="w-4 h-4 pl-1 group-hover:text-white" />
              </Button>
              <Button
                variant="outline"
                className="border col-span-1 w-full border-[#2E3192] text-[#2E3192] text-base font-normal"
                onClick={() => setSubmitted(false)}
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
          onClick={() =>
            onOpen("verifyDetails", {
              action() {
                startTransition(submitForm);
              },
            })
          }
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
