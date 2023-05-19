// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home/Home";
// import Cpu from "./pages/Cpu/Cpu"
// import Gpu from "./pages/Gpu/Gpu"
// import Ram from "./pages/Ram/Ram"
// import Mainboard from "./pages/Mainboard/Mainboard"
// import Monitor from "./pages/Monitor/Monitor"
// import Psu from "./pages/Psu/Psu"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                {/* <Route path="/cpu" element={<Cpu/>} />
                <Route path="/gpu" element={<Gpu/>} />
                <Route path="/ram" element={<Ram/>} />
                <Route path="/mainboard" element={<Mainboard/>} />
                <Route path="/psu" element={<Psu/>} />
                <Route path="/monitor" element={<Monitor/>} /> */}
                {/* <Route path="/about" element={<Home/>} />
                <Route path="/services" element={<Home/>} />
                <Route path="/contact" element={<Home/>} /> */}
                {/* <Route path="*" element={</>} /> */}
            </Routes>
        </>
    );
}

export default App;