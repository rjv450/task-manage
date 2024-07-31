// createTask.test.js
import { createTask,deleteTask,updateTask,getTasks } from '..//taskController.js';
import Task from '../../models/Task.js';

jest.mock('../../models/Task.js'); // Mock the Task model
describe('createTask', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks to avoid interference
    });

 

    it('should handle errors', async () => {
        // Arrange
        const req = {
            body: {
                taskName: 'Test Task',
                taskDesc: 'This is a test task'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Create a mock implementation for Task to throw an error
        const saveMock = jest.fn().mockRejectedValue(new Error('Database Error'));
        Task.mockImplementation(() => ({
            save: saveMock
        }));

        // Act
        await createTask(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database Error' });
    });

    it('should delete a task and return no content', async () => {
        // Arrange
        const req = {
            params: {
                taskId: 'task-id'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Mock Task.findByIdAndDelete to resolve successfully
        Task.findByIdAndDelete = jest.fn().mockResolvedValue(true); // Or `null` to simulate deletion

        // Act
        await deleteTask(req, res);

        // Assert
        expect(Task.findByIdAndDelete).toHaveBeenCalledWith('task-id');
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
        // Arrange
        const req = {
            params: {
                taskId: 'task-id'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mock Task.findByIdAndDelete to throw an error
        Task.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Database error'));

        // Act
        await deleteTask(req, res);

        // Assert
        expect(Task.findByIdAndDelete).toHaveBeenCalledWith('task-id');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
    it('should handle errors', async () => {
        // Arrange
        const req = {
            params: {
                taskId: 'task-id'
            },
            body: {
                taskName: 'Updated Task Name',
                taskDesc: 'Updated Description',
                status: 2
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mock Task.findByIdAndUpdate to throw an error
        Task.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));

        // Act
        await updateTask(req, res);

        // Assert
        expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
            'task-id',
            { taskName: 'Updated Task Name', desc: 'Updated Description', status: 2 },
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });

    it('should update a task and return the updated task', async () => {
        // Arrange
        const req = {
            params: {
                taskId: 'task-id'
            },
            body: {
                taskName: 'Updated Task Name',
                taskDesc: 'Updated Description',
                status: 2
            }
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Mock Task.findByIdAndUpdate to return the updated task
        const updatedTask = {
            _id: 'task-id',
            taskName: 'Updated Task Name',
            desc: 'Updated Description',
            status: 2
        };

        Task.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTask);

        // Act
        await updateTask(req, res);

        // Assert
        expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
            'task-id',
            { taskName: 'Updated Task Name', desc: 'Updated Description', status: 2 },
            { new: true }
        );
        expect(res.json).toHaveBeenCalledWith(updatedTask);
    });
    it('should create a new task and return it', async () => {
        // Arrange
        const req = {
            body: {
                taskName: 'New Task',
                taskDesc: 'Task Description'
            }
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Mock Task.prototype.save to resolve successfully
        const newTask = {
            _id: 'task-id',
            taskName: 'New Task',
            desc: 'Task Description',
            status: 1,
            save: jest.fn().mockResolvedValue(this)
        };

        Task.mockImplementation(() => newTask); // Mock the Task constructor

        // Act
        await createTask(req, res);

        // Assert
        expect(Task).toHaveBeenCalledWith({
            taskName: 'New Task',
            desc: 'Task Description',
            status: 1
        });
        expect(newTask.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newTask);
    });


});