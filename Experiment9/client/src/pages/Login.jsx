import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";   // ✅ FIXED

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post("/api/login", data);

      const token = res.data.token;
      localStorage.setItem("token", token);

      // ✅ Decode token
      const decoded = jwtDecode(token);

      // ✅ Role-based redirect
      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch {
      setErrorMsg("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={3}>
        <Typography variant="h4" align="center">Login</Typography>

        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username", { required: "Username required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}