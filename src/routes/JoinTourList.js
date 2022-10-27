import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { call } from '../service/ApiService';

function JoinTourList(props) {
    const navigate = useNavigate();
    const callAsync = async function(item) {
      let opener = await call(`/tour/member/${item.tour.id}`, "GET", null);
      opener = opener.data;

      navigate("/tour", {state:{tour:item.tour, status:item.status, opener: opener, joiners: []}});
    }

    const onClick = (item) => {
      callAsync(item);
    };

    return (<>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">참여번호</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">주요활동</TableCell>
              <TableCell align="center">여행일정</TableCell>
              <TableCell align="right">연령대</TableCell>
              <TableCell align="right">성별</TableCell>
              <TableCell align="center">참여상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.joinTourList.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"
                    align="center"
                >
                  {item.id}
                </TableCell>
                <TableCell align="center"
                    id={item.id}
                > 
                <span style={{fontWeight : "bolder", fontSize: "15px",}} onClick={() => {onClick(item)}}>{item.tour.title}</span>
                </TableCell>
                <TableCell align="center">{item.tour.activity}</TableCell>
                <TableCell align="center">{item.tour.startDate}~{item.tour.endDate}</TableCell>
                <TableCell align="right">{item.tour.startAge}~{item.tour.endAge}세</TableCell>
                <TableCell align="right">{(item.tour.sex === 1 ? "남" : (item.tour.sex === 2 ? "여" : "무관"))}</TableCell>
                <TableCell align="center">{(item.status === 'JOIN' ? '참여' : '취소')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>);
}

export default JoinTourList;