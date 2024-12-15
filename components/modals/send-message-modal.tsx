"use client";

import { Modal } from "@/components/modal";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";
import { z } from "zod";
import { SendMessageSchema } from "@/schemas";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { sendmail, sendSMS } from "@/actions/send-notification";

type SendMessageType = z.infer<typeof SendMessageSchema>;

const SendMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "sendMessage";
  const form = useForm<SendMessageType>({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      message: "",
      medium: "none",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isLoading, isSubmitted, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: SendMessageType) => {
    console.log({ values, data });

    if (data.receipients) {
      await Promise.all(
        data.receipients.map(async (receipient) => {
          let response = null;
          if (values.medium !== "none") {
            const message = receipient.name
              ? values.message.replace("#name", receipient.name)
              : values.message;

            if (values.medium === "phone")
              response = await sendSMS(message, receipient.phone as string);

            if (values.medium === "email")
              response = await sendmail({
                to: receipient.email as string,
                fromName: "Ceaselessjoy Dynamites",
                text: message,
                html: message,
                subject: "Reminder: Super Sunday Africana is Tomorrow! 🎉",
              });
            return { response, ...receipient };
          }
          return { ...receipient, response };
        })
      );
    }
  };

  return (
    <Modal
      modalTitle="Enter Message"
      description="Enter the message you want to send to all registered persons and select medium."
      onOpenChange={onClose}
      open={isModalOpen}
      footer={
        <div className="flex items-center justify-between w-full">
          <Button
            className=""
            disabled={isLoading}
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading || !isValid}
            variant="secondary"
            className=""
          >
            {(!isSubmitting || !isLoading) && <span>Next</span>}
            {(isSubmitting || isLoading) && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form className="space-y-2">
          <div className="px-4 my-3">
            <FormField
              control={control}
              name="message"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-foreground/70 placeholder:text-muted-foreground"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormDescription>
                      To insert their name, use #name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="medium"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-foreground">Medium</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={data.medium || field.value}
                        onValueChange={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
                      >
                        {["phone", "email", "none"].map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2 py-1"
                          >
                            <RadioGroupItem
                              value={option}
                              id={option}
                              disabled={
                                data.medium === "none" && option !== "none"
                              }
                              className="text-base h-5 w-5"
                            />
                            <Label htmlFor={option} className="text-sm">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default SendMessageModal;
