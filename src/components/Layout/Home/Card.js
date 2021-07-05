import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Search from '@material-ui/icons/Search'
import AddBoxIcon from '@material-ui/icons/AddBox'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import Cards from './Cards'



import './Home.css'
const Card = (props) => {

    const [listName, setListName] = useState('')
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [cardName, setCardName] = useState('')
    const [activeListId, setActiveListId] = useState(null)

    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id
    const loading = useSelector(state => state.requests.loading)
    const lists = useSelector(state => state.requests.lists)
    // console.log(lists, 'lists')
    
    const todoLists = lists && lists.filter(el => el.boardId === boardId)
    // console.log(todoLists, 'todoLists')


    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(actionCreators.getListsOnBoard( () => { }))
            getListsOnBoard()
    }, [])
    
    const getListsOnBoard = () => dispatch(actionCreators.getListsOnBoard( () => { }))

    const createList = () => {
        dispatch(actionCreators.createList(boardId, listName, (res) => {
            if (res.success === true) {
                setOpen(false)
                setTimeout(() => {
                    dispatch(actionCreators.getListsOnBoard(boardId))
                }, 2000)
            }
        }))
    }


    return (
        <div className="main-container">
            {open ? <ModalUI setOpen={setOpen}>
                <div className="create-board-column">
                    <div className="close-row">
                        <p>Create List</p>
                        <CloseIcon onClick={() => setOpen(false)} className="close" style={{ fontSize: '20px' }} />
                    </div>
                    <div className="create-board-row">
                        <input
                            type="text"
                            value={listName}
                            placeholder="List Name"
                            onChange={(e) => setListName(e.target.value)}
                        />
                        <button onClick={createList}>Create</button>
                    </div>
                </div>
            </ModalUI> : null}
            <div className="right-column-content">
                <div className="boards-header">
                    <h2>{boardName}</h2>
                    <div className="edit-row">
                        {/* <div className="search">
                            <input
                                type="text"
                                placeholder="Search"
                            />
                            <Search style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.1)' }} />
                        </div>
                        <div className="separator" /> */}
                        {/* <button onClick={() => setOpen(true)}>Create List</button> */}
                        <h5 onClick={() => props.history.goBack()}>Go Back</h5>
                    </div>
                </div>
                <Cards
                    todoLists={todoLists}
                    boardId={boardId}
                    getLists={getListsOnBoard}
                />

            </div>
        </div>
    )
}

export default Card