import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import { API_URL } from "../../utils/constant";

export default function User() {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
        color: "#000",
        padding: "20px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Users
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/user-new")}
        >
          Add user
        </Button>
      </Stack>

      <UserTable rows={users} fetchUsers={fetchUsers} />
    </Box>
  );
}
