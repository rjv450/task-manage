import React from 'react';
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onEdit, onDelete, onView }) => {
    return (
        <Box
            sx={{
                p: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    backgroundColor: 'blue',
                    color: 'white',
                    p: 1,
                    textTransform: 'uppercase',
                    textAlign: 'center'
                }}
            >
                {status}
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id} // Use _id if that's the correct field
                            task={task}
                            onEdit={() => onEdit(task)}
                            onDelete={() => onDelete(task)}
                            onView={() => onView(task)}
                        />
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary" align="center">
                        No tasks available
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default TaskColumn;
