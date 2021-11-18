import BuzzAvatar from "../BuzzAvatar";
import { Button, Typography } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import { ButtonGroup } from "@mui/material";
import { Link } from 'react-router-dom';
import { authorId } from "../../constants/UserData";
import api from "../../service/ServiceCall";
const { Text, Title } = Typography;

export default function BuzzPerformer(props) {
  const userName = props.name;
  const views = props.points;
  const userId = props.authorID;
  const authorLink = api.getProfileUrl(userId);

  const handleFollow = (e) => {
    console.log("followed")
    // if (authorId() !== userId){
      console.log(authorId(),userId)
      api.postFollow(authorId(),userId);
    // }
  }
  const handleUnFollow = (e) => {
    console.log("Unfollowed")
    // if (authorId() !== userId){
      console.log(authorId(),userId)
      api.postUnFollow(authorId(),userId);
    // }
  }
  return (
    <div
    style={{marginTop:'10px', backgroundColor:'rgba(0,0,0,0.02)', 
    backdropFilter:'blur("12px")', padding:'12px 20px 12px 20px', borderRadius:'20px 20px'
    }}>
    <Link to={authorLink} >
        <div
            style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: 'center',
            height: "34px",
            width: "100%",
            }}
        >
        
            <BuzzAvatar type="small" userId={userId} />
            <span
            id="author"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                padding: "0px 22px 0px 0",
                display:'inline-flex' , alignItems:'center'
            }}
            >
            <Text>{userName}</Text>
            </span>
        </div>
        </Link>
        <br />
        <ButtonGroup>
        <Button size="small" disabled={authorId()===userId} type="primary" onClick={(e) => handleFollow(e)}>Follow</Button>
        <Button size="small" disabled={authorId()===userId} type="default" onClick={(e) => handleUnFollow(e)}>UnFollow</Button>
        </ButtonGroup>
        
        <RiseOutlined style={{color:'#01579b', marginLeft:'12px'}} />
        {/* <EyeFilled style={{color:'#757575'}} /> */}
        <Text >{" "+views + " "}</Text>      
    </div>
  );
}
