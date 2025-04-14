import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, Stack } from "@mui/material";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductsTable({ rows, fetchUsers }) {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction={"row"}
        // justifyContent="center"
        flexWrap={"wrap"}
        flexGrow={1}
        gap={2}
        sx={{ mb: 2 }}
      >
        {rows.map((row) => (
          <Box
            key={row.name}
            border={"1px solid #ccc"}
            p={2}
            width={"200px"}
            borderRadius={2}
          >
            <img src={row.image} width="150px" height={"100px"} />
            <h3>{row.name}</h3>
            <p>${row.price}</p>
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
                onClick={() => {}}
              >
                Add to cart
              </Button>
            </TableCell>
          </Box>
        ))}
      </Stack>
    </>
  );
}
