import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as actionCreators from '../../store/actionCreators'
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete'

const Cards = ({ list, cards, boardId }) => {

    const getItems = count =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: `item ${k}`
        }));

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 1,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "#dfa126" : "#fde7a9",
        height: 30,
        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "#69191a96" : "#fff",
        padding: grid,
        width: 250,
        margin: 2
    });

    const [state, setState] = useState({ items: cards })
    const [cardName, setCardName] = useState('')


    const dispatch = useDispatch()

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            state.items,
            result.source.index,
            result.destination.index
        );

        setState({
            items
        });
    }

    useEffect(() => {

    }, [])

    const canvas_items = state.items


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        <div className="canvas-row">
                            <h6>{list.name}</h6>
                            <DeleteIcon onClick={() => dispatch(actionCreators.deleteList(list._id))} className="delete-icon" />
                        </div>
                        {cards.map((card, index) => {
                            if (list._id === card.listId)
                                return (
                                    <Draggable key={card._id} draggableId={card._id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="canvas-list-card"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <p>{card.name}</p>
                                                <div className="icon-row">
                                                    {/* <EditIcon className="edit-icon" fontSize="small" /> */}
                                                    <CancelIcon onClick={() => dispatch(actionCreators.deleteCard(card._id))} className="edit-icon" fontSize="small" />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                        })}
                        <div className="add-card">
                            <input
                                placeholder="Type.."
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(actionCreators.createCard(boardId, list._id, cardName, (res) => {
                                            setCardName('')
                                            if (res.success === true) {
                                                dispatch(actionCreators.getCardsOnBoard(boardId))
                                            }
                                        }))
                                    }
                                }}
                            />
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Cards
