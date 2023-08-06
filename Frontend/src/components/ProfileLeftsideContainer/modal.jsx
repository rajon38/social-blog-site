import { Modal as BootstrapModal, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const Modal = ({ show, onClose, actionButton }) => {
    return (
        <BootstrapModal show={show} onHide={onClose}>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>Title</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>body</BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button variant="danger" onClick={onClose}>
                    Close
                </Button>
                {actionButton}
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;
