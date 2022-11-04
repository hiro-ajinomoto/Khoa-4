import React from "react";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
export default function MenuCyberbugs() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jfif")} alt="123" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card mr-1" />
          <NavLink
            className="text-dark"
            activeStyle={{ color: "blue" }}
            to="/cyberbugs"
            activeClassName="active font-weight-bold text-primary"
          >
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink
            className="text-dark"
            activeStyle={{ color: "blue" }}
            to="/projectmanagement"
            activeClassName="active font-weight-bold  text-primary"
          >
            Project management
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink
            className="text-dark"
            activeStyle={{ color: "blue" }}
            to="/createproject"
            activeClassName="active font-weight-bold  text-primary"
          >
            Create project
          </NavLink>
        </div>

        <div>
          <NavLink
            className="text-dark"
            activeStyle={{ color: "blue" }}
            to="/users"
            activeClassName="active font-weight-bold  text-primary"
          >
            <i className="fa fa-user" /> <span>Users</span>
          </NavLink>
        </div>
      </div>
      <div className="feature">
        {/* <div>
                    <i className="fa fa-equals mr-1" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste mr-1" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow mr-1" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div> */}
      </div>
    </div>
  );
}
