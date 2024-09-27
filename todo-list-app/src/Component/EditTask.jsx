import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import axios from "axios";

const EditTask = ({ onClose, task }) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      if (task && task._id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/tasks/${task._id}`
          );
          const fetchedTask = response.data;
          setAssignedTo(fetchedTask.assignedTo || "");
          setStatus(fetchedTask.status || "");
          setDueDate(fetchedTask.dueDate?.split("T")[0] || "");
          setPriority(fetchedTask.priority || "");
          setDescription(fetchedTask.comments || "");
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      }
    };

    fetchTask();
  }, [task]);

  const handleSave = async () => {
    const updatedTask = {
      assignedTo,
      status,
      dueDate,
      priority,
      comments: description,
    };

    try {
      const response = await axios.patch(
        `http://localhost:5000/tasks/${task._id}`,
        updatedTask
      );
      console.log("Task updated successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!task) return null;

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{ border: "2px solid #DCDCDC", width: "640px", overflow: "hidden" }}
      >
        <Box
          sx={{
            textAlign: "center",
            padding: "15px",
            borderBottom: "1.5px solid #DCDCDC",
            backgroundColor: "#F7F7F7",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Edit Task
          </Typography>
        </Box>
        <Box sx={{ padding: "15px" }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <Typography
                    variant="body1"
                    style={{ marginBottom: "5px", fontWeight: "bold" }}
                  >
                    Assigned To <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select User
                    </MenuItem>
                    <MenuItem value="User 1">User 1</MenuItem>
                    <MenuItem value="User 2">User 2</MenuItem>
                    <MenuItem value="User 3">User 3</MenuItem>
                    <MenuItem value="User 4">User 4</MenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <Typography
                    variant="body1"
                    style={{ marginBottom: "5px", fontWeight: "bold" }}
                  >
                    Status <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Status
                    </MenuItem>
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  style={{ marginBottom: "5px", fontWeight: "bold" }}
                >
                  Due Date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="Select Due Date"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <Typography
                    variant="body1"
                    style={{ marginBottom: "5px", fontWeight: "bold" }}
                  >
                    Priority <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Priority
                    </MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  style={{ marginBottom: "5px", fontWeight: "bold" }}
                >
                  Comments
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add comments"
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ffeeba",
                  color: "#000",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "4px",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditTask;
