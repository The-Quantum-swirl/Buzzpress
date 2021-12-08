import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../service/ServiceCall";

export default function BuzzAvatar(props) {
  const userId = props.userId;
  const [profilePicture, setProfilePicture] = useState(false);

  useEffect(() => {
    api.getUser( (userId==='you'?undefined:userId) )
    .then((res) => {
        console.log(res)
      if (res.profilePhotoUrl !== null) {
        setProfilePicture(res.profilePhotoUrl);
      }
    })
    .catch((res) => {console.log(res)})
    
  }, []);

  if (props.type === undefined || props.type === "medium") {
    return (
      <Avatar
        src={profilePicture === false ? "" : profilePicture}
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
        src={profilePicture === false ? "" : profilePicture}
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
        src={profilePicture === false ? "" : profilePicture}
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
