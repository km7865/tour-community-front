import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMaps from "./GoogleMaps";

function MapWrapper(props) {
    const GOOGLE_KEY = "1234567890";
    const render = (status) => {
        return <h1>{status}</h1>;
    };

    return (
        <Wrapper apiKey={GOOGLE_KEY} render={render}>
            <GoogleMaps onMarked={props.onMarked} latLng={props.latLng}/>
        </Wrapper>
    );
}

export default MapWrapper;
