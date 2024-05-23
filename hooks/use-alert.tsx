import { create } from "zustand";

export type AlertType = "publishForm";

interface AlertData {
  action: () => void;
}
interface useAlertProps {
  type: AlertType | null;
  isOpen: boolean;
  data: AlertData;
  onClose: () => void;
  onOpen: (type: AlertType, data?: AlertData) => void;
}

export const useAlert = create<useAlertProps>((set) => ({
  type: null,
  data: {
    action: () => {},
  },
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: { action: () => {} } }),
}));
