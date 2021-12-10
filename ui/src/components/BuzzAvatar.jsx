import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../service/ServiceCall";

export default function BuzzAvatar(props) {
  const [profilePicture, setProfilePicture] = useState(false);

  useEffect(() => {
    props.userId === 'you' || props.userId === undefined?
    (
    api.getSelf().then((res) => {
      // console.log(res)
      if (res.imageUrl !== null) {setProfilePicture(res.imageUrl);}
    })
    .catch((res) => {})
    ):(
    api.getUser(props.userId).then((res) => {
      // console.log(res)
      if (res.imageUrl !== null) {setProfilePicture(res.imageUrl);}
    })
    .catch((res) => {})
    )
  }, [props.userId]);

  if (props.type === undefined || props.type === "medium") {
    return (
      <Avatar
        src={profilePicture}
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#ADD8E6",
        }}
        icon={<UserOutlined />}
      />
    );
  } else if (props.type === "large") {
    return (
      <Avatar
        src={profilePicture}
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: "#ADD8E6",
        }}
        icon={<UserOutlined />}
      />
    );
  } else {
    return (
      <Avatar
        src={profilePicture}
        style={{
          width: "34px",
          height: "34px",
          backgroundColor: "#ADD8E6",
        }}
        icon={<UserOutlined />}
      />
    );
  }
}
