"use client";

import CreateFormModal from "@/components/modals/create-form-modal";
import PreviewFormModal from "@/components/modals/preview-form-modal";
import VerifyDetailsModal from "@/components/modals/verify-details-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateFormModal />
      <PreviewFormModal />
      <VerifyDetailsModal />
    </>
  );
};
