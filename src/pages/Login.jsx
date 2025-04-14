import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../utils/constant";
import { useAuth } from "../context/AuthProvider";

export default function BasicTextFields() {
  const { register, handleSubmit } = useForm();
  const { loginAction } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const result = await axios.get(
        `${API_URL}/users?name=${values.username}&author=${values.password}`
      );
      if (result && result.data.length > 0) {
        const user = result.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        loginAction(user);
        navigate(user.role === "admin" ? "/dashboard" : "/products", {
          replace: true,
        });
        toast.success("Login successful");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          padding: "20px",
        }}
      >
        <Typography variant="h5">Welcome back</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              {...register("username", { required: true, maxLength: 20 })}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              {...register("password", { required: true, maxLength: 20 })}
            />
          </Box>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
