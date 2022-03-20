import { Button, Divider, Form, Input, PageHeader, Space, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import ReactGA from 'react-ga';
import { convertDate, DateToMonthYearFormat } from "../../components/Date";
import NavBar from "../../components/NavBar";
import MessageCard from "../../components/settings/MessageCard";
import UploadButton from "../../components/UploadButton";
import api from "../../service/ServiceCall";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

ReactGA.initialize('UA-214937125-1');
export default function UserDetails() {
  const [authorDetails, setAuthorDetails] = useState({
    PersonalData: { firstName: "Anonymous" },
    ArticlePublished: 0
  });
  const [stats, setStats] = useState({ ArticlesRead: 0, ArticlePublished: 0});
  const [profilePicture, setProfilePicture] = useState(false);
  
  const [editableName, setEditableName] = useState("none");
  const handleImage =(imageData) => {
    setProfilePicture(imageData);
    console.log("setted image here"+profilePicture);
  }

  const handlePostImage =(e)=>{

    let imageData= profilePicture, fd = new FormData();

    fd.append("file", imageData);
    api.postImage(fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fd.delete("file");
    console.log("posting photo");
    api.postProfilePhoto(imageData.name)
  }

  useEffect(() => {
    
    ReactGA.pageview(window.location.pathname + window.location.search);

    api.getUserStats().then((res) =>{
      console.log(res);
      setStats({
        ArticlePublished: res.articleAuthored,
        ArticlesRead: res.articleRead,
        ArticleTarget: res.articleTargetRead,
      })
    })
    .catch((err) => { })

    // loading data for article meta
    api.getSelf().then((res) => {
      console.log(res);
      setAuthorDetails({
        PersonalData: {firstName: res.name},
      })
      setEditableName(res.name);

    })
    .catch((err) => { })

  }, []);
  const handleDetailsChange = (event) => {
    console.log(event.target.name);
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

  return (
    <div>
      <NavBar />
      <PageHeader
        subTitle={DateToMonthYearFormat( convertDate(new Date()))}
        backIcon={false}
        title={
          // "Settings"
          <span style={{ fontWeight: "bold", fontSize: 30 }}>Settings</span>
        }
        style={{ marginLeft: "4%" }}
      >
        <Divider orientation="left">Statistics</Divider>
          <MessageCard
            rmPersonalData={authorDetails.PersonalData}
            ArticlePublished={stats.ArticlePublished}
          />

        <Divider />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Personal Details" key="1">

            <Space direction="vertical">
              <Paragraph editable={{ onChange: setEditableName }}>
                {editableName}
              </Paragraph>
              <Button type="primary" style={{ marginTop: "5%" }} onClick={handleDetailsChange}>
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

          <TabPane tab="Edit Profile" key="3">
            <label>Change Profile Photo</label>
            <br />
            <UploadButton imageData={(e) => handleImage(e)} />
            <Button type="primary" onClick={(e) => handlePostImage(e)}>Submit</Button>
          </TabPane>

        </Tabs>

      </PageHeader>
    </div>
  );
}
