import React, { useState } from "react";
import axios from 'axios';
import {
  Paper,
  Button,
  TextField,
  Box,
  Typography
} from "@mui/material";

import LoginIcon from '@mui/icons-material/Login';

function Login() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    if (evt) {
      evt.preventDefault();
    }
    const params = new URLSearchParams()
    params.append('username', name)
    params.append('password', password)
    const login = async () => {
      let res = await axios
        .post('/auth/jwt/token', params)
        .then((res) => {
          console.log(res);
          localStorage.setItem('jwt_token', res.data.access_token);
          return res;
        });
      return res;
    };
    let x = await login();
    if (x) {
      window.location.reload();
    }
  };

  return(
    <Box sx={{ m: 8 }}>
      <Typography variant="h2">
        Login
        <LoginIcon fontSize="inherit"/>
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
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ m: 1 }}
          type="submit"
          value="Submit"
        >
          Login
        </Button>
      </Paper>
    </Box>
  )
}

export default Login;
