import React from "react";
import {
    Link
} from "react-scroll";

const NavBar = () => {
    var Scroll = require('react-scroll');
    var scroll = Scroll.animateScroll;
    return (
        <nav id="navbar">
            <div className="links">
                <Link
                    onClick={scroll.scrollToTop}
                    // spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                >
                    Home
                </Link>
                <Link
                    activeClass="active"
                    to="about"
                    // spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                >
                    About
                </Link>
                <Link
                    activeClass="active"
                    to="projects"
                    // spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                >
                    Projects
                </Link>
                <Link
                    activeClass="active"
                    to="contact"
                    // spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
