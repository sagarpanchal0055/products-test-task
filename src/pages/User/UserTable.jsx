import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DenseTable({ rows, fetchUsers }) {
  const navigate = useNavigate();

  const userDeleteHandler = async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    if (response.status !== 200) {
      toast.error("Error deleting user");
      return;
    }
    toast.success("User deleted successfully");
    await fetchUsers();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell
                align=""
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => {
                    navigate(`/dashboard/user-edit/${row.id}`, {
                      replace: true,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    window.confirm(
                      "Are you sure you want to delete this user?"
                    ) && userDeleteHandler(row.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
