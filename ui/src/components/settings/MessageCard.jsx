import React from "react";
import { Card } from "antd";
import penIcon from "../../assets/orange pen.svg"
const MessageCard = (props) => {
    const style1 = {
        padding: "0px",
        borderRadius: "10px",
        backgroundColor: "#001529",
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
                                {props.ArticlePublished}
                            </span>
                        }{" "}
                        published articles this month.
                    </p>
                </div>
            </div>
            <div>

                <img
                    src={penIcon}
                    alt="Pen Img"
                    width="100px"
                    color="#fa5500"

                />
            </div>
        </Card>
    );
};

export default MessageCard;
