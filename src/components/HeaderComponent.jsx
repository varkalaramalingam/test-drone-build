import { Button, Row } from "antd";
import React from "react";
import contelligenz from "../assets/contelligenz.png";
import { useLocation, useHistory } from "react-router";
import LoggedInUserPopUp from "./LoggedInUserPopUp";

function HeaderComponent(props) {
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    localStorage.setItem("isAuthenticated", false);
    console.log(localStorage, props.isAuthenticated);
    props.setIsAuthenticated(!props.isAuthenticated);
    history.push({ pathname: "/login" });
    localStorage.removeItem("username");
  };

  return (
    <header className="header">
      {location.pathname !== "/" ? (
        <Button type="text" className="toggle" shape="circle" size="middle">
          {props.icon}
        </Button>
      ) : null}
      <Row style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", padding: "10px 0 0 20px" }}>
          <img
            src={contelligenz}
            alt="contelligenz"
            width="30px"
            height="30px"
          />
          <a href="http://contelligenz.com/" target="blank">
            <h2>Contelligenz</h2>
          </a>
        </div>
        <LoggedInUserPopUp logout={logout}/>
      </Row>
    </header>
  );
}

export default HeaderComponent;
