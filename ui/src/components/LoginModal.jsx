import { useEffect, useState } from "react";
import { Modal, Button, Typography } from "antd";
import googleLogo from "../assets/google-logo.png";
import { accessToken, googleAuthURL } from "../service/ServicePath";
import service from "../service/Httpservice";

const { Text } = Typography;
export const LoginModal = (props) => {
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    // if token is expired after its time setting modal visibility true
    if (props.tokenExpired) setVisible(true);

    if ( localStorage.getItem(accessToken()) !== null) {
      // removing login modal
      setVisible(false);
      // setting jwt token in default headers of axios
      service.setJwt(localStorage.getItem(accessToken()));
    }
  }, [props.tokenExpired]);

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
        width={350}
      >
        <Button
          style={{ height: "45px", marginLeft: "20%" }}
          href={googleAuthURL()}
        >
          <img src={googleLogo} alt="Google" style={{ width: "40px" }} />
          <Text>Log in with Google</Text>
        </Button>
      </Modal>
    </>
  );
};
