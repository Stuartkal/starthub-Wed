import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import * as actionCreators from '../store/actionCreators'

import './Navigation.css'
const Navbar = (props) => {

    const [visibleLogout, setVisisbleLogout] = useState(false)

    const [appState, setAppState] = useState({
        actionObject: null,
        objects: [
            { id: 1, title: "Schedule Meeting", route: "/carlender" },
            // { id: 2, title: "Learn", route: "/blogs" },
            { id: 3, title: "Dashboard", route: "/overview" },
            { id: 4, title: "Lean Canvas", route: "/canvas-board" },
            { id: 5, title: "Todos", route: "/" },
            { id: 6, title: "Milestones", route: "/milestone-board" },
        ]
    })

    const [adminAppState, setAdminAppState] = useState({
        actionObject: null,
        objects: [
            { id: 1, title: "Startups", route: "/admin/home" },
        ]
    })

    const dispatch = useDispatch()

    const username = useSelector(state => state.auth.username)
    const admin = useSelector(state => state.auth.admin)
    const link = useSelector(state => state.auth.link)
    // console.log(key,'hello')


    const handleLogoutClick = e => {
        if (e.key === '1') {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
        }
    };


    const handleLogoutChange = flag => {
        setVisisbleLogout(flag)
    };

    const toggleActive = (index) => {
        setAppState({ ...appState, actionObject: appState.objects[index] })
    }

    const toggleActiveStyle = (index) => {
        if (appState.objects[index] === appState.actionObject) {
            return "link-box active"
        } else {
            return "link-box inactive"
        }
    }

    const toggleAdminActive = (index) => {
        setAdminAppState({ ...adminAppState, actionObject: adminAppState.objects[index] })
    }

    const toggleAdminActiveStyle = (index) => {
        if (adminAppState.objects[index] === adminAppState.actionObject) {
            return "link-box active"
        } else {
            return "link-box inactive"
        }
    }


    const logout = (
        <Menu onClick={handleLogoutClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                logout
          </Menu.Item>
        </Menu>
    );

    return (
        <div className="nav-container">
            <div className="nav-row">
                <img src={logo} />
                {admin ? 
                <div className="links">
                {adminAppState.objects.map((element, index) => (
                    <div
                        key={index}
                        className={toggleAdminActiveStyle(index)}
                        onClick={() => {
                            toggleAdminActive(index)
                            props.history.push(element.route)
                        }}
                    >
                        <h4>{element.title}</h4>
                    </div>
                ))
                }
                {/* <h4>Lean Canvas</h4>
                <h4>Dashboard</h4>
                <h4>Learn</h4> */}
            </div>
            :
            <div className="links">
                    {appState.objects.map((element, index) => (
                        <div
                            key={index}
                            className={toggleActiveStyle(index)}
                            onClick={() => {
                                toggleActive(index)
                                props.history.push(element.route)
                            }}
                        >
                            <h4>{element.title}</h4>
                        </div>
                    ))
                    }
                    {/* <h4>Lean Canvas</h4>
                    <h4>Dashboard</h4>
                    <h4>Learn</h4> */}
                </div>    
            }
                <a href={link} target="blank"><button className="report">Report</button></a>
                <div className="profile">
                    <Dropdown.Button overlay={logout} onVisibleChange={handleLogoutChange} placement="bottomCenter" icon={<UserOutlined />}>
                        <p>{username}</p>
                    </Dropdown.Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
