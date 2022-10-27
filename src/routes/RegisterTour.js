import { useParams } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import MapWrapper from "./MapWrapper";
import { call } from "../service/ApiService";

const theme = createTheme();

export default function RegisterTour(props) {
    const { memberId } = useParams();
    const [ departure, setDeparture ] = React.useState({});
    const [ destination, setDestination ] = React.useState({});
    
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const defaultDate = year + '-' + month + '-' + day;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const json = {
            memberId: memberId,
            title: data.get('title'),
            contents: data.get('contents'),
            activity: data.get('activity'),
            startAge: data.get('startAge'),
            endAge: data.get('endAge'),
            capacity: data.get('capacity'),
            sex: (data.get('sex') === 'male' ? 1 : (data.get('sex') === 'female' ? 2 : 3)),
            startDate: data.get('startDate'),
            endDate: data.get('endDate'),
            departureAddr: departure.addr,
            departureLat: departure.lat,
            departureLng: departure.lng,
            destinationAddr: destination.addr,
            destinationLat: destination.lat,
            destinationLng: destination.lng,
        };
        console.log(json);

        
        call("/tour", "POST", json)
        .then((response) => {
            console.log(response);
            window.alert("개설 완료.");
            window.location.href = "/";
        });
    };

    const onCancel = (e) => {
        window.location.href = "/";
    }

    const onDepartureMarked = (lat, lng, addr) => {
        setDeparture({lat: lat, lng: lng, addr: addr});
    }

    const onDestinationMarked = (lat, lng, addr) => {
        setDestination({lat: lat, lng: lng, addr: addr});
    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Typography component="h1" variant="h5">
                    여행 개설
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/* 왼쪽부 */}
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}
                                rowSpacing={5}>
                                <Grid item xs={12} sm={12}>
                                    <h3>입력</h3>
                                    <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="제목"
                                    name="title"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    name="contents"
                                    label="내용"
                                    id="contents"
                                    multiline
                                    rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="activity"
                                    label="주요활동"
                                    name="activity"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="startAge"
                                    label="최소나이"
                                    name="startAge"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="endAge"
                                    label="최대나이"
                                    name="endAge"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="capacity"
                                    label="최대 인원"
                                    name="capacity"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
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
                                            <FormControlLabel value="all" control={<Radio />} label="무관" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                    id="startDate"
                                    name="startDate"
                                    label="시작일"
                                    type="date"
                                    defaultValue={defaultDate}
                                    sx={{ width: 178 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                    id="endDate"
                                    name="endDate"
                                    label="종료일"
                                    type="date"
                                    defaultValue={defaultDate}
                                    sx={{ width: 178 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* 오른쪽부 */}
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <h3>출발지 설정</h3>
                                    <MapWrapper onMarked={onDepartureMarked} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <h3>도착지 설정</h3>
                                    <MapWrapper onMarked={onDestinationMarked} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            개설
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onCancel}
                            >
                            취소
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}