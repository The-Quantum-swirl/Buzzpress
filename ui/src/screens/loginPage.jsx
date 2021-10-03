import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  Tabs,
  Checkbox,
} from "antd";

const { TabPane } = Tabs;

const Signin = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelAlign="left"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const Signup = () => {
  return (
    <>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        labelAlign="left"
        size="default"
      >
        {/* <Form layout="inline" style={{marginBottom:'15px'}}> */}
        <Form.Item
          label="First Name"
          name="first name"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input />
        </Form.Item>
        {/* </Form> */}

        {/* <Form layout="inline" style={{marginBottom:'15px'}}> */}
        <Form.Item
          label="Date of birth"
          name="DOB"
          rules={[
            {
              required: true,
              message: "Please input your DOB!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="Gender"
          rules={[
            {
              required: true,
              message: "Please input your Gender!",
            },
          ]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>

        {/* </Form> */}

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form layout="inline" style={{marginBottom:'15px'}}> */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* </Form> */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default function LoginPage() {
  function callback(key) {
    console.log(key);
  }

  return (
    <div style={{ height: "609px", backgroundColor: "purple" }}>
      <div
        style={{
          marginLeft: "60%",
          width: "35%",
          height: "590px",
          backgroundColor: "white",
          padding: "15px",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          onChange={callback}
          style={{ width: "100%" }}
        >
          {/* login tab start */}
          <TabPane tab="Login" key="1">
            <Card style={{ width: "100%" }}>
              <Signin />
            </Card>
          </TabPane>
          {/* login tab end */}

          {/* sign up tab start */}
          <TabPane tab="Sign up" key="2">
            <Card style={{ width: "100%" }}>
              <Signup />
            </Card>
          </TabPane>
          {/* sign up tab end */}
        </Tabs>
      </div>
    </div>
  );
}
