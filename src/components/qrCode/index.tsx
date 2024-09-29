import { Modal } from "flowbite-react";
import QRCode from "qrcode.react";

const QRCodeComponent = ({ value, openModal, setOpenModal }: QRCodeProps) => {
  const fullUrl = window.location.href;
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>QR Code</Modal.Header>
      <Modal.Body>
        <div className="flex justify-center p-2 w-56 mx-auto bg-white rounded-xl">
          <QRCode value={`${fullUrl}/${value}`} size={200} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QRCodeComponent;

interface QRCodeProps {
  value: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}
