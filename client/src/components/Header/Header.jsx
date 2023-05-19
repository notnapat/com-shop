import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import IconSearch from "../../assets/images/navbar/iconizer-icon-search-24.svg";
import IconCart from "../../assets/images/navbar/iconizer-icon-shopping-cart-24.svg";
import IconUser from "../../assets/images/navbar/iconizer-icon-user-24.svg";

import { Turn  as Hamburger } from "hamburger-react";

function Header() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    // console.log(click);
    const closeMobileMenu = () => setClick(false);

    return (
        <div className="header">
            <div className="container">
                <div className="header-con">
                    <div className="logo-container">
                        {/* <a href="#">ReDev <FiCode /></a> */}
                        <NavLink to="/">
                            <img
                                src={require("../../assets/images/logo/logo-fit-big.png")}
                                alt="logo"
                            />
                        </NavLink>
                    </div>{" "}
                    <ul className={click ? "menu active" : "menu"} >
                        <li className="menu-link menu-link-cpu" onClick={closeMobileMenu}>
                            {/* <a href="#">ABOUT</a> */}
                            <NavLink to="/">Cpu</NavLink>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <NavLink to="/">Gpu</NavLink>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <NavLink to="/">Ram</NavLink>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <NavLink to="/">Mainboard</NavLink>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <NavLink to="/">Psu</NavLink>
                        </li>
                        <li className="menu-link menu-link-monitor" onClick={closeMobileMenu}>
                            <NavLink to="/">Monitor</NavLink>
                        </li>
                    </ul>
                    <ul className="menu-icons">
                        <li className="icons">
                            <NavLink>
                                <img src={IconSearch} alt="icon-search" />
                            </NavLink>
                        </li>
                        <li className="icons">
                            <NavLink className="icon-cart">
                                <img src={IconCart} alt="icon-cart" />
                            </NavLink>
                        </li>
                        <li className="icons">
                            <NavLink>
                                <img src={IconUser} alt="icon-user" />
                            </NavLink>
                        </li>
                    </ul>
                    <div className="mobile-menu" onClick={handleClick}>
                        {/* {click ? <FiX className="hamburger" /> : <FiMenu className="hamburger" />} */}
                     <Hamburger
                    toggled={click}
                    toggle={setClick}
                    direction="left"
                    duration={0.5}
                    // color="#fff"
                    color="rgba(255, 255, 255, 0.9)"
                    distance="sm"
                    size={35}
                    aria-expanded={click ? "true" : "false"}
                />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
