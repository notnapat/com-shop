import React from "react";
import "./Home.css";
// import Header from "../../components/Header/Header";
import Header from "../../components/Header/Header";
import SlideTop from "../../components/Slide-Top/SlideTop";

function Home() {
    return (
        <div className="home">
            <div className="home-container">
                <div className="header">
                    <Header />
                </div>
                <div className="slide-top">
                    <SlideTop/>
                </div>
            </div>
        </div>
    );
}

export default Home;
