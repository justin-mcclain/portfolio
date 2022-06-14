import React from "react";

function About() {
    return (
        <>
            <div className="about">
                <div className="aboutleft">
                    <h2 className="headertext">ABOUT ME</h2>
                    <div className="aboutleftcontent">
                        <h4>Front-End:</h4>
                        <p>HTML, CSS, SCSS, React.js, Express, Bootstrap, Material UI, Tailwind</p>
                        <br />
                        <h4>Back-End:</h4>
                        <p>MongoDB, MySQL, Mongoose</p>
                        <br />
                        <h4>Other:</h4>
                        <p>Javscript, C#, Python, ASP.NET Core, Entity Framework, Flask, Jinja2, Postman, MySQL Workbench, GitHub</p>
                    </div>
                </div>
                <div className="aboutright">
                </div>
            </div>
        </>
    );
}

export default About;
