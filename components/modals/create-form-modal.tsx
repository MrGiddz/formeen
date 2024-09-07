"use client";

import { Modal } from "@/components/modal";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";
import { z } from "zod";
import { CreateFormSchema } from "@/schemas";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CreateForm } from "@/actions/form";
import { useRouter } from "next/navigation";

type CreateFormModalType = z.infer<typeof CreateFormSchema>;

const CreateFormModal = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "createForm";
  const form = useForm<CreateFormModalType>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isLoading, isSubmitted, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: CreateFormModalType) => {
    try {
      const formUrl = await CreateForm(values);
      toast({
        title: "Form created!!!",
        description: "Form was successfully created",
      });
      onClose();
      console.log({ formUrl });
      router.push(`/forms/builder/${formUrl}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong, please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Modal
      modalTitle="Create New Form"
      description="Create a new form and start getting notifications instantly."
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
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-foreground">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-foreground/70 placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-foreground/70 placeholder:text-muted-foreground"
                        {...field}
                        rows={5}
                      />
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

export default CreateFormModal;
