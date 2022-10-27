import { Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { call } from '../service/ApiService';
import MapWrapper from "./MapWrapper";

function TourDetail(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const memberId = localStorage.getItem("USER_KEY");
    const [tour, setTour] = useState(location.state.tour);

    const [people, setPeople] = useState(0);

    let buttons = (<></>);

    const onCompleteBtnClicked = (e) => {
        call(`/tour/complete/${tour.id}`, "GET", null)
        .then((response) => {
            window.alert("Finding complete!");
            window.location.href = "/";
        })
        .catch((error) => {
            window.alert(error.error);
        });
    }

    const onBackBtnClicked = (e) => {
        navigate(-1);
    }

    const onJoinBtnClicked = (e) => {
        const body = {
            tourId: tour.id,
            memberId: memberId,
        };

        call(`/tourjoin`, "POST", body)
        .then((response) => {
            console.log(response);
            window.alert("Join completed!");
            window.location.href = "/";
        })
        .catch((error) => {
            window.alert(error.error);
        });
    }

    const onCancelBtnClicked = (e) => {
        window.alert("Cancel Tour.");
    }

    if (memberId == location.state.tour.memberId) {
        buttons = (<>
            <Grid item xs={12} sm={6}>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onCompleteBtnClicked}
                >
                모집완료
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onBackBtnClicked}
                >
                돌아가기
                </Button>
            </Grid>
            </>);
    } else {
        if (location.state.status) {
            buttons = (<>
                <Grid item xs={12} sm={6}>
                    <Button
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onCancelBtnClicked}
                    >
                    참여취소
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onBackBtnClicked}
                    >
                    돌아가기
                    </Button>
                </Grid>
            </>)
        } else {
            buttons = (<>
                <Grid item xs={12} sm={6}>
                    <Button
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onJoinBtnClicked}
                    >
                    참여하기
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onBackBtnClicked}
                    >
                    돌아가기
                    </Button>
                </Grid>
            </>)
        }
    }

    let users = (<></>);
    if (location.state.opener) {
        if (memberId == location.state.tour.memberId) {
            users = (<>
                <Grid item xs={12} sm={12}>
                    -개설자-
                </Grid>
                <Grid item xs={12} sm={12}>
                    <span style={{ fontWeight: "bolder", fontSize: "15px" }}>{location.state.opener.name} / {location.state.opener.phone}</span>
                </Grid>
                <Grid item xs={12} sm={12}>
                    -참여자-
                </Grid>
                {location.state.joiners.map((item) => {
                    return (
                    <Grid item xs={12} sm={12} key={item.id}>
                        {item.name} / {item.phone}
                    </Grid>
                    );
                })}
            </>);
        } else {
            users = (<>
                <Grid item xs={12} sm={12}>
                    -개설자-
                </Grid>
                <Grid item xs={12} sm={12}>
                    <span style={{ fontWeight: "bolder", fontSize: "15px" }}>{location.state.opener.name} / {location.state.opener.phone}</span>
                </Grid>
            </>);
        }
        
    }

    useEffect(() => {
        call(`/tourjoin/count/${tour.id}`, "GET", null)
        .then((response) => {
            setPeople(response.data);
        });
    }, []);

    return (<>
        <Container component="main" maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <h1>{tour.title}</h1>
                    {/* 좌측 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            제목: {tour.title}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            내용: {tour.contents}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            주요활동: {tour.activity}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            일정: {tour.startDate} ~ {tour.endDate}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            연령대: {tour.startAge} ~ {tour.endAge}세
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            성별: {(tour.sex === 1 ? "남" : (tour.sex === 2 ? "여" : "무관"))}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            상태: {(tour.status === 'FINDING' ? "모집중" : (tour.status === 'FOUND' ? "모집완료" : "취소"))}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            참여인원: {people}/{tour.capacity}
                        </Grid>
                        {users}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* 우측 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                        <h4>출발지: {tour.departureAddr}</h4>
                        <MapWrapper latLng={{ lat: tour.departureLat, lng: tour.departureLng }}/>
                        </Grid>
                        
                        <Grid item xs={12} sm={12}>
                        <h4>도착지: {tour.destinationAddr}</h4>
                        <MapWrapper latLng={{lat: tour.destinationLat, lng: tour.destinationLng }}/>
                        </Grid>
                    </Grid>
                </Grid>
                {buttons}
            </Grid>
        </Container>
    </>);
}

export default TourDetail;