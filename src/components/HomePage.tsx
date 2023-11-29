import React from "react";
import "./HomePage.css";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import UD from "./ud.jpg";
import compsciImage from "./compscipic.jpg";
import thirdpic from "./3rdpic.jpg";
import ud2 from "./ud2.jpg";
export const HomePage = () => {
    return (
        <div className="homebg">
            <div className="bubbles">
                <span style={{ fontSize: 11 }}></span>
                <span style={{ fontSize: 12 }}></span>
                <span style={{ fontSize: 24 }}></span>
                <span style={{ fontSize: 10 }}></span>
                <span style={{ fontSize: 14 }}></span>
                <span style={{ fontSize: 23 }}></span>
                <span style={{ fontSize: 18 }}></span>
                <span style={{ fontSize: 16 }}></span>
                <span style={{ fontSize: 19 }}></span>
                <span style={{ fontSize: 20 }}></span>
                <span style={{ fontSize: 22 }}></span>
                <span style={{ fontSize: 25 }}></span>
                <span style={{ fontSize: 18 }}></span>
                <span style={{ fontSize: 21 }}></span>
                <span style={{ fontSize: 15 }}></span>
                <span style={{ fontSize: 13 }}></span>
                <span style={{ fontSize: 26 }}></span>
                <span style={{ fontSize: 17 }}></span>
                <span style={{ fontSize: 13 }}></span>
                <span style={{ fontSize: 28 }}></span>
                <span style={{ fontSize: 11 }}></span>
                <span style={{ fontSize: 12 }}></span>
                <span style={{ fontSize: 24 }}></span>
                <span style={{ fontSize: 10 }}></span>
                <span style={{ fontSize: 14 }}></span>
                <span style={{ fontSize: 23 }}></span>
                <span style={{ fontSize: 18 }}></span>
                <span style={{ fontSize: 16 }}></span>
                <span style={{ fontSize: 19 }}></span>
                <span style={{ fontSize: 20 }}></span>
                <span style={{ fontSize: 22 }}></span>
                <span style={{ fontSize: 25 }}></span>
                <span style={{ fontSize: 18 }}></span>
                <span style={{ fontSize: 21 }}></span>
                <span style={{ fontSize: 15 }}></span>
                <span style={{ fontSize: 13 }}></span>
                <span style={{ fontSize: 26 }}></span>
                <span style={{ fontSize: 17 }}></span>
                <span style={{ fontSize: 13 }}></span>
                <span style={{ fontSize: 28 }}></span>
                {/* <span className="style2"></span>
                <span className="style3"></span>
                <span className="style"></span>
                <span className="style"></span>
                <span className="style"></span> */}
                <span></span>
            </div>
            <div className="center-container">
                <h1>Welcome to the Course Schedular!</h1>
                <h3>
                    Directions: Click on Courses button to view all available
                    courses.
                </h3>
                <h3>Click on Degrees button to make your degree plan. </h3>
            </div>
            <div className="Cardgroup">
                <Card className="Cardstyle">
                    <Card.Img src={compsciImage} alt="udimage" />
                </Card>

                <Card className="Cardstyle">
                    <Card.Img src={ud2} alt="udimage" />
                </Card>

                <Card className="Cardstyle">
                    <Card.Img src={thirdpic} alt="udimage" />
                </Card>
            </div>
        </div>
    );
};
