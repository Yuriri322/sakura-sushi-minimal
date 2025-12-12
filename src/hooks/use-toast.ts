import { toast as sonnerToast } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

const toast = ({ title, description, variant }: ToastProps) => {
  if (variant === "destructive") {
    return sonnerToast.error(title || description || "Error");
  }
  return sonnerToast.success(title || description || "Success");
};

export { toast };
export const useToast = () => ({ toast });