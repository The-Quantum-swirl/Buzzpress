import React from 'react'
import { PageHeader, Statistic, Row, Col, Card, Divider } from "antd";
import MessageCard from "../components/MessageCard";


export default function UserDetails() {
    const props = {
        rmPersonalData: { firstName: "Hari" }, todaysData: [{ name: "helen", type: "loan", }]
    };
    return (
        <div>
            <PageHeader
                subTitle={Date().toLocaleString()}
                backIcon={false}
                title={
                    <span style={{ fontWeight: "bold", fontSize: 40 }}>Dashboard</span>
                }
            >
                <Divider orientation="left">Statistics</Divider>
                <Row gutter={12}>
                    {" "}
                    <Col className="gutter-row" span={16}>
                        <MessageCard
                            rmPersonalData={props.rmPersonalData}
                            todaysData={props.todaysData}
                        />
                    </Col>
                    <Col className="gutter-row" span={8}>
                        To display the type of articles publishsed
                        {/* {props.monthlyDues !== undefined ? (
                            <PieChart data={props.monthlyDues} />
                        ) : null} */}
                    </Col>
                </Row>
            </PageHeader>
            <Divider />
        </div>
    )
}
