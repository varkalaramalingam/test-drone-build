import { Footer } from "antd/lib/layout/layout";
import React from "react";

function FooterComponent({type }) {
  const year = new Date().getFullYear();
  const height = window.innerHeight

  return <Footer className={ height < 542 ? "footer" : type === "outer" ? "footer login-footer" : "footer" }>Contelligenz © {year}</Footer>;
}

export default FooterComponent;
