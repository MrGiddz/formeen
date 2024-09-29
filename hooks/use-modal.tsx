import { FormElementInstance } from "@/app/(dashboard)/forms/builder/_components/form-elements";
import { create } from "zustand";

export type ModalType = "createForm" | "previewForm" | "verifyDetails";

interface ModalData {
  elements?: FormElementInstance[],
  description?: string;
  action?: (() => void) | undefined
}
interface useModalProps {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onClose: () => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
}

export const useModal = create<useModalProps>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
