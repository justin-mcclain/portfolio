import React from "react";
import finance from "../assets/finance.png"
import githubLogo from "../assets/github.png"

function Projects() {
    return (
        <>
            <div className="projects" id="projects">
                <div className="projectheader">
                    <h2>PROJECTS</h2>
                </div>
                <div className="projectmain">
                    <div className="projectlist">
                        <div className="project">
                            <img src={finance} alt="Finance Project Thumbnail" id="thumb"/>
                            <h3>Finance Tracker</h3>
                            <p>Languages used: HTML, CSS, React.js</p>
                            <a href="https://github.com/justin-mcclain/Assignments/tree/master/MERN/finance" target="_blank" rel="noreferrer"><img src={githubLogo} alt="GitHub Logo" /></a>
                        </div>
                        <div className="project"></div>
                    </div>
                </div>
            </div>
            <br />
        </>
    );
}

export default Projects;
