import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ConfirmModal({ show, handleClose, handleConfirm, action }) {
    const [reason, setReason] = useState('');

    const onConfirm = () => {
      handleConfirm(reason);
      handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{action} User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formReason">
              <Form.Label>Please provide a reason:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

