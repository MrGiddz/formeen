"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { BsFileEarmarkPlus } from "react-icons/bs";

const CreateFormBtn = () => {
  const { onOpen } = useModal();

  return (
    <Button
      className="group border border-primary/20 h-[190px] px-4 items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
      onClick={() => onOpen("createForm", {})}
      variant="ghost-outline"
    >
      <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
      <p className="font-bold text-base text-muted-foreground group-hover:text-primary">
        Create new form
      </p>
    </Button>
  );
};

export default CreateFormBtn;
