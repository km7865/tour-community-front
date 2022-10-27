import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./routes/SignIn";
import Main from "./routes/Main";
import SignUp from "./routes/SignUp";
import TourDetail from "./routes/TourDetail";
import OpenTour from "./routes/OpenTour";
import JoinTour from "./routes/JoinTour";
import Header from "./routes/Header";
import RegisterTour from "./routes/RegisterTour";
import Footer from "./routes/Footer";

function AppRouter(props) {
    return (
        <BrowserRouter>
            <div>
                <Header />
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Main />}/>
                    <Route path="/signin" element={<SignIn />}/>
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/tour" element={<TourDetail />}/>
                    <Route path="/registerTour/:memberId" element={<RegisterTour />}/>
                    <Route path="/open/:memberId" element={<OpenTour />}/>
                    <Route path="/join/:memberId" element={<JoinTour />}/>
                </Routes>
            </div>
            <div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;