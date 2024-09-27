import { Grid, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const DeleteTask = ({ task, onClose, fetchTasks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${task._id}`);
      await fetchTasks();
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Grid container maxWidth="600px" style={{ border: "2px solid #DCDCDC" }}>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#C70039",
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Delete</Typography>
        </Grid>

        <Grid item xs={12} style={{ padding: "20px", textAlign: "left" }}>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            {`Do you want to delete task ${task?.assignedTo}?`}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "right", padding: 25 }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: "10px",
              width: "100px",
              backgroundColor: "#4CAF50",
            }}
            onClick={onClose}
          >
            No
          </Button>
          <Button
            color="black"
            style={{ width: "100px", backgroundColor: "#ffeeba" }}
            onClick={handleDelete}
          >
            Yes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeleteTask;
