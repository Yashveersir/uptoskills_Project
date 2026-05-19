import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import Modal from "./Modal";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={(
        <>
          <Button variant="ghost" onClick={onClose}>{cancelText}</Button>
          <Button variant={isDanger ? "danger" : "primary"} onClick={() => { onConfirm(); onClose(); }}>{confirmText}</Button>
        </>
      )}
    >
      <div className="flex gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isDanger ? "bg-status-error/10 text-status-error" : "bg-status-warning/10 text-status-warning"}`}>
          <AlertTriangle size={24} />
        </div>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
