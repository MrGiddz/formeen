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
import { Button } from "../ui/button";

type PreviewFormModalType = z.infer<typeof PreviewFormSchema>;

const VerifyDetailsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { elements, description } = data;

  console.log({ type });

  const isModalOpen = isOpen && type === "verifyDetails";

  return (
    <Modal
      onOpenChange={onClose}
      open={isModalOpen}
      variant="large"
      className="gap-0 h-56 w-[320px] flex-col flex-grow p-0"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button className="" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              data.action && data.action();
              onClose();
            }}
            variant="secondary"
            className=""
          >
            Submit
          </Button>
        </div>
      }
    >
      <div className="px-4 pt-8">
        <p className="text-lg font-bold">
          Kindly verify your details before you submit
        </p>
        <p className="text-sm text-muted-foreground py-5">
          Are you sure to submit?
        </p>
      </div>
    </Modal>
  );
};

export default VerifyDetailsModal;
