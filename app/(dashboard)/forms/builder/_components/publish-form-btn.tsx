import React from "react";
import { Button } from "@/components/ui/button";
import { MdOutlinePublish } from "react-icons/md";
import { useAlert } from "@/hooks/use-alert";
import { toast } from "@/components/ui/use-toast";
import { publishForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import { useDesigner } from "../_hooks/use-designer";

type Props = {
  id: string;
};

function PublishFormBtn({ id }: Props) {
  const {elements} = useDesigner()
  const { onOpen, onClose } = useAlert();
  const router = useRouter();
  async function PublishForm() {
    try {
      const jsonElements = JSON.stringify(elements)
      await publishForm(id, jsonElements);
      toast({
        title: "Success!",
        description: "Form published successfully",
      });
      onClose();
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, form not published.",
        variant: "destructive",
      });
    }
  }
  return (
    <Button
      variant="outline"
      className="gap-x-2"
      onClick={() => {
        onOpen("publishForm", { action: PublishForm });
      }}
    >
      <MdOutlinePublish className="h-6 w-6" />
      Publish
    </Button>
  );
}

export default PublishFormBtn;
