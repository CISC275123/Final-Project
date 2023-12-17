import React from "react";
import "./HomePage.css";
import { Card } from "react-bootstrap";
import compsciImage from "./compscipic.jpg";
import thirdpic from "./3rdpic.jpg";
import ud2 from "./ud2.jpg";
export const HomePage = () => {
    return (
        <div className="homebg">
            <div className="bubbles">
                <span
                    style={{ "--fontSize": 11 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 12 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 24 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 10 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 14 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 23 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 18 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 16 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 19 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 20 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 22 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 25 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 18 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 21 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 15 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 13 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 26 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 17 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 13 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 28 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 11 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 12 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 24 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 10 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 14 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 23 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 18 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 16 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 19 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 20 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 22 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 25 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 18 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 21 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 15 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 13 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 26 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 17 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 13 } as React.CSSProperties}
                ></span>
                <span
                    style={{ "--fontSize": 28 } as React.CSSProperties}
                ></span>
            </div>
            <div className="center-container">
                <div className="textHome">
                    <h1>Welcome to the Course Schedular!</h1>
                    <h3>
                        Directions: Click on Courses button to view all
                        available courses.
                    </h3>
                    <h3>Click on Degrees button to make your degree plan.</h3>
                    <h3>Click on the Cards to open up more options</h3>
                </div>
            </div>
            <div className="Cardgroup">
                <Card className="Cardstyle">
                    <Card.Img src={compsciImage} alt="udimage" />
                </Card>

                <Card className="Cardstyle">
                    <img className="middlecard" src={ud2} alt="udimage" />
                </Card>

                <Card className="Cardstyle">
                    <Card.Img src={thirdpic} alt="udimage" />
                </Card>
            </div>
        </div>
    );
};
