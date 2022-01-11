import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import ModalUI from '../../../ModalUI'
import CloseIcon from '@mui/icons-material/Close'
import Register from '../AdminPanel/Register'
import * as actionCreators from '../../../store/actionCreators'

const AdminLandingPage = ({startups, adminNavigate}) => {

    const [int, setInternal] = useState(false)
    const [cat, setCatalyzer] = useState(false)
    const [acad, setAcademy] = useState(false)
    const [state, setState] = useState({
        username:'',
        email:'',
        category:'',
        password:'',
        base_key:'',
        link:''
    })

    const internal = startups.filter(el => el.category === 'internal')
    const catalyzer = startups.filter(el => el.category === 'catalyzer')
    const academy = startups.filter(el => el.category === 'academy')
    // console.log(state,'ll')

    const dispatch = useDispatch()

    const signUpInternal = () => {
        dispatch(actionCreators.signUp(state.username, state.email,'internal', state.password))
        setState({
            username:'',
            email:'',
            category:'',
            password:'',
            base_key:'',
            link:''
        })
    }
    const signUpAcademy = () => {
        dispatch(actionCreators.signUp(state.username, state.email,'academy', state.password))
        setState({
            username:'',
            email:'',
            category:'',
            password:'',
            base_key:'',
            link:''
        })
    }
    const signUpCatalyzer = () => {
        dispatch(actionCreators.signUp(state.username, state.email,'catalyzer', state.password, state.base_key, state.link))
        setState({
            username:'',
            email:'',
            category:'',
            password:'',
            base_key:'',
            link:''
        })
    }

    return (
        <div className="admin-menu">
            {int ? <ModalUI>
                <div className="register-form">
                    <div className="register-form-nav">
                        <h3>Internal</h3>
                        <CloseIcon 
                            className="register-form-container-icon"
                            style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)'}}
                            onClick={() => setInternal(false)}
                        />
                    </div>
                    <div className="register-form-container">
                        <input
                            placeholder="Username"
                            value={state.username}
                            onChange={(e) => setState({ ...state, username: e.target.value})}
                        />
                        <input
                            placeholder="Email"
                            value={state.email}
                            onChange={(e) => setState({ ...state, email: e.target.value})}
                        />
                        <input
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value})}
                        />
                        <button onClick={signUpInternal}>Sign up</button>
                    </div>
                </div>
            </ModalUI> : null}
            {acad ? <ModalUI>
                <div className="register-form">
                    <div className="register-form-nav">
                        <h3>Academy</h3>
                        <CloseIcon 
                            className="register-form-container-icon"
                            style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)' }}
                            onClick={() => setAcademy(false)}
                        />
                    </div>
                    <div className="register-form-container">
                        <input
                            placeholder="Username"
                            value={state.username}
                            onChange={(e) => setState({ ...state, username: e.target.value})}
                        />
                        <input
                            placeholder="Email"
                            value={state.email}
                            onChange={(e) => setState({ ...state, email: e.target.value})}
                        />
                        <input
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value})}
                        />
                        <button onClick={signUpAcademy}>Sign up</button>
                    </div>
                </div>
            </ModalUI> : null}
            {cat ? 
                <ModalUI>
                    <Register 
                        username={state.username} 
                        email={state.email} 
                        category={state.category} 
                        password={state.password} 
                        base_key={state.base_key} 
                        link={state.link} 
                        state={state}
                        setState={setState}
                        signup={signUpCatalyzer} 
                        setCatalyzer={setCatalyzer}/>
                </ModalUI>
            : null}
            <div className="admin-menu-content">
                <div className="admin-header">
                    <h1>StartHub</h1>
                    <h5>Welcome to starthub dashboard</h5>
                </div>
                <div className="admin-row">
                    <div className="admin-stat-card">
                        <h3>Total Startups</h3>
                    </div>
                    <div className="admin-stat-card">
                        <h3>Enrolled this Month</h3>
                    </div>
                    <div className="admin-stat-card">
                        <h3>User Activity</h3>
                    </div>
                </div>
                <div className="admin-header">
                    <h2>Catalyzer Startup Data Tracking</h2>
                </div>
                <div className="admin-header">
                    <h3>Internal</h3>
                </div>
                <div className="admin-header">
                    <div className="separate"></div>
                </div>
                <div className="admin-card-row">
                    {internal.map(s => (
                        <div className="admin-startup-card-column">
                            <div className="admin-startup-card">
                                <h2 onClick={()=> adminNavigate(s)}>{s.username.substring(0,2)}</h2>
                            </div>
                            <h3>{s.username.length > 10 ? s.username.substring(0,10) + '..' : s.username}</h3>
                        </div>
                    ))
                    }
                    <div className="admin-startup-card-column">
                        <div className="add-startup">
                            <AddIcon className="create-icon" onClick={() => setInternal(true)} style={{ fontSize: '40px', color:'rgba(0,0,0,0.3)' }}/>
                        </div>
                        <h3>Add startup</h3>
                    </div>
                </div>
                <div className="admin-header">
                    <h3>Catalyzer</h3>
                </div>
                <div className="admin-header">
                    <div className="separate"></div>
                </div>
                <div className="admin-card-row">
                    {catalyzer.map(s => (
                        <div className="admin-startup-card-column">
                            <div className="admin-catalyzer-card">
                                <h2 onClick={()=> adminNavigate(s)}>{s.username.substring(0,2)}</h2>
                            </div>
                            <h3>{s.username.length > 10 ? s.username.substring(0,10) + '..' : s.username}</h3>
                        </div>
                    ))
                    }
                    <div className="admin-startup-card-column">
                        <div className="add-startup">
                            <AddIcon className="create-icon" onClick={() => setCatalyzer(true)} style={{ fontSize: '40px', color:'rgba(0,0,0,0.3)' }}/>
                        </div>
                        <h3>Add startup</h3>
                    </div>
                </div>
                <div className="admin-header">
                    <h3>Academy</h3>
                </div>
                <div className="admin-header">
                    <div className="separate"></div>
                </div>
                <div className="admin-card-row">
                    {academy.map(s => (
                        <div className="admin-startup-card-column">
                            <div className="admin-academy-card">
                                <h2 onClick={()=> adminNavigate(s)}>{s.username.substring(0,2)}</h2>
                            </div>
                            <h3>{s.username.length > 10 ? s.username.substring(0,10) + '..' : s.username}</h3>
                        </div>
                    ))
                    }
                    <div className="admin-startup-card-column">
                        <div className="add-startup">
                            <AddIcon className="create-icon" onClick={() => setAcademy(true)} style={{ fontSize: '40px', color:'rgba(0,0,0,0.3)' }}/>
                        </div>
                        <h3>Add startup</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLandingPage
