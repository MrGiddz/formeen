"use client";

import { useAlert } from "@/hooks/use-alert";
import { Alert } from "../alert";
import { toast } from "../ui/use-toast";

const PublishFormAlert = () => {
  const { isOpen, onClose, type, data } = useAlert();

  const isModalOpen = isOpen && type === "publishForm";

  return (
    <Alert
      open={isModalOpen}
      onOpenChange={onClose}
      title="Are you really sure?"
      description={
        <div className="flex flex-col justify-between gap-2">
          <span className="my-5 text-sm text-rose-400">
            This action is permanent and cannot be undone. You will not be able
            to edit this form after submitting.
          </span>
     
          <span className="font-xs">
            By Publishing this form you will make it available to the public and
            you will be able to collect submissions.
          </span>
        </div>
      }
      action={data.action}
    />
  );
};

export default PublishFormAlert;
