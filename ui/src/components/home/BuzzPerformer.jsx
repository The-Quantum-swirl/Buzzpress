import BuzzAvatar from "../BuzzAvatar";
import { Button, Typography } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import { ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../service/ServiceCall";
import { useEffect, useState } from "react";
const { Text } = Typography;

const convertNum = (num) => {
  if (num >= 1000000) return parseInt(num / 1000000) + "M+";
  else if (num >= 1000) return parseInt(num / 1000) + "k+";
  else return num;
};

export default function BuzzPerformer(props) {
  const userName = props.authorName;
  const userId = props.authorId;
  const authorLink = api.getProfileUrl(userId);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    api.sameUser(userId).then((res) => {
      res ? setDisable(true) : setDisable(false);
    });
  }, [userId]);


  const handleFollow = (e) => {
    api.postFollow(userId);
  };
  const handleUnFollow = (e) => {
    api.postUnFollow(userId);
  };
  return (
    <div
      style={{
        marginTop: "10px",
        backgroundColor: "rgba(0,0,0,0.05)",
        backdropFilter: 'blur("12px")',
        padding: "12px 20px 12px 20px",
        borderRadius: "20px 20px",
      }}
    >
      <Link to={authorLink}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "34px",
            width: "100%",
          }}
        >
          <BuzzAvatar type="small" userId={userId} />
          <span
            id="author1"
            style={{
              padding: "0px 22px 0px 0",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Text>{userName.split(" ")[0]}</Text>
          </span>
        </div>
      </Link>
      <br />
      <ButtonGroup>
        <Button
          size="small"
          disabled={disable}
          type="primary"
          onClick={(e) => handleFollow(e)}
        >
          Follow
        </Button>
        <Button
          size="small"
          disabled={disable}
          type="default"
          onClick={(e) => handleUnFollow(e)}
        >
          UnFollow
        </Button>
      </ButtonGroup>

      <RiseOutlined style={{ color: "#01579b", marginLeft: "12px" }} />
      {/* <EyeFilled style={{color:'#757575'}} /> */}
      <Text>{" " + convertNum(props.points) + " "}</Text>
    </div>
  );
}
