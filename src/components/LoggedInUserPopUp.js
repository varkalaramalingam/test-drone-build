import React, { useEffect, useState } from "react";
import { UserAddOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Popover, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { io } from "../api/io";
import { useHistory } from "react-router-dom";

function LoggedInUserPopUp(props) {
  const [usersData, setUsersData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  let history = useHistory();

  let accountData = "";
  let userIcon = "";
  let adminUserIcon = "";

  const username = localStorage.getItem("username");
  adminUserIcon = username.substr(0, 1).toUpperCase();

  usersData?.map((user) => {
    if (user.emailid === username) {
      accountData = user;
      userIcon = accountData?.fname.substring(0, 1);
    }
  });

  useEffect(() => {
    io({ method: "get", url: "/api/user/details" })
      .then(
        ({
          data: {
            resultsMap: { result = [] },
          },
        } = {}) => {
          setUsersData(result);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onManageAct = () => {
    history.push({
      pathname: `/dashboard-users/view-user`,
      state: { isAdd: false, record: accountData },
    });
    setIsPopupVisible(false);
  }

  const  onNewAccount = () => {
    history.push({
      pathname: `/dashboard-users/add-user`,
      state: { isAdd: true },
    });
    setIsPopupVisible(false);
  }

  const content = (
    <div>
      <Card
        bordered={false}
        style={{ width: 240 }}
        cover={
          <Row align="center">
            <Avatar
              size={64}
              style={{ marginTop: 10 }}
              icon={userIcon !== "" ? userIcon : adminUserIcon}
            />
          </Row>
        }
      >
        <Row align="center"> {usersData == "" ? 
          <Meta title={username} /> : (
            <>
            <Row align="center"><h3>{accountData.fname + " " + accountData.lname}</h3></Row>
            <Meta description={accountData.emailid} />
            </>
          )}
        </Row>
      </Card>
      <Row align="center">
        <Button
          shape="round"
          type="primary"
          ghost
          style={{ marginBottom: 5 }}
          onClick={() => onManageAct()}
        >
          Manage your Account
        </Button>
      </Row>
      <Divider style={{ margin: "10px" }} />
      <Row align="center">
        <Button type="primary" ghost icon={<LogoutOutlined />} onClick={() => props.logout()}>
          Logout
        </Button>
      </Row>
    </div>
  );

  return (
    <Popover
      visible={isPopupVisible}
      onClick={() => setIsPopupVisible(true)}
      trigger="click"
      content={content}
      placement="bottomRight"
      style={{ width: 300 }}
      arrowPointAtCenter={false}
      onVisibleChange={(e) => setIsPopupVisible(e)}
    >
      <Button
        shape="circle"
        style={{ 
          width: "40px", 
          height: "40px", 
          margin: "5px 10px 0 0", 
          backgroundColor: "#ddd", 
          color: "#fff",
          border: "1px solid #bbb", 
          fontSize:"20px", 
          padding:"-5px 0 0 0", 
          textAlign:"center"}}
       >
        <p style={{marginTop: "-3px", fontWeight: "500"}}>{userIcon !== "" ? userIcon : adminUserIcon}</p>
      </Button>
    </Popover>
  );
}

export default LoggedInUserPopUp;
