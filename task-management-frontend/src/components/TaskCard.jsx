import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

const TaskCard = ({ task, onEdit, onDelete, onView }) => {
    return (
        <Paper
            sx={{
                mb: 2,
                p: 2,
                backgroundColor: 'lightblue',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: '200px', // Increased height for better content fit
                overflow: 'hidden', // Ensure content does not overflow
            }}
        >
            <Typography variant="h6" sx={{ mb: 1 }}>{task.taskName}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{task.desc}</Typography>
            <Typography
                variant="caption"
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: 8,
                    color: 'textSecondary'
                }}
            >
                Created: {task.createdAt}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                position: 'absolute',
                bottom: 8,
                right: 8,
                gap: 1
            }}>
                <Button variant="contained" color="error" size="small" onClick={() => onDelete(task)}>Delete</Button>
                <Button variant="contained" color="primary" size="small" onClick={() => onEdit(task)}>Edit</Button>
                <Button variant="contained" color="info" size="small" onClick={() => onView(task)}>View Details</Button>
            </Box>
        </Paper>
    );
};

export default TaskCard;
