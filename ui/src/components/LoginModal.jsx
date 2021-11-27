import { useEffect, useState } from "react";
import { Modal, Button, Typography } from "antd";
import googleLogo from "../assets/google-logo.png";
import { accessToken, googleAuthURL } from "../service/ServicePath";
import service from "../service/Httpservice";

const { Text } = Typography;
export const LoginModal = () => {
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(accessToken()) !== null) {
        setVisible(false);
        console.log(service.getKeyFromToken())
    }
  }, [])

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

    return (
    <>
    <Modal
        title="Login"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
    >
        <Button
        style={{ height: "45px", marginLeft: "30%" }}
        href={googleAuthURL()}
        >
        <img src={googleLogo} style={{ width: "40px" }} />
        <Text>Log in with Google</Text>
        </Button>
    </Modal>
    </>
    );
};
