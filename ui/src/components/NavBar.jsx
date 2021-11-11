import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Dropdown, Button } from "antd";
import { Typography } from "antd";
import { useHistory } from "react-router-dom";
import Logout from "./logout";
import { authorId } from "../constants/UserData";
const { Header } = Layout;
const { Text } = Typography;

export default function NavBar() {
  let history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item onClick={(e) => history.push("/profile/"+authorId())}>
        Your Profile
      </Menu.Item>
      <Menu.Item onClick={(e) => history.push("/create")}>
        Write Your Story
      </Menu.Item>
      <Menu.Item onClick={(e) => history.push("/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item onClick={(e) => <Logout />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Header style={{ boxShadow: "0 4px 18px 0 rgb(0 0 0 / 10%)" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item
            key={1}
            style={{
              fontSize: "25px",
              color: "white",
              backgroundColor: "inherit",
            }}
            onClick={(e) => history.push("/home")}
          >
            BuzzPress
          </Menu.Item>
            
          <Menu.Item
            className='ant-dropdown-link'
            key={2}
            style={{
              marginRight: "0%",
              marginLeft: "auto",
              padding: "0",
              backgroundColor: "inherit",
            }}
          >
          <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Button
                style={{
                  backgroundColor: "inherit",
                  border:0,
                  width: "40px",
                  height: "40px",
                  padding: "0",
                  borderRadius: "50%",
                }}
              >
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ADD8E6",
                  }}
                  icon={<UserOutlined />}
                />
              </Button>
          </Dropdown>
            
          </Menu.Item>
        </Menu>
      </Header>
    </div>
  );
}
