import React from "react";
import githubLogo from "../assets/githubw.png";
import linkedinLogo from "../assets/linkedinw.png";

function Footer() {
    return (
        <>
            <div className="footer">
                <svg
                    preserveAspectRatio="none"
                    viewBox="0 0 100 102"
                    height="75"
                    width="100%"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    class="svgcolor-light"
                >
                    <path
                        d="M0 0 L50 100 L100 0 Z"
                        fill="#f2f2f2"
                        stroke="#f2f2f2"
                    ></path>
                </svg>
                <div className="sociallinks">
                    <a
                        href="https://github.com/justin-mcclain"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={githubLogo} alt="" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/justinamcclain/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={linkedinLogo} alt="" />
                    </a>
                </div>
                <p>© 2022 justinmcclain.net</p>
            </div>
        </>
    );
}

export default Footer;
