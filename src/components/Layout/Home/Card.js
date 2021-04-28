import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Sidebar from '../../Navigation/Sidebar'
import Search from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close';

import './Home.css'
const Card = (props) => {

    const [listName, setListName] = useState('')
    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [activeListId, setActiveListId] = useState(null)
    const [open, setOpen] = useState(false)

    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id


    const lists = useSelector(state => state.requests.lists)
    const cards = useSelector(state => state.requests.cards)
    // console.log(lists, 'lists')
    // console.log(cards, 'cards')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getListsOnBoard(boardId))
        dispatch(actionCreators.getCardsOnBoard(boardId))
    }, [])

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
                        <button onClick={createList}>Create List</button>
                    </div>
                </div>
            </ModalUI> : null}
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="right-column-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>{boardName}</h2>
                        <div className="edit-row">
                            <div className="search">
                                <input
                                    type="text"
                                    placeholder="Search"
                                />
                                <Search style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.1)' }} />
                            </div>
                            <div className="separator" />
                            <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} />
                        </div>
                    </div>
                    <div className="milestone-row">
                        {lists.map((list, index) => (
                            <div className="list-card" key={list._id}>
                                <div className="list-header">
                                    <h3>{list.name}</h3>

                                </div>
                                {cards.map(card => {
                                    if (list._id === card.listId)
                                        return (
                                            <div className="card-column" key={card._id}>
                                                <h5>{card.name}</h5>
                                            </div>
                                        )
                                })}
                                {show && activeListId === list._id ? <div className="add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => {
                                        dispatch(actionCreators.createCard(boardId, list._id, cardName, (res) => {
                                            if (res.success === true) {
                                                setTimeout(() => {
                                                    dispatch(actionCreators.getCardsOnBoard(boardId))
                                                }, 2000)
                                            }
                                        }))
                                        setCardName('')
                                    }}>Add</button>
                                </div> : null}
                                { activeListId !== list._id ? <button onClick={() => {
                                    setShow(true)
                                    setActiveListId(list._id)
                                }}>+ Add Card</button> : <button onClick={() => setShow(false)}>Close</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
