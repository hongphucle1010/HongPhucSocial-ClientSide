import { Button, Modal, Spinner } from "flowbite-react";
import { useLoadingSpinner } from "../../hooks/loadingSpinner";

type MyModalProps = {
  header: string;
  body: any;
  handleChange: () => Promise<void>;
  handleDecline: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

const MyModal = ({
  header,
  body,
  handleChange,
  handleDecline,
  openModal,
  setOpenModal,
}: MyModalProps) => {
  const [btnText, toggleLoading] = useLoadingSpinner(
    <span>Change</span>,
    <Spinner color="info" />
  );
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer className="flex justify-around">
        <Button
          onClick={async () => {
            toggleLoading();
            await handleChange();
            toggleLoading();
            setOpenModal(false);
          }}
          gradientDuoTone="greenToBlue"
        >
          {btnText}
        </Button>
        <Button
          color="failure"
          onClick={() => {
            handleDecline();
            setOpenModal(false);
          }}
        >
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
