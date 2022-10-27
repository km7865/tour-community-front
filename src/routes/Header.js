import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signout } from '../service/ApiService';

function Header(props) {
    let menus = (<></>);

    const onSignOutBtnClick = (e) => {
        signout();
    };

    const onSignInBtnClick = (e) => {
        window.location.href = "/signin";
    }

    const onSignUpBtnClick = (e) => {
        window.location.href = "/signup";
    }

    const onRegisterBtnClick = (e) => {
        window.location.href = `/registerTour/${localStorage.getItem("USER_KEY")}`;
    }

    const onOpenBtnClick = (e) => {
        window.location.href = `/open/${localStorage.getItem("USER_KEY")}`;
    }

    const onJoinBtnClick = (e) => {
        window.location.href = `/join/${localStorage.getItem("USER_KEY")}`;
    }

    if (localStorage.getItem("ACCESS_TOKEN") !== "") {
        menus = (<div>
            <Button color="inherit"
            onClick={onRegisterBtnClick}
            >여행 개설</Button>
            <Button color="inherit"
            onClick={onOpenBtnClick}
            >개설 여행 조회</Button>
            <Button color="inherit"
            onClick={onJoinBtnClick}
            >참여 여행 조회</Button>
            <Button color="inherit"
            onClick={onSignOutBtnClick}
            >로그아웃</Button>
        </div>);
    } else {
        menus = (<div>
            <Button color="inherit"
            onClick={onSignInBtnClick}
            >로그인</Button>
            <Button color="inherit"
            onClick={onSignUpBtnClick}
            >회원가입</Button>
        </div>);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <a href="/" style={{textDecorationLine: 'none', color: 'white', fontWeight: 'normal' }}>Tour Community</a>
                    </Typography>
                    {menus}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;