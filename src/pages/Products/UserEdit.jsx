import * as React from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

export default function UserEdit() {
  const params = useParams();
  const [currentUser, setCurrentUser] = React.useState(null);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      password: currentUser?.password,
      role: currentUser?.role,
    },
    values: currentUser,
  });
  const navigate = useNavigate();

  const values = watch();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${params.id}`);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  React.useEffect(() => {
    if (!params.id) {
      navigate("/dashboard", { replace: true });
      return;
    }
    fetchUser();
  }, [params?.id]);

  const onSubmit = async (values) => {
    try {
      const result = await axios.patch(`${API_URL}/users/${params.id}`, values);

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
          value={values?.role || ""}
          {...register("role", { required: true })}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => navigate(`/dashboard`)}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
}
