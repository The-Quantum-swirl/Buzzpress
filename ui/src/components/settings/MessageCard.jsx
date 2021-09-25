import React from "react";
import { Card } from "antd";

const MessageCard = (props) => {
    const style1 = {
        padding: "0px",
        borderRadius: "10px",
        backgroundColor: "#1e4f83",
        display: "flex",
        justifyContent: "space-between",
        color: "white !important",
    };

    const style2 = {
        // margin: "6px",
        alignSelf: "start",
        flexGrow: "1",
    };

    //   para element
    const style3 = {
        fontSize: "16px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        // color: "rgb(46, 56, 66)",
        color: "white",
        padding: "10px 23px 0px",
        marginBottom: "0",
    };

    if (props.rmPersonalData === undefined) return <div>Loading</div>;

    return (
        <Card bodyStyle={style1} bordered={false}>
            <div style={{ flexGrow: "1" }}>
                <div style={style2}>
                    <p style={style3}>
                        Hi{" "}
                        {
                            <span style={{ fontSize: "20px" }}>
                                {props.rmPersonalData.firstName}
                            </span>
                        }
                        ,{" "}
                    </p>
                    <p style={style3}>
                        You have{" "}
                        {
                            <span
                                style={{
                                    color: "#f50",
                                    fontSize: "18px",
                                }}
                            >
                                {props.todaysData.length}
                            </span>
                        }{" "}
                        published articles this month.
                    </p>
                    <ul style={{ marginBottom: "0", marginLeft: "20px" }}>
                        {props.todaysData.map((e) => {
                            return (
                                <li style={{ fontSize: "14px" }}>{`${e.name} - ${e.type.charAt(0).toUpperCase() + e.type.slice(1).toLowerCase()
                                    }`}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <img
                    src="https://axess.sc.com/static/1-hackathons-0e6834e15c9f7f658230c6a7d2b30b9a.svg"
                    alt="Img"
                />
            </div>
        </Card>
    );
};

export default MessageCard;
