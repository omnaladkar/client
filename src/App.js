import React, { useState } from "react";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import "./App.css";

const App = () => {
    const [tasks, setTasks] = useState([
        { _id: 1, task: "Task 1", description: "Description for Task 1", completed: false },
        { _id: 2, task: "Task 2", description: "Description for Task 2", completed: true },
        
    ]);
    const [currentTask, setCurrentTask] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleChange = (e) => {
        setCurrentTask(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setCurrentDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            _id: Date.now(),
            task: currentTask,
            description: currentDescription,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setCurrentTask("");
        setCurrentDescription("");
    };

    const handleTaskClick = (taskId) => {
        const selectedTask = tasks.find(task => task._id === taskId);
        setCurrentDescription(selectedTask.description);
    };

    const handleDelete = (taskId) => {
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
    };

    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId);
    };

    const handleEditChange = (e) => {
        setCurrentTask(e.target.value);
    };

    const handleUpdate = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task._id === taskId) {
                return { ...task, task: currentTask };
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditingTaskId(null);
        setCurrentTask('');
    };

    const handleCheckboxChange = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task._id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="App flex">
            <Paper elevation={3} className="container">
                <div className="heading">Tasks</div>
                <form
                    onSubmit={handleSubmit}
                    className="flex"
                    style={{ margin: "15px 0" }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ width: "80%" }}
                        value={currentTask}
                        required={true}
                        onChange={handleChange}
                        placeholder="Add New TO-DO"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ width: "80%" }}
                        value={currentDescription}
                        onChange={handleDescriptionChange}
                        placeholder="Add Description"
                    />
                    <Button
                        style={{ height: "40px" }}
                        color="primary"
                        variant="outlined"
                        type="submit"
                    >
                        Add task
                    </Button>
                </form>
                <div>
                    {tasks.map((task) => (
                        <Paper
                            key={task._id}
                            className="flex task_container"
                            onClick={() => handleTaskClick(task._id)}
                        >
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleCheckboxChange(task._id)}
                                color="primary"
                            />
                            {editingTaskId === task._id ? (
                                <TextField
                                    value={currentTask}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                <div
                                    className={
                                        task.completed
                                            ? "task line_through"
                                            : "task"
                                    }
                                >
                                    {task.task}
                                </div>
                            )}
                            <Button
                                onClick={() => handleDelete(task._id)}
                                color="secondary"
                            >
                                delete
                            </Button>
                            {editingTaskId === task._id ? (
                                <Button
                                    onClick={() => handleUpdate(task._id)}
                                    color="primary"
                                >
                                    Update
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleEditClick(task._id)}
                                    color="primary"
                                >
                                    Edit
                                </Button>
                            )}
                        </Paper>
                    ))}
                </div>
                <Paper className="description_container">
                    <h3>Description:</h3>
                    <p>{currentDescription}</p>
                </Paper>
            </Paper>
        </div>
    );
};

export default App;
