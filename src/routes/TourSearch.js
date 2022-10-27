import { Button, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { call } from "../service/ApiService";
import MapWrapper from "./MapWrapper";

function TourSearch(props) {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const defaultDate = year + '-' + month + '-' + day;

    const [ departure, setDeparture ] = React.useState({});
    const [ destination, setDestination ] = React.useState({});

    const [ sex, setSex ] = React.useState(0);
    const [ startDate, setStartDate ] = React.useState("");
    const [ endDate, setEndDate ] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        
        let url = "/tour/search?";

        if (data.get('title') !== "") url += `title=${data.get('title')}&`;
        if (data.get('activity') !== "") url += `activivty=${data.get('activity')}&`;
        if (data.get('startAge') !== "") url += `startAge=${data.get('startAge')}&`;
        if (data.get('endAge') !== "") url += `endAge=${data.get('endAge')}&`;
        if (data.get('capacity') !== "") url += `capacity=${data.get('capacity')}&`;
        if (sex > 0) url += `sex=${sex}&`;
        if (startDate !== "") url += `startDate=${startDate}&`;
        if (endDate !== "") url += `endDate=${endDate}&`;
        if (departure.lat) {
            url += `departureLat=${departure.lat}&`;
            url += `departureLng=${departure.lng}&`;
        }
        if (destination.lat) {
            url += `destinationLat=${destination.lat}&`;
            url += `destinationLng=${destination.lng}&`;
        }

        console.log(url);
        
        call(url, "GET", null)
        .then((response) => {
            console.log(response);
            props.setTourList(response.data);
        });
    };
    
    const onSexChanged = (e) => {
        const value = e.currentTarget.value;
        setSex((value === 'male' ? 1 : (value === 'female' ? 2 : 3)));
    }

    const onStartDateChanged = (e) => {
        const value = e.currentTarget.value;
        setStartDate(value);
    }

    const onEndDateChanged = (e) => {
        const value = e.currentTarget.value;
        setEndDate(value);
    }

    const onDepartureMarked = (lat, lng, addr) => {
        setDeparture({lat: lat, lng: lng, addr: addr});
    }

    const onDestinationMarked = (lat, lng, addr) => {
        setDestination({lat: lat, lng: lng, addr: addr});
    }

    return (<>
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/* 왼쪽부 */}
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}
                                rowSpacing={5}>
                                <Grid item xs={12} sm={12}>
                                    <h3>검색항목</h3>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                    fullWidth
                                    id="title"
                                    label="제목"
                                    name="title"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                    fullWidth
                                    id="activity"
                                    label="주요활동"
                                    name="activity"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                    fullWidth
                                    id="startAge"
                                    label="최소나이"
                                    name="startAge"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                    fullWidth
                                    id="endAge"
                                    label="최대나이"
                                    name="endAge"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
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
                                            onChange={onSexChanged}
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
                                    onChange={onStartDateChanged}
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
                                    onChange={onEndDateChanged}
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
                                    <h3>출발지</h3>
                                    <MapWrapper onMarked={onDepartureMarked} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <h3>도착지</h3>
                                    <MapWrapper onMarked={onDestinationMarked} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            검색
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    </>);
}

export default TourSearch;