import { Button, Modal } from "flowbite-react";

const MyModal = ({
  header,
  body,
  handleChange,
  handleDecline,
  openModal,
  setOpenModal,
}: any) => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer className="flex justify-around">
        <Button
          onClick={() => {
            handleChange();
            setOpenModal(false);
          }}
          gradientDuoTone="greenToBlue"
        >
          Change
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
