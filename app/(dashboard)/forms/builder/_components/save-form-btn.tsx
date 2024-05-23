import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { HiSaveAs } from "react-icons/hi";
import { useDesigner } from "../_hooks/use-designer";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "@/components/ui/use-toast";
import { FaSpinner } from "react-icons/fa";

type Props = {
  id: string
};

function SaveFormBtn({id}: Props) {
  const {elements} = useDesigner()
  const [loading, startTransition] = useTransition();

  const updateFormContent = async() => {
    try {
      const jsonElements = JSON.stringify(elements)
      await UpdateFormContent(id, jsonElements)
      toast({
        title: "Success",
        description: "Your form has been saved"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    }
  }
  return (
    <Button variant="outline" className="gap-x-2" onClick={() => {
      startTransition(updateFormContent)
    }}>
      <HiSaveAs className="h-6 w-6" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;
