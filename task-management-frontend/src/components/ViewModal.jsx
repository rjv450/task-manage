import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const ViewModal = ({ open, onClose, task }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Name: {task.taskName}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>Description: {task.desc}</Typography>
        <Typography variant="caption">Created: {task.createdAt}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
