import * as React from 'react';
import { call } from '../service/ApiService';
import TourSearch from './TourSearch';
import TourList from './TourList';
import TourMaps from './TourMaps';

function Main(props) {
    const [tourList, setTourList] = React.useState([]);

    React.useEffect(() => {
        call("/tour/search", "GET", null)
        .then((response) => {
            setTourList(response.data);
        });
    }, []);

    return (<div>
      <TourList tourList={tourList} />
      <TourSearch setTourList={setTourList}/>
      </div>);
}

export default Main;