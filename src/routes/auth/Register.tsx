import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import {
  Paper,
  Button,
  TextField,
  Link,
  Box,
  Typography
} from "@mui/material";

import RegisterIcon from '@mui/icons-material/DriveFileRenameOutline';

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = {
      username: name,
      password: password,
      full_name: fullName,
      email: email,
    };
    axios
      .post("/auth/users/register", data)
      .then((response) => {
        console.log(response);
        navigate('/login');
      });
  };

  return(
    <Box sx={{ m: 8 }}>
      <Typography variant="h2">
        Register
        <RegisterIcon fontSize="inherit"/>
      </Typography>

      <Paper
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          margin: 'auto',
          marginBottom: 2,
          width: 'max-content',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ m: 1 }}
          type="text"
          value={fullName}
          label="Full Name"
          name="fullName"
          autoComplete="name"
          autoFocus
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          type="text"
          value={email}
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          type="text"
          value={name}
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          type="password"
          value={password}
          name="password"
          label="Password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ m: 1 }}
          type="submit"
          value="Submit"
        >
          Register
        </Button>

      </Paper>

      Already registered?
      <Link
        component={RouterLink}
        to="/login">Login</Link>
    </Box>
  )
}

export default Register;
