// TaskForm.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskForm = ({ show, handleClose }) => {
  const [taskDetails, setTaskDetails] = useState({
    assignedTo: 'User 1',
    status: 'Not Started',
    priority: 'Normal',
    dueDate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Task Saved:', taskDetails);
    handleClose(); // Close modal on save
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAssignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control as="select" name="assignedTo" value={taskDetails.assignedTo} onChange={handleChange}>
              <option>User 1</option>
              <option>User 2</option>
              <option>User 3</option>
              <option>User 4</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="status" value={taskDetails.status} onChange={handleChange}>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="dueDate" value={taskDetails.dueDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" name="priority" value={taskDetails.priority} onChange={handleChange}>
              <option>Normal</option>
              <option>High</option>
              <option>Low</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={taskDetails.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
