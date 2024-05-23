"use client";

import React from "react";
import { MdPreview } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useDesigner } from "../_hooks/use-designer";

type Props = {};

function PreviewDialogBtn({}: Props) {
  const { onOpen } = useModal();
  const { elements } = useDesigner();
  console.log({elements})
  return (
    <Button
      variant="outline"
      className="gap-x-2"
      onClick={() => onOpen("previewForm", { elements })}
    >
      <MdPreview className="h-6 w-6" />
      Preview
    </Button>
  );
}

export default PreviewDialogBtn;
