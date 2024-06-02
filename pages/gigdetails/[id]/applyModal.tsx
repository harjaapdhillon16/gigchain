import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Input ,Textarea} from "@nextui-org/react";

export function ApplyModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="w-[150px]" color="primary" onPress={onOpen}>
        Apply
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Gig Application
              </ModalHeader>
              <ModalBody>
                <Input type="text" label="Gig Budget - What's your price for doing this gig?" />
                <Input type="text" label="Estimated Timeline to complete the gig" />
                <Textarea type="text" label="Tell us why you are the right person for the gig" />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Submit Application
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApplyModal;