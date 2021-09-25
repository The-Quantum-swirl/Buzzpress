import React from 'react';
import { Col, Divider, PageHeader, Row, Tabs, Input, Space, Button, Switch } from "antd";
import MessageCard from "../components/settings/MessageCard";
import NavBar from '../components/NavBar';
import InfoCard from "../components/settings/InfoCard.jsx";

export default function UserDetails() {
    const { TabPane } = Tabs;
    const props = {
        PersonalData: { firstName: "Hari" }, todaysData: [{ name: "helen", type: "loan", }]
    };
    return (
        <div>
            <NavBar />
            <PageHeader
                subTitle={(new Date()).toUTCString()}
                backIcon={false}
                title={
                    "Settings"
                    // <span style={{ fontWeight: "bold", fontSize: 40 }}>Dashboard</span>
                }
            >
                <Divider orientation="left">Statistics</Divider>
                <Row gutter={12}>
                    {" "}
                    <Col className="gutter-row" span={16}>
                        <MessageCard
                            rmPersonalData={props.PersonalData}
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
                <Tabs defaultActiveKey="1" style={{marginLeft:'5%'}}>
                    <TabPane tab="Personal Details" key="1">
                        <Space direction="vertical">
                            <InfoCard title="Name" description="Change your name" />
                            <InfoCard title="Email" description="Change your email" />
                            <InfoCard title="Password" description="Change your password" />


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
