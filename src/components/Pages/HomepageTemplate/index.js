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
  Loans,
  Revenues,
  ResourceFiles,
} from "../../Paths";
import { Tabs } from "antd";
import axios from "axios";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BarChartIcon from "@material-ui/icons/BarChart";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@material-ui/icons/Build";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

import { Admin, TeamLead, TeamMember, Startup } from "../LandingPages";
import "./HomepageStyles.css";
const HomepageTemplate = (props) => {
  const [index, setIndex] = React.useState(0);
  const [navbar, setNavbar] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState({
    actionObject: null,
    objects: [
      {
        type: "startup",
        title: "Dashboard",
        icon: (
          <BarChartIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        type: "startup",
        title: "OKRs",
        icon: (
          <ListAltIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        type: "startup",
        title: "Lean Canvas",
        icon: (
          <DeveloperBoardIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        type: "startup",
        title: "Diagnostics",
        icon: (
          <BuildIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      {
        type: "startup",
        title: "Company Profile",
        icon: (
          <PermContactCalendarIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        type: "admin",
        title: "Overview",
        icon: (
          <DashboardIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        type: "admin",
        title: "Leads",
        icon: (
          <GroupsIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      {
        type: "admin",
        title: "Members",
        icon: (
          <GroupsIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      {
        type: "admin",
        title: "Startups",
        icon: (
          <GroupsIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      {
        type: "team lead",
        title: "Team members",
        icon: (
          <GroupsIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      {
        type: "team lead",
        title: "startups",
        icon: (
          <GroupsIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      {
        type: "team member",
        title: "Startups",
        icon: (
          <GroupsIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      // {
      //   type: "team member",
      //   title: "Resource Files",
      //   icon: (
      //     <FolderIcon style={{ fontSize: "25px" }} className="home-link-icon" />
      //   ),
      // },
      // {
      //   type: "team member",
      //   title: "Loans",
      //   icon: (
      //     <LocalAtmIcon
      //       style={{ fontSize: "25px" }}
      //       className="home-link-icon"
      //     />
      //   ),
      // },
    ],
  });

  const adminLinks = active.objects.filter((l) => l.type === "admin");
  const teamLeadLinks = active.objects.filter((l) => l.type === "team lead");
  const teamMemberLinks = active.objects.filter(
    (l) => l.type === "team member"
  );
  const startupLinks = active.objects.filter((l) => l.type === "startup");
  // console.log(startupLinks);

  const { username, admin, tokenExpiration, category, userRole, features } =
    useSelector((state) => state.auth);

  // console.log(userRole);

  const auth = useSelector((state) => state.auth);

  const current_date = Date.now();

  React.useEffect(() => {
    setActive({ ...active, actionObject: active.objects[0] });
    if (active.objects[index] === active.actionObject) {
      return "home-link home-active";
    } else {
      return "home-link home-inactive";
    }
  }, []);

  React.useEffect(() => {
    getProfile();
    if (current_date >= tokenExpiration) {
      dispatch(actionCreators.removeUser());
      props.history.push("/");
    }
  }, []);
  const getProfile = () => dispatch(actionCreators.getProfile());

  const dispatch = useDispatch();

  const toggleActive = (index) => {
    setActive({ ...active, actionObject: active.objects[index] });
  };

  const toggleActiveStyle = (index) => {
    if (active.objects[index] === active.actionObject) {
      return "home-link home-active";
    } else {
      return "home-link home-inactive";
    }
  };

  const handleLogoutClick = (e) => {
    dispatch(actionCreators.removeUser());
    props.history.push("/");
  };

  const SwitchComponent = useCallback(
    ({ index, visible }) => {
      switch (userRole) {
        case "admin":
          return <Admin index={index} />;
          break;
        case "team lead":
          return <TeamLead index={index} />;
          break;
        case "team member":
          return <TeamMember index={index} />;
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

  const SwitchNavLinks = useCallback(
    ({ features }) => {
      switch (userRole) {
        case "admin":
          return (
            <div style={{ width: "95%" }}>
              {adminLinks?.map((e, index) => (
                <div
                  key={index}
                  className={toggleActiveStyle(index)}
                  onClick={() => {
                    toggleActive(index);
                    setIndex(index);
                  }}
                >
                  <div className="home-link-row">
                    {e.icon}
                    <h4>{e.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          );
          break;
        case "team lead":
          return (
            <div style={{ width: "95%" }}>
              {teamLeadLinks?.map((e, index) => (
                <div
                  key={index}
                  className={toggleActiveStyle(index)}
                  onClick={() => {
                    toggleActive(index);
                    setIndex(index);
                  }}
                >
                  <div className="home-link-row">
                    {e.icon}
                    <h4>{e.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          );
          break;
        case "team member":
          return (
            <div style={{ width: "95%" }}>
              {teamMemberLinks?.map((e, index) => (
                <div
                  key={index}
                  className={toggleActiveStyle(index)}
                  onClick={() => {
                    toggleActive(index);
                    setIndex(index);
                  }}
                >
                  <div className="home-link-row">
                    {e.icon}
                    <h4>{e.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          );
          break;
        case "startup":
          return (
            <div style={{ width: "95%" }}>
              {startupLinks?.map((e, index) => (
                <div
                  key={index}
                  className={toggleActiveStyle(index)}
                  onClick={() => {
                    toggleActive(index);
                    setIndex(index);
                  }}
                >
                  <div className="home-link-row">
                    {e.icon}
                    <h4>{e.title}</h4>
                  </div>
                </div>
              ))}
            </div>
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
    },
    [active, setActive]
  );

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
          <h2>{username}</h2>
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
        {/* <SwitchComponent index={index} visible={visible} /> */}
      </div>
    </div>
  );
};
export default HomepageTemplate;
