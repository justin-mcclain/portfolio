import React from "react";
import githubLogo from "../assets/github.png";

function Projects() {
    return (
        <>
            <div className="projects">
                <div className="projectheader">
                    <h2 className="headertext">PROJECTS</h2>
                </div>
                <div className="projectmain">
                    <div className="projectlist">
                        <div className="project">
                            <div className="thumb"></div>
                            <div className="summary">
                                <p>
                                    Upload transactions and track monthly
                                    spending with filtering and dynamic charts.
                                </p>
                            </div>
                            <div className="projecttext">
                                <h3>Finance Tracker</h3>
                                <p>Languages used: HTML, CSS, React.js</p>
                                <a
                                    href="https://github.com/justin-mcclain/Assignments/tree/master/MERN/finance"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src={githubLogo} alt="GitHub Logo" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Projects;
