import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

export default function Login() {
    const history = useNavigate();
    const dispatch = useAppDispatch();

    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    })
    async function submitForm(data: FieldValues){
        await dispatch(signInUser(data));
        history('/catalog');
    }

    // const [values, setValues] = useState({
    //     username: '',
    //     password: ''
    // })

    // const handleSubmit = (event: any) => {
    //     console.log(values);
    //     event.preventDefault();
    //     agent.Account.login(values);
    // };

    // function handleInputChange(event: any){
    //     const {name, value} = event.target; 
    //     setValues({...values, [name]: value});
    // }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", p: 4 }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register('username', {required: "username is required"})}
              error={!!errors.username}
              helperText={errors?.username?.message?.toString()}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password', {required: "password is required"})}
              error={!!errors.password}
              helperText={errors?.username?.message?.toString()}
            />
            <Button
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}