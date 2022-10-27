import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { signup } from '../service/ApiService';


const theme = createTheme();

export default function SignUp() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const json = {
            email: data.get('email'),
            password: data.get('password'),
            name: data.get('name'),
            phone: data.get('phone'),
            area: data.get('area'),
            sex: (data.get('sex') === 'male' ? false : true),
            birth: data.get('birth')
        };
        //console.log(json);
        signup(json);
    };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="name"
                            label="성명"
                            name="name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="phone"
                            label="연락처"
                            name="phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="area"
                            label="거주지역 (시, 군, 구)"
                            name="area"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">성별</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    id="sex"
                                    name="sex"
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="남" />
                                    <FormControlLabel value="female" control={<Radio />} label="여" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                        id="birth"
                        name="birth"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 190 }}
                        InputLabelProps={{
                        shrink: true,
                        }}/>
                        </Grid>
                    </Grid>

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    회원가입
                    </Button>
                </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}