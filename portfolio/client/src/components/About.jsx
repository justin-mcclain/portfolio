import React from "react";
import pdf from "../assets/JMcClain Resume.pdf";
import doc from "../assets/JMcClain Resume.docx";

function About() {
	return (
		<>
			<div className="about">
				<div className="aboutleft">
					<h2 className="headertext">ABOUT ME</h2>
					<div className="aboutleftcontent">
						<h4>Front-End:</h4>
						<p>
							HTML, CSS, SCSS, React.js, Express, Bootstrap,
							Material UI, Tailwind
						</p>
						<br />
						<h4>Back-End:</h4>
						<p>MongoDB, MySQL, Mongoose</p>
						<br />
						<h4>Other:</h4>
						<p>
							Javscript, C#, Python, ASP.NET Core, Entity
							Framework, Flask, Jinja2, Postman, MySQL Workbench,
							GitHub
						</p>
					</div>
					<div className="resume">
						<div className="resumeheader">
                            <h3 className="headertext">DOWNLOAD MY RESUME</h3>
                        </div>
						<div className="resumeicons">
                            <a href={pdf} target="_blank" rel="noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="48"
                                    width="48">
                                    <path d="M16.55 26.45h1.85V22.3h2.4q.8 0 1.325-.525.525-.525.525-1.325v-2.4q0-.8-.525-1.325Q21.6 16.2 20.8 16.2h-4.25Zm1.85-6v-2.4h2.4v2.4Zm6.45 6h4.2q.75 0 1.3-.525t.55-1.325v-6.55q0-.8-.55-1.325-.55-.525-1.3-.525h-4.2Zm1.85-1.85v-6.55h2.35v6.55Zm6.65 1.85h1.85V22.3h2.5v-1.85h-2.5v-2.4h2.5V16.2h-4.35ZM13 38q-1.2 0-2.1-.9-.9-.9-.9-2.1V7q0-1.2.9-2.1.9-.9 2.1-.9h28q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h28V7H13v28Zm-6 9q-1.2 0-2.1-.9Q4 42.2 4 41V10h3v31h31v3Zm6-37v28V7Z" />
                                </svg>
                            </a>
                            <a href={doc} target="_blank" rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M15.95 35.5h16.1v-3h-16.1Zm0-8.5h16.1v-3h-16.1ZM11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h18.05L40 14.95V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-27.7V7H11v34h26V16.3ZM11 7v9.3V7v34V7Z"/></svg>
                            </a>
                        </div>  
					</div>
				</div>
				<div className="aboutright"></div>
			</div>
		</>
	);
}

export default About;
