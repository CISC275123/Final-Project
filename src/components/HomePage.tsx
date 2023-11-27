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
        <div>
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
