import React from 'react';
import { Col, Divider, PageHeader, Row, Tabs, Input, Space, Button, Switch } from "antd";


import MessageCard from "../components/MessageCard";
import NavBar from '../components/NavBar';


export default function UserDetails() {
    const { TabPane } = Tabs;
    const props = {
        rmPersonalData: { firstName: "Hari" }, todaysData: [{ name: "helen", type: "loan", }]
    };
    return (
        <div>
            <NavBar />
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

                <Divider />
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Personal Details" key="1">
                        <Space direction="vertical">
                            <Input placeholder="Name" />
                            <Input placeholder="Email" />
                            <Input.Password placeholder="input password" />
                            <Button type="primary" >
                                Update
                            </Button>
                        </Space>
                    </TabPane>
                    <TabPane tab="Misc" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Prefrences" key="3">
                        Toggle Dark Mode <Switch defaultChecked />
                    </TabPane>
                </Tabs>
            </PageHeader>
        </div>
    )
}
