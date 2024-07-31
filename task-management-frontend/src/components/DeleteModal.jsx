import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const DeleteModal = ({ open, onClose, onDelete, task }) => {
  const handleDelete = () => {
    onDelete(task._id); // Ensure that `task._id` is correctly passed and exists
    onClose(); // Close the modal after deletion
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete the task "{task.taskName}"?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
