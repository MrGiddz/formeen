"use client";

import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/use-modal";
import { z } from "zod";
import { PreviewFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { FormElements } from "@/app/(dashboard)/forms/builder/_components/form-elements";

type PreviewFormModalType = z.infer<typeof PreviewFormSchema>;

const PreviewFormModal = () => {
  const { toast } = useToast();
  const { isOpen, onClose, type, data } = useModal();
  const { elements } = data;

  console.log({elementsPreview: elements})

  const isModalOpen = isOpen && type === "previewForm";
  const form = useForm<PreviewFormModalType>({
    resolver: zodResolver(PreviewFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: PreviewFormModalType) => {
    try {
      toast({
        title: "Form created!!!",
        description: "Form was successfully created",
      });
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
      onOpenChange={onClose}
      open={isModalOpen}
      variant="large"
      className="gap-0 max-h-screen h-full max-w-screen-2xl flex-col flex-grow p-0"
    >
      <div className="px-4 py-2 border-b">
        <p className="text-lg font-bold text-muted-foreground">Form Preview</p>
        <p className="text-sm text-muted-foreground">
          {" "}
          This is how your form will look like to visitors
        </p>
      </div>
      <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
        <div className="flex flex-col w-full max-w-[620px] gap-4 flex-grow bg-background h-full rounded-2xl p-8 overflow-y-auto">
          {elements?.map((element) => {
            const FormComponent = FormElements[element.type].formComponent;
            return <FormComponent key={element.id} elementInstance={element} />;
          })}
        </div>
      </div>
    </Modal>
  );
};

export default PreviewFormModal;
