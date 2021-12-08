import { useEffect, useState } from "react";
import { Modal, Button, Typography } from "antd";
import googleLogo from "../assets/google-logo.png";
import { accessToken, googleAuthURL } from "../service/ServicePath";
import service from "../service/Httpservice";
import api from "../service/ServiceCall";

const { Text } = Typography;
export const LoginModal = (props) => {
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    console.log(visible);
    console.log(props);
    console.log(props.tokenExpired);
    if ( !props.tokenExpired && localStorage.getItem(accessToken()) !== null) {
      setVisible(false);
      // setting jwt token in default headers of axios
      service.setJwt(localStorage.getItem(accessToken()));
      // api.setUser()
    }else{
      console.log('token is not there');
      console.log("props "+props)
    }
  }, []);

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
