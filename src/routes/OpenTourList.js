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

function OpenTourList(props) {
  const navigate = useNavigate();
  
  const callAsync = async function(tour) {
    try {
      let opener = await call(`/tour/member/${tour.id}`, "GET", null);
      let joiners = await call(`/tourjoin/member/${tour.id}`, "GET", null);
      opener = opener.data;
      joiners = joiners.data;
      navigate("/tour", {state: {tour: tour, opener: opener, joiners: joiners}});
    } catch (e) {
      console.error(e)
    }  
  }

  const onClick = (tour) => {
    callAsync(tour);
  };
  
    return (<>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">여행번호</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">주요활동</TableCell>
              <TableCell align="center">여행일정</TableCell>
              <TableCell align="right">연령대</TableCell>
              <TableCell align="right">성별</TableCell>
              <TableCell align="center">여행상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tourList.map((tour) => (
              <TableRow
                key={tour.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"
                    align="center"
                >
                  {tour.id}
                </TableCell>
                <TableCell align="center"
                    id={tour.id}
                >
                  {/* <a href={`/tour/${tour.id}`} style={{textDecorationLine: 'none', color: 'black', fontWeight: 'bolder'}}>{tour.title}</a> */}
                  <span style={{fontWeight : "bolder", fontSize: "15px",}} onClick={(e) => {onClick(tour);}}>{tour.title}</span>

                  </TableCell>
                <TableCell align="center">{tour.activity}</TableCell>
                <TableCell align="center">{tour.startDate}~{tour.endDate}</TableCell>
                <TableCell align="right">{tour.startAge}~{tour.endAge}세</TableCell>
                <TableCell align="right">{(tour.sex === 1 ? "남" : (tour.sex === 2 ? "여" : "무관"))}</TableCell>
                <TableCell align="center">{(tour.status === 'FINDING' ? '모집중' : '모집완료')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>);
}

export default OpenTourList;