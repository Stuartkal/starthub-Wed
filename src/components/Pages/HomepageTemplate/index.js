import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OKRs,
  InternalOKRs,
  LeanCanvas,
  logo,
  Metrics,
  DiagnosticsTest,
  Calendar,
  Navbar,
  actionCreators,
  ModalUI,
  Startups,
  Revenues,
  ResourceFiles,
} from "../../Paths";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  ProfileOutlined,
  GroupOutlined,
  BarChartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Tabs, Menu } from "antd";
import axios from "axios";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BarChartIcon from "@material-ui/icons/BarChart";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import BuildIcon from "@material-ui/icons/Build";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { Admin, TeamLead, TeamMember, Startup } from "../LandingPages";
import "./HomepageStyles.css";
const HomepageTemplate = (props) => {
  const [index, setIndex] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [navbar, setNavbar] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  // console.log(startupLinks);

  const {
    username,
    userId,
    admin,
    tokenExpiration,
    category,
    userRole,
    features,
  } = useSelector((state) => state.auth);

  // console.log(category);

  const current_date = Date.now();

  React.useEffect(() => {
    setIndex(1);
    getStartups();
    getEvents();
    getPrograms();
  }, []);

  React.useEffect(() => {
    getBoards();
    getLists();
    getDiagnostics();
    createProfile();
    if (current_date >= tokenExpiration) {
      dispatch(actionCreators.removeUser());
      props.history.push("/");
    }
  }, []);

  const getEvents = () => {
    dispatch(
      actionCreators.getItem(`catalyzer/events`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setEvents(data.events));
        }
        if (!success) console.log(error);
      })
    );
  };

  const getPrograms = () => {
    dispatch(
      actionCreators.getItem(`catalyzer/programs`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setPrograms(data.programs));
        }
        if (!success) console.log(error);
      })
    );
  };

  const getStartups = () => {
    dispatch(
      actionCreators.getItem(`/auth/users`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setUsers(data.users));
        }
        if (!success) console.log(error);
      })
    );
  };

  const createProfile = () => {
    const data = { userId };
    dispatch(
      actionCreators.addItem(
        `catalyzer/create-profile`,
        data,
        (data) => {
          const { userId } = data;
          if (!userId) return false;
          else return true;
        },
        (res) => {
          const { success } = res;
          if (success) getProfile();
          if (!success) getProfile();
        }
      )
    );
  };

  const getProfile = () => dispatch(actionCreators.getProfile(() => {}));

  const getDiagnostics = () => dispatch(actionCreators.getDiagnostics());

  const getBoards = () =>
    dispatch(
      actionCreators.getItem(`catalyzer/boards`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setBoards(data.boards));
        }
      })
    );

  const getLists = () =>
    dispatch(
      actionCreators.getItem(`catalyzer/lists`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setCanvasLists(data.lists));
        }
      })
    );

  const dispatch = useDispatch();

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const getSubItem = (label, title, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      title,
      type,
    };
  };

  const items = [
    getItem("Metrics", "1", <BarChartOutlined />),
    getItem("OKRs", "2", <ContainerOutlined />),
    getItem("Lean Canvas", "3", <ContainerOutlined />),
    getItem("Diagnostics", "4", <ContainerOutlined />),
    getItem("Company Profile", "5", <ProfileOutlined />),
  ];

  const teamLeadItems = [
    getItem("Startup Portfolio", "1", <ProfileOutlined />),
    getItem(
      "Accounts",
      "2",
      <ManageAccountsOutlinedIcon style={{ fontSize: "18px" }} />
    ),
    getItem(
      "Programs",
      "3",
      <EventNoteOutlinedIcon style={{ fontSize: "18px" }} />
    ),
    getItem("Events", "4", <CalendarOutlined />),
    getItem("Revenue", "5", <PaymentIcon />),
    getItem("OKRs", "6", <ContainerOutlined />),
  ];

  const onClick = ({ key, item, selectedKeys }) => {
    setTitle(item.props.title);
    setIndex(parseInt(key));
  };

  const handleLogoutClick = (e) => {
    dispatch(actionCreators.removeUser());
    props.history.push("/");
  };

  const SwitchComponent = useCallback(
    ({ index, visible, title }) => {
      switch (userRole) {
        case "admin":
          return <TeamLead index={index} title={title} />;
          break;
        case "team lead":
          return <TeamLead index={index} title={title} />;
          break;
        case "team member":
          return <TeamLead index={index} title={title} />;
          break;
        case "startup":
          return <Startup index={index} visible={visible} />;
          break;
        default:
          return (
            <div className="homepage-main">
              <h3>Error while loading page</h3>
            </div>
          );
          break;
      }
    },
    [index, visible]
  );

  const SwitchNavLinks = useCallback(({ features }) => {
    switch (userRole) {
      case "admin":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={teamLeadItems}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      case "team lead":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={teamLeadItems}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      case "team member":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={teamLeadItems}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      case "startup":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      default:
        return (
          <div className="homepage-main">
            <h3>Error while loading page</h3>
          </div>
        );
        break;
    }
  }, []);

  return (
    <div className="homepage-container">
      {navbar ? null : (
        <div className="homepage-navbar-menu">
          <MenuIcon
            style={{ fontSize: "30px", color: "#fff" }}
            onClick={() => setNavbar(true)}
          />
        </div>
      )}
      {visible ? (
        <div className="homepage-open-navbar">
          <ArrowCircleRightIcon
            className="sidebar-icon"
            style={{ fontSize: "35px" }}
            onClick={() => setVisible(false)}
          />
        </div>
      ) : null}
      {navbar ? (
        <Navbar
          ListAltIcon={ListAltIcon}
          DeveloperBoardIcon={DeveloperBoardIcon}
          BarChartIcon={BarChartIcon}
          BuildIcon={BuildIcon}
          CalendarMonthIcon={CalendarMonthIcon}
          LogoutIcon={LogoutIcon}
          GroupsIcon={GroupsIcon}
          AnalyticsIcon={AnalyticsIcon}
          EventNoteIcon={EventNoteIcon}
          PaymentIcon={PaymentIcon}
          setIndex={setIndex}
          handleLogoutClick={handleLogoutClick}
          username={username}
          admin={admin}
          setNavbar={setNavbar}
        />
      ) : null}
      <div
        className={visible ? "homepage-sidebar hide-menu" : "homepage-sidebar"}
      >
        <div className="sidebar-icon-row">
          <ArrowCircleLeftIcon
            className="sidebar-icon"
            style={{ fontSize: "35px" }}
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="homepage-avatar">
          <img src={logo} alt="logo" />
        </div>
        <div className="username-logo">
          <AccountBoxIcon style={{ fontSize: "25px", color: "#37561b" }} />
          <h2>{username.substring(0, 12) + "..."}</h2>
        </div>
        <SwitchNavLinks features={features} />
        <div className="logout" onClick={handleLogoutClick}>
          <LogoutIcon style={{ fontSize: "20px" }} className="logout-icon" />
          <h5>Logout</h5>
        </div>
      </div>
      <div
        className={visible ? "homepage-main increase-width" : "homepage-main"}
      >
        <SwitchComponent index={index} visible={visible} title={title} />
      </div>
    </div>
  );
};
export default HomepageTemplate;
