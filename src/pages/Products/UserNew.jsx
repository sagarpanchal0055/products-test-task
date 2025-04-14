import * as React from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constant";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];

export default function UserNew() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const result = await axios.post(`${API_URL}/users`, values);

      if (result && result.data) {
        navigate("/dashboard", { replace: true });
        toast.success("User created successfully");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        backgroundColor: "#f5f5f5",
        color: "#000",
        width: "100%",
        height: "calc(100vh - 64px)",
        padding: "20px",
        minHeight: "100%",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create new user
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          {...register("email", { required: true, maxLength: 20 })}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", { required: true, maxLength: 20 })}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Role"
          helperText="Please select user role"
          {...register("role", { required: true })}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Button variant="contained" type="submit">
        Save
      </Button>
    </Box>
  );
}
