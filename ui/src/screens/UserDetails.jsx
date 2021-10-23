import { BookOutlined, TeamOutlined } from "@ant-design/icons";
import { ArticleOutlined, DesignServicesOutlined, LibraryBooksOutlined, PendingOutlined, ReadMoreOutlined } from "@mui/icons-material";
import { Button, Card, Col, Divider, Form, Input, PageHeader, Row, Space, Statistic, Switch, Tabs, Typography } from "antd";
import { useState } from "react";
import NavBar from "../components/NavBar";
import MessageCard from "../components/settings/MessageCard";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const DateToMonthYearFormat = (date) => {
  let todaysDate = date.toDateString();
  let dateArr = todaysDate.split(" ");
  return dateArr[1] + " " + Number(dateArr[2]).toString() + ", " + dateArr[3];
};

export default function UserDetails() {
  const props = {
    PersonalData: { firstName: "Suarez" },
    ArticlePublished: 2
  };
  const Stats = {
    ArticlePublished: 21,
    ArticlesRead: 50
  }
  const onFinish = (values) => {
    if (values.password === values.confirmPassword) {

      console.log("Success:", values);
      return true;
    }

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [editableName, setEditableName] = useState("Hari Ohm");
  const [editableEmail, setEditableEmail] = useState("hari@gmail.com");

  //   old password get from db
  const oldPasswordFromDB = "";
  const stylecard = {
    boxShadow: "0 1px 10px 0 rgb(30, 79, 131, 0.5)",
    border: "rgb(122, 168, 218) 1x solid"
  }
  return (
    <div>
      <NavBar />
      <PageHeader
        subTitle={DateToMonthYearFormat(new Date())}
        backIcon={false}
        title={
          // "Settings"
          <span style={{ fontWeight: "bold", fontSize: 30 }}>Settings</span>
        }
        style={{ marginLeft: "4%" }}
      >
        <Divider orientation="left">Statistics</Divider>
        <Row gutter={12}>
          <Col className="gutter-row" span={16}>
            <MessageCard
              rmPersonalData={props.PersonalData}
              ArticlePublished={props.ArticlePublished}
            />
          </Col>
          <Col className="gutter-row" span={4}>
            <Card style={stylecard}
              title={<DesignServicesOutlined style={{ fontSize: "30px", color: "#fa5500" }} />}
              //  bordered={true}
              headStyle={{ textAlign: "center", padding: "0px" }}
              bodyStyle={{ textAlign: "center", padding: "13px" }}
              hoverable={true}
            >
              <Statistic title="Articles Published" value={Stats.ArticlePublished} />
            </Card>
          </Col>
          <Col className="gutter-row" span={4}>
            <Card style={stylecard}
              title={<LibraryBooksOutlined style={{ fontSize: "30px", color: "#fa5500" }} />}
              //  bordered={true}
              headStyle={{ textAlign: "center", padding: "0px" }}
              bodyStyle={{ textAlign: "center", padding: "13px" }}
              hoverable={true}
            >
              <Statistic title="Articles Read" value={Stats.ArticlesRead} />
            </Card>
          </Col>
          {/* <Col className="gutter-row" span={4}>
            <Card style={stylecard}
              title={<BookOutlined style={{ fontSize: "30px", color: "#10239e" }} />}
              //  bordered={true}
              headStyle={{ textAlign: "center", padding: "0px" }}
              bodyStyle={{ textAlign: "center", padding: "13px" }}
              hoverable={true}
            >
              <Statistic title="Published" value={Stats.ArticlePublished} />
            </Card>
          </Col> */}
        </Row>

        <Divider />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Personal Details" key="1">

            <Space direction="vertical">
              <Paragraph editable={{ onChange: setEditableName }}>
                {editableName}
              </Paragraph>
              <Paragraph editable={{ onChange: setEditableEmail }}>
                {editableEmail}
              </Paragraph>
              <Button type="primary" style={{ marginTop: "5%" }}>
                Update
              </Button>
            </Space>
          </TabPane>

          <TabPane tab="Password" key="2">
            Update Password
            {/* update password starts */}
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{ maxWidth: '500px' }}
            >
              <Form.Item label="Old Password" name="oldPassword"
                rules={[
                  { required: true, message: "Please input your old password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label="Password" name="password"
                rules={[
                  { required: true, message: "Please input your new password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item label="Confirm Password" name="confirmPassword"
                rules={[
                  { required: true, message: "Please input your new password!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

            </Form>
            {/* update password ends */}

          </TabPane>

          <TabPane tab="Prefrences" key="3">

            Toggle Dark Mode <Switch defaultChecked />

          </TabPane>

        </Tabs>

      </PageHeader>
    </div>
  );
}
