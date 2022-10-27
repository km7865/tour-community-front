import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { call } from "../service/ApiService";
import OpenTourList from "./OpenTourList";

function OpenTour(props) {
    const { memberId } = useParams();
    const [tourList, setTourList] = useState([]);

    useEffect(() => {
        call(`/tour/open/${memberId}`, "GET", null)
        .then((response) => {
            setTourList(response.data);
        });
    }, []);
    

    return (<>
        <OpenTourList tourList={tourList} />
    </>);
}

export default OpenTour;