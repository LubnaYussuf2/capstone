import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import io from "socket.io-client";
import axios from "axios";
import StickyNote from "./StickyNote";
import Navbar from "../Navbar/Navbar.js";
import { useNavigate } from "react-router-dom";

const ToDoTask = ({ task, onTakeAction }) => {
  const navigate = useNavigate();

  const handleTakeAction = () => {
    // Redirect to the Campaigns component
    // navigate(`/campaigns/${task.Tourist_ID}`);
    navigate('/campaigns');
  };

  return (
    <Card sx={{ width: "100%", mb: 2, backgroundColor: "#DCD0FF" }}>
      <CardContent>
        <Typography variant="h6">{`Tourist ID: ${task.Tourist_ID}`}</Typography>
        <Typography variant="subtitle1">{`Name: ${task.name}`}</Typography>
        <Typography variant="subtitle1">{`Cluster: ${task.cluster}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleTakeAction}>
          Take Action
        </Button>
      </CardActions>
    </Card>
  );
};

const socket = io("http://localhost:5000");

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userName = "ukoo";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fetchcustomer?page=${currentPage}`
      );
      setToDoTasks(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
      setEditMode(false);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const addNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    socket.on("new_task", (data) => {
      setToDoTasks((prevToDoTasks) => [...prevToDoTasks, data]);
      addNotification(`New task added for Tourist ID: ${data.Tourist_ID}`);
    });

    return () => {
      socket.off("new_task");
    };
  }, [addNotification]);

  return (
    <div style={{ marginLeft: "250px" }}>
      <Navbar
        userName={userName}
        notifications={notifications}
        currentPage="Tasks"
        addNotification={addNotification}
        clearNotifications={clearNotifications}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 2,
          marginTop: "20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setEditMode(!editMode)}
            sx={{
              ml: 1,
            }}
          >
            Add Task
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 1 }}
          >
            Edit
          </Button>
        </Box>

        {editMode && (
          <Box>
            <TextField
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Team meeting at 10:30 AM"
              multiline
              variant="outlined"
              sx={{ width: "100%", mb: 1 }}
            />
            <Button onClick={handleAddTask} variant="contained" sx={{ mr: 1 }}>
              Create Task
            </Button>
            <Button
              onClick={() => setEditMode(false)}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#E6E6FA" }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "#fff" }}>
              To Do
            </Typography>
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {tasks.map((task, index) => (
                  <StickyNote
                    key={index}
                    content={task}
                    onDiscard={() => {
                      const newTasks = [...tasks];
                      newTasks.splice(index, 1);
                      setTasks(newTasks);
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {toDoTasks.map((task, index) => (
                  <ToDoTask
                    key={index}
                    task={task}
                    onTakeAction={() => {
                      console.log(
                        `Taking action on task with Tourist ID: ${task.Tourist_ID}`
                      );
                    }}
                  />
                ))}
              </Box>
              <Box mt={2}>
              <Button
                  onClick={handleFirstPage}
                  variant="outlined"
                  disabled={currentPage === 1}
                  sx={{ p: 0.5, minWidth: "auto", fontSize: "0.75rem", mr: 1 }}
                >
                  {/* Use icons or abbreviations */}
                </Button>
                <Button
                  onClick={() => handlePagination(currentPage - 1)}
                  variant="outlined"
                  disabled={currentPage === 1}
                  sx={{ p: 0.5, minWidth: "auto", fontSize: "0.75rem", mr: 1 }}
                >
                  {/* Use icons or abbreviations */}
                </Button>
                {/* Ensure only positive page numbers are displayed and within the range */}
                {Array.from(
                  { length: Math.min(totalPages, 5) },
                  (_, i) => currentPage - 2 + i
                )
                  .filter((page) => page > 0)
                  .map((page) => (
                    <Button
                      key={page}
                      onClick={() => handlePagination(page)}
                      variant="outlined"
                      sx={{
                        p: 0.5,
                        minWidth: "auto",
                        fontSize: "0.75rem",
                        mr: 1,
                        backgroundColor:
                          currentPage === page ? "#DCD0FF" : "transparent",
                        color: currentPage === page ? "#FFF" : "#000",
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                <Button
                  onClick={() => handlePagination(currentPage + 1)}
                  variant="outlined"
                  disabled={currentPage === totalPages}
                  sx={{ p: 0.5, minWidth: "auto", fontSize: "0.75rem", mr: 1 }}
                >
                  {/* Use icons or abbreviations */}
                </Button>
                <Button
                  onClick={handleLastPage}
                  variant="outlined"
                  disabled={currentPage === totalPages}
                  sx={{ p: 0.5, minWidth: "auto", fontSize: "0.75rem", mr: 1 }}
                >
                  {/* Use icons or abbreviations */}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#98FF98" }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "#fff" }}>
              In Progress
            </Typography>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1">
                This is the In-Progress task list. Here you can see tasks that are currently in progress.
              </Typography>
              <Box mt={2}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">Task 1</Typography>
                    <Typography variant="body2">Description of Task 1</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Take Action</Button>
                  </CardActions>
                </Card>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">Task 2</Typography>
                    <Typography variant="body2">Description of Task 2</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Take Action</Button>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#FFE5B4" }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "#fff" }}>
              Approval
            </Typography>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1">
                This is the Approval task list. Here you can see tasks that are waiting for approval.
              </Typography>
              <Box mt={2}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">Task 3</Typography>
                    <Typography variant="body2">Description of Task 3</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Approve</Button>
                    <Button size="small">Reject</Button>
                  </CardActions>
                </Card>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">Task 4</Typography>
                    <Typography variant="body2">Description of Task 4</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Approve</Button>
                    <Button size="small">Reject</Button>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#87CEFA" }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "#fff" }}>
              Complete
            </Typography>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1">
                This is the Completed task list. Here you can see tasks that have been completed.
              </Typography>
              <Box mt={2}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">Task 5</Typography>
                    <Typography variant="body2">Description of Task 5</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View Details</Button>
                  </CardActions>
                </Card>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">Task 6</Typography>
                    <Typography variant="body2">Description of Task 6</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View Details</Button>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tasks;