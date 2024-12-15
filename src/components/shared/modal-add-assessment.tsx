import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

type TPopupModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  renderModal: (onClose: () => void) => React.ReactNode;
};

export default function PopupModalAssessment({ renderModal }: TPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <Button className="flex-col space-y-3 bg-slate-200 hover:bg-slate-400 dark:bg-slate-800 p-3 rounded-xl min-h-64 hover:text-white text-black " onClick={() => setIsOpen(true)}>
        <Plus className="h-12 w-12 " />
        <div className="font-bold text-xl ">
          <h3>Add new module</h3>
        </div>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} className={"!bg-background !px-1"}>
        <ScrollArea className="h-[80dvh] px-6  ">{renderModal(onClose)}</ScrollArea>
      </Modal>
    </>
  );
}
