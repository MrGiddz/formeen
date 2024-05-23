"use client";

import PublishFormAlert from "@/components/alerts/publish-form-alert";
import CreateFormAlert from "@/components/modals/create-form-modal";
import PreviewFormAlert from "@/components/modals/preview-form-modal";
import { useEffect, useState } from "react";

export const AlertProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PublishFormAlert />
    </>
  );
};
