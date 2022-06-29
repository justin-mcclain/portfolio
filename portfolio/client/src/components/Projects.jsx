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
									Enter a zip code and retrieve weather
									information from that area
								</p>
							</div>
							<div className="projecttext">
								<h3>Weather App</h3>
								<p>Languages used: HTML, SCSS, React.js</p>
								<div className="projectlinks">
                                    <a
                                        href="https://github.com/justin-mcclain/Assignments/tree/master/MERN/finance"
                                        target="_blank"
                                        rel="noreferrer">
                                        <img src={githubLogo} alt="GitHub Logo" />
                                    </a>
                                    
                                    <a href="http://weather.justinmcclain.net" target="_blank" rel="noreferrer">
                                        <span class="material-symbols-outlined">
                                            link
                                        </span>
                                    </a>
                                </div>
							</div>
						</div>
						<div className="project">
							<div className="thumb2"></div>
							<div className="summary">
								<p>
									Upload transactions and track monthly
									spending with filtering and dynamic charts.
								</p>
							</div>
							<div className="projecttext">
								<h3>Finance Tracker</h3>
								<p>Languages used: HTML, CSS, React.js</p>
								<div className="projectlinks">
                                    <a
                                        href="https://github.com/justin-mcclain/Assignments/tree/master/MERN/finance"
                                        target="_blank"
                                        rel="noreferrer">
                                        <img src={githubLogo} alt="GitHub Logo" />
                                    </a>
                                </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Projects;
