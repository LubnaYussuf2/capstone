import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, AppBar, Toolbar, Typography, IconButton, Avatar, Stack, Card, CardActions, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StickyNote from './StickyNote'; // Make sure the path is correct
import io from 'socket.io-client'; // Import the io function

const ToDoTask = ({ task, onTakeAction }) => {
  return (
    <Card sx={{ width: '100%', mb: 2, backgroundColor: '#DCD0FF' }}>
      <CardContent>
        <Typography variant="h6">{`Tourist ID: ${task.Tourist_ID}`}</Typography>
        <Typography variant="subtitle1">{`Name: ${task.name}`}</Typography>
        <Typography variant="subtitle1">{`Cluster: ${task.cluster}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onTakeAction}>Take Action</Button>
      </CardActions>
    </Card>
  );
};

const socket = io('http://localhost:5000'); 

const Tasks = () => {
  // Initialize with a placeholder task
  const [tasks, setTasks] = useState(['Team meeting at 10:30 AM']);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  // Initialize with a placeholder for To Do task
  const [toDoTasks, setToDoTasks] = useState([{
    Tourist_ID: 7000,
    name: 'Rebecca Johnson',
    cluster: 1
  }]);
  const userName = "ukoo"; 

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
      setEditMode(false);
    }
  };

  useEffect(() => {
    socket.on('new_task', (data) => {
      setToDoTasks((prevToDoTasks) => [...prevToDoTasks, data]);
    });

    return () => {
      socket.off('new_task');
    };
  }, []);

  return (
    <div style={{ marginLeft: '250px' }}> {/* Adjust marginLeft if necessary */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0 , color: "black", fontWeight: "bold" }}>
            Tasks
          </Typography>
          <Stack direction="row" spacing={0} alignItems="center">
            <TextField
              placeholder="Search..."
              size="medium"
              variant="standard"
              sx={{ borderBottom: '1px solid', borderRadius: 0, minWidth: '30ch' }}
            />
            <IconButton color="disabled" aria-label="filter" sx={{ mr: 5 }}>
              <FilterListIcon />
            </IconButton>
          </Stack>
          <IconButton color="disabled" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
              Welcome, {userName}
          </Typography>
          <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Box to Add New Task */}
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setEditMode(!editMode)}
            sx={{
              mb: 2,
              alignSelf: 'flex-start',
            }}
          >
            Add Task
          </Button>

          {editMode && (
            <Box>
              <TextField
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Team meeting at 10:30 AM"
                multiline
                variant="outlined"
                sx={{ width: '100%', mb: 1 }}
              />
              <Button onClick={handleAddTask} variant="contained" sx={{ mr: 1 }}>
                Create Task
              </Button>
              <Button onClick={() => setEditMode(false)} variant="contained" color="secondary">
                Cancel
              </Button>
            </Box>
          )}
        </Box>

        {/* Display Sticky Notes for Added Tasks */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {tasks.map((task, index) => (
            <StickyNote key={index} content={task} onDiscard={() => {
              const newTasks = [...tasks];
              newTasks.splice(index, 1);
              setTasks(newTasks);
            }} />
          ))}
        </Box>
        
        {/* Display To Do Tasks */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {toDoTasks.map((task, index) => (
            <ToDoTask
              key={index}
              task={task}
              onTakeAction={() => {
                console.log(`Taking action on task with Tourist ID: ${task.Tourist_ID}`);
                // Logic for "Take Action"
              }}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Tasks;
