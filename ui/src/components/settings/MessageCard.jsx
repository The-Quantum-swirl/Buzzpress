import { Col, Row } from "antd";
import React from "react";
import penIcon from "../../assets/orange pen.svg";
const MessageCard = (props) => {
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
        // <Card bodyStyle={style1} bordered={false}>
        <Row style={{
        borderRadius: "10px",
        backgroundColor: "#001529",
        width:'100%',
        color: "white !important",
        maxWidth:'600px'
        }}>
        <Col span={16}>
            <Row>
                <Col>
                <p style={style3}>
                Hi{" "}
                <span style={{ fontSize: "20px" }}>
                    {props.rmPersonalData.firstName}
                </span>
                ,{" "}
                </p>
                </Col>
            </Row>

            <Row>
                <Col>
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
                </Col>
            </Row>
            
        </Col>
        <Col span={8}>
            <img
                src={penIcon}
                alt="Pen Img"
                width="100px"
                color="#fa5500"
            />
        </Col>
        </Row>
        // </Card>
    );
};

export default MessageCard;
