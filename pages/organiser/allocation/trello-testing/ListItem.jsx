import React from "react";
import { Draggable } from "react-beautiful-dnd";
export default function ListItem({ item, index }) {
    const { id, title } = item;
    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="list-item"
                >
                    {title}{" "}
                </div>
            )}
        </Draggable>
    );
}