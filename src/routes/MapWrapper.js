import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMaps from "./GoogleMaps";

function MapWrapper(props) {
    const GOOGLE_KEY = "AIzaSyCF2fSRjBD8-27-6vd4ZuuSszDZS1oou4w";
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