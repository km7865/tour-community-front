import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { call } from "../service/ApiService";
import JoinTourList from "./JoinTourList";

function JoinTour(props) {
    const { memberId } = useParams();
    const [joinTourList, setJoinTourList] = useState([]);

    useEffect(() =>{
        call(`/tourjoin/${memberId}`, "GET", null)
        .then((response) => {
            let tours = [];
            response.data.forEach((item) => {
                tours.push(item.tour);
            });
            setJoinTourList(response.data);
            console.log(response.data);
        });
    }, []);

    return (<>
        <JoinTourList joinTourList={joinTourList}/>
    </>);
}

export default JoinTour;